/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
seed.js: Denna filen hanterar min att "TrainingGoal" och "ScheduledMinutes" har ett dokument i kollektionerna när applikationen startas

*
**/

// Importerar modeller
const TrainingGoal = require('./models/TrainingGoal');
const { ScheduledMinutes } = require('./models/ScheduledMinutes');
const Schedule = require('./models/Schedule');
const Training = require('./models/Training');

// Funktion för att lägga till träningsmål i databasen
async function seedTrainingGoal() {
    try {
        // Kontrollera om det redan finns ett träningsmål i databasen
        const existingTrainingGoal = await TrainingGoal.findOne();
        // Om det finns, skriv till loggen att träningsmål finns och avsluta
        if (existingTrainingGoal) {
            console.log('Träningsmål finns redan i databasen.');
            return;
        }

        // Om inte, skapa ett nytt träningsmål med 0 som värde
        const newTrainingGoal = new TrainingGoal({
            goalMinutes: 0 
        });

        // Spara träningsmålet och skriv det till konsolen
        await newTrainingGoal.save();
        console.log('Träningsmål har lagts till i databasen.');
    } catch (error) {
        // Om seedningen inte fungerar skriv till konsolen
        console.error('Ett fel inträffade vid seedning av träningsmål:', error);
    }
}

// Funktion för att lägga till schemalagda träningsminuter i databasen
async function seedScheduledMinutes() {
    try {
        // Kontrollera om det redan finns ett schemalagda träningsminuter i databasen
        const existingScheduledMinutes = await ScheduledMinutes.findOne();
        // Om det finns, skriv till loggen att schemalagda träningsminuter finns och avsluta
        if (existingScheduledMinutes) {
            console.log('Schemalagda träningsminuter finns redan i databasen.');
            return;
        }

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

        // Skapa ett nytt dokument för schemalagda träningsminuter
        const scheduledMinutes = new ScheduledMinutes({
            scheduledMinutes: totalMinutes
        });

        // Spara det nya dokumentet i databasen
        await scheduledMinutes.save();
        console.log('Schemalagda träningsminuter har lagts till i databasen.');
    } catch (error) {
        // Om något oväntat händer vid seedning skriv ut felmeddelande i konsolen
        console.error('Ett fel inträffade vid seedning av schemalagda träningsminuter:', error);
    }
}


// Kör seedningsfunktioner
async function seed() {
    await seedTrainingGoal();
    await seedScheduledMinutes();
}

// Exporterar funktionen "seed"
module.exports = seed;