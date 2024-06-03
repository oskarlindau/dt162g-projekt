/**
*

Skapad av: Oskar Lindau till Slutprojektet i kursen DT162G
ScheduledMinutes.js: Denna filen hanterar schemat för modellen som hanterar antalet träningsminuter som finns lagrade i schemalagda aktiviteter

*
**/

// Använder mongoose
const mongoose = require('mongoose');

// Deklarerar ett nytt schema för att spara lagrade träningsminuter i schemalagda aktiviteter
const scheduledMinutesSchema = new mongoose.Schema({
    // De schemalagda träningsminutrarna ska lagras som ett nummer och har standard 0 ifall inte några schemalagda aktiviteter finns.
    scheduledMinutes: {
        type: Number,
        default: 0
    }
});

// Funktion för att uppdatera schemalagda träningsminuter.
// Används till händelsehanterare i Schedule.js och Trainings.js
async function updateScheduledMinutes() {
    try {
        // Hämta alla schemalagda aktiviteter från databasen
        const schedules = await Schedule.find();

        // Beräkna totala antalet schemalagda träningsminuter
        let totalMinutes = 0;
        for (const schedule of schedules) {
            // Hämta träningsformen för varje schemalagd aktivitet
            const training = await Training.findById(schedule.training);
            // Lägg till träningsformens minuter
            if (training) {
                totalMinutes += training.durationMinutes;
            }
        }

        // Hitta dokumentet som finns i ScheduledMinutes
        const scheduledMinutes = await ScheduledMinutes.findOne();

        // Lagra det värdet av totala träningsminuter i ScheduledMinutes
        scheduledMinutes.scheduledMinutes = totalMinutes;
    
        // Spara dokumentet
        await scheduledMinutes.save();
    } catch (error) {
        // Om något oväntat fel händer, skicka fel till konsolen
        console.error("Fel när schemalagda träningsminuter uppdaterades:", error);
    }
}

// Skapa en modell "ScheduledMinutes" baserad på schemat "scheduledMinutesSchema"
const ScheduledMinutes = mongoose.model('ScheduledMinutes', scheduledMinutesSchema);

// Exportera modellen "ScheduledMinutes"
module.exports = { ScheduledMinutes, updateScheduledMinutes };

// Importerar modeller
const Schedule = require('./Schedule');
const Training = require('./Training');