/**
*

Skapad av: Oskar Lindau till Slutprojektet i kursen DT162G
TrainingGoalRoutes.js: Denna filen är till för att hantera routingen för träningsmål i min webbtjänst

*
**/

// Importerar Express-modul samt träningsform modellen och skapar en instans av Express-router
const express = require('express');
const router = express.Router();
const TrainingGoal = require('../models/TrainingGoal');

/* 
    Endast ett dokument med träningsmål får och ska finnas i databasen.
    Om det inte finns något läggs det till enligt "seed.js".
    Därför behövs endast get-metod och patch-metod.
*/ 

// Använder router get för att hämta träningsmålet som finns i databasen
router.get('/', async (req, res) => {
    try {
        // Lagrar träningsmålet som finns i databasen i variabel "trainingGoal", skriv ut det i json-format
        const trainingGoal = await TrainingGoal.findOne();
        res.json(trainingGoal);
    // Om något oväntat fel händer medan händer vid hämtning, ge statuskod 500 och ge felmeddelande
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Använder patch-metod för att uppdatera träningsmålet.
router.patch('/', async (req, res) => {
    try {
        // Hämtar det träningsmål som finns i databasen
        const trainingGoal = await TrainingGoal.findOne();

        // Om namn och träningsmål inte är tom spara värden
        if (req.body.goalMinutes != null) {
            trainingGoal.goalMinutes = req.body.goalMinutes;
        }

        // Försöker spara ett uppdaterad träningsmål
        const updatedTrainingGoal = await trainingGoal.save();

        if (updatedTrainingGoal) {
            // Om träningsmålet kan uppdateras, skicka statuskod 200 med ett framgångsmeddelande
            res.status(200).json({ message: 'Träningsmålet har uppdaterats.' });
        } else {
            // Om träningsmålet inte kan uppdateras, skicka statuskod 404 med meddelande.
            res.status(404).json({ message: 'Kunde inte uppdatera träningsmålet, försök igen.' })
        }
    } catch (error) {
        // Om något oväntat händer vid skapandet av kursen, skicka statuskod 500 med ett felmeddelande
        res.status(500).json({ error: error.message });
    }
});

// Exporterar router 
module.exports = router;