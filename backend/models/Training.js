/**
*

Skapad av: Oskar Lindau till Slutprojektet i kursen DT162G
Training.js: Denna filen hanterar schemat för modellen som hanterar träningsformer i min databas

*
**/

// Använder mongoose
const mongoose = require('mongoose');
// Importerar updateScheduledMinutes-funktionen för att hantera händelselyssnare
const { updateScheduledMinutes } = require('./ScheduledMinutes')

// Deklarerar ett nytt schema för träningsformer
const trainingSchema = new mongoose.Schema({
    // Träningsformen behöver ett namn som ska lagras som en sträng, får inte heller endast vara mellanslag.
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                return value.trim().length > 0;
            }
        }
    },
    // Träningsformen behöver lagras med tidsåtgång träningsformen. Sparat som ett number, tänkt att vara minuter.
    durationMinutes: {
        type: Number,
        required: true,
        // Kolla så att träningsminuter är över 0 i värde
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Träningstid måste vara över 0.'
        }
    }
});

// Händelsehanterare för att ta bort alla schemalagda aktiviteter och träningsminuter om en träningsform raderas
trainingSchema.pre('findOneAndDelete', async function(next) {
    try {
        // Hämta Schedule modellen 
        const ScheduleModel = mongoose.model('Schedule');
        // Använd deleteMany funktionen för att radera alla dokument med träningsformens id
        await ScheduleModel.deleteMany({ training: this._conditions._id });
        // Uppdatera även schemalagda träningsminuter
        await updateScheduledMinutes();
        next();
    } catch (error) {
        // Om något oväntat fel händer, skriv ut till konsolen
        console.error("Fel vid radering av schemalagda träningsaktiviteter:", error);
        next(error);
    }
});

// Händelsehanterare för att uppdatera schemalagda aktiviteter och träningsminuter om en träningsform uppdateras
trainingSchema.post('save', async function(doc) {
    try {
        // Om det inte är en ny träningsform (alltså om det är en uppdatering)
        if (!doc.isNew) {
            // Hämta Schedule modellen
            const ScheduleModel = mongoose.model('Schedule');
            // Hämta alla aktiviteter som har träningsformen som uppdateras
            const updatedSchedule = await ScheduleModel.find({ training: doc._id });
            // Uppdatera och spara alla aktiviteter som har träningsformen som uppdateras
            for (const schedule of updatedSchedule) {
                schedule.training = doc._id;
                await schedule.save();
            }
            await updateScheduledMinutes();
        }
    } catch (error) {
        // Om något oväntat fel händer, skriv ut till konsolen
        console.error("Fel vid uppdatering av schemalagda träningsaktiviteter:", error);
    }
});

// Skapa en modell "Training" baserad på schemat "trainingSchema"
const Training = mongoose.model('Training', trainingSchema);

// Exportera modellen "Training"
module.exports = Training;