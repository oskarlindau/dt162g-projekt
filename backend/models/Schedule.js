/**
*

Skapad av: Oskar Lindau till Slutprojektet i kursen DT162G
Schedule.js: Denna filen hanterar schemat för modellen som hanterar schemalagda träninigsaktiviteter i min databas

*
**/

// Använder mongoose
const mongoose = require('mongoose');
// Importerar updateScheduledMinutes-funktionen för att hantera händelselyssnare
const { updateScheduledMinutes } = require('./ScheduledMinutes')

// Deklarerar ett nytt schema för att spara planerade träningsaktiviteter
const scheduleSchema = new mongoose.Schema({
    // Vilken dag som man planerar en aktivitet får endast sparas som en av veckodagarna som en sträng
    day: {
        type: String,
        enum: ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
        required: true
    },
    // Träningsform får endast sparas som någon av de träningsformerna som finns lagrade i databasen. Sparas som ObjectId av den valda träningsformen.
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
        required: true
    }
});

// Händelsehanterare för när en ny schemalagd träning sparas eller uppdateras med post- eller patch-metod
scheduleSchema.post('save', async function() {
    await updateScheduledMinutes();
});

// Händelsehanterare för när en schemalagd träning raderas med delete-metod
scheduleSchema.post('findOneAndDelete', async function() {
    await updateScheduledMinutes();
});

// Skapa en modell "Schedule" baserad på schemat "scheduleSchema"
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Exportera modellen "Schedule"
module.exports = Schedule;