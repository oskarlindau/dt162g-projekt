/**
*

Skapad av: Oskar Lindau till Slutprojektet i kursen DT162G
TrainingGoal.js: Denna filen hanterar schemat för modellen som hanterar träningsmål i databasen.

*
**/

// Använder mongoose
const mongoose = require('mongoose');

// Deklarerar ett nytt schema för att spara träningsmål
const trainingGoalSchema = new mongoose.Schema({
    // Träningsmålet ska lagras som ett nummer och måste vara mer än 0. Tanken är att det ska vara träningsminuter
    goalMinutes: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Träningsmålet måste vara över 0 minuter.'
        }
    }
});

// Skapa en modell "TrainingGoal" baserad på schemat "trainingGoalSchema"
const TrainingGoal = mongoose.model('TrainingGoal', trainingGoalSchema);

// Exportera modellen "TrainingGoal"
module.exports = TrainingGoal;