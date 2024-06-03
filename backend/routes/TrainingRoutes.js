/**
*

Skapad av: Oskar Lindau till Slutprojektet i kursen DT162G
TrainingRoutes.js: Denna filen är till för att hantera routingen för träningsformer i min webbtjänst

*
**/

// Importerar Express-modul samt träningsform modellen och skapar en instans av Express-router
const express = require('express');
const router = express.Router();
const Training = require('../models/Training');

// Använder router get för att skicka med get-metod och hämta alla träningsformer
router.get('/', async (req, res) => {
    try {
        // Lagrar alla träningsformer som finns i databasen i variabel "trainings"
        const trainings = await Training.find();
        // Om det finns träningsformer i databasen, hämta datan i json-format
        if (trainings) {
            res.json(trainings);
        } else {
            // Om det inte hittas, ge statuskod 404 med felmeddelande
            res.status(404).json({ error: 'Det finns inga träningsformer i databasen.' });
        }
    // Om något oväntat fel händer medan händer vid hämtning, ge statuskod 500 och ge felmeddelande
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get metod med adderat sökväg med id för att hämta en enskild träningsform
router.get('/:id', async (req, res) => {
    try {
        // Försöker hämta en träningsform med samma id som skickats med get metod
        const training = await Training.findById(req.params.id);
        // Om en sådan finns, hämta datan i json-format
        if (training) {
            res.json(training);
        } else {
            // Om träningsformen inte kan hittas, ge statuskod 404 med felmeddelande
            res.status(404).json({ error: 'Träningsformen kunde inte hittas.' });
        }
    // Om något oväntat fel händer medan händer vid hämtning, ge statuskod 500 och ge felmeddelande
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Använder post metod för att lägga till en träningsform.
router.post('/', async (req, res) => {
    // Skapa en ny träningsform med data från förfrågan
    const training = new Training({
        name: req.body.name,
        durationMinutes: req.body.durationMinutes
    });

    try {
        // Försöker spara den nya träningsformen
        const newTraining = await training.save();

        if (newTraining) {
            // Om träningsformen kan skapas, skicka statuskod 201 med ett framgångsmeddelande
            res.status(201).json({ message: 'Träningsformen har lagts till.' });
        } else {
            // Om träningsformen inte kan skapas, skicka statuskod 404 med meddelande.
            res.status(404).json({ message: 'Kunde inte lägga till träningsform, försök igen.' })
        }
    } catch (error) {
        // Om något oväntat händer vid skapandet av kursen, skicka statuskod 500 med ett felmeddelande
        res.status(500).json({ error: error.message });
    }
});

// Använder patch-metod för att uppdatera en träningsform. Med id som parameter i sökväg
router.patch('/:id', async (req, res) => {
    try {
        // Försöker hitta träningsformen med det id som skickats med parameter
        const training = await Training.findById(req.params.id);

        if(!training) {
            // Om det inte hittas någon träningsform med det ID, skicka felmeddelande
            res.status(404).json({ error: 'Träningsformen kunde inte hittas.' });
        }

        // Om namn och träningsminuter inte är tomma i förfrågan, sätt nya värden.
        if (req.body.name != null && req.body.durationMinutes != null) {
            training.name = req.body.name;
            training.durationMinutes = req.body.durationMinutes;
        }

        // Försöker spara en uppdaterad träninigsform
        const updatedTraining = await training.save();

        if (updatedTraining) {
            // Om träningsformen kan uppdateras, skicka statuskod 20 med ett framgångsmeddelande
            res.status(200).json({ message: 'Träningsformen har uppdaterats.' });
        } else {
            // Om träningsformen inte kan uppdateras, skicka statuskod 404 med meddelande.
            res.status(404).json({ message: 'Kunde inte uppdatera träningsform, försök igen.' })
        }
    } catch (error) {
        // Om något oväntat händer vid skapandet av kursen, skicka statuskod 500 med ett felmeddelande
        res.status(500).json({ error: error.message });
    }
});

// Använder delete-metod för att radera en träningsform. Med id som parameter i sökväg
router.delete('/:id', async (req, res) => {
    try {
        // Försöker hitta träningsform med id som är skickad med parameter
        const training = await Training.findByIdAndDelete(req.params.id);

        // Om en träningsform hittas, radera den med meddelande om den inte hittas ge, statuskod 404 och att den inte kunde hittas
        if(training) {
            res.status(200).json({ message: 'Träningsformen är raderad' });
        } else {
            res.status(404).json({ error: 'Träningsformen kunde inte hittas.' });
        }
    // Om något oväntat händer vid radering fånga felet
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Exporterar router 
module.exports = router;