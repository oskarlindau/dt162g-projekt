/**
*

Skapad av: Oskar Lindau till Slutprojektet i kursen DT162G
ScheduleRoutes.js: Denna filen är till för att hantera routingen för schemalagda aktiviteter i min webbtjänst

*
**/

// Importerar Express-modul samt Schedule-modellen och skapar en instans av Express-router
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Använder router get för att skicka med get-metod och hämta alla schemalagda aktiviteter
router.get('/', async (req, res) => {
    try {
        // Lagrar alla schemalagda aktiviteter som finns i databasen i variabel "scheduled"
        const scheduled = await Schedule.find();
        // Om det finns schemalagda aktiviteter i databasen, hämta datan i json-format
        if (scheduled) {
            res.json(scheduled);
        } else {
            // Om det inte hittas, ge statuskod 404 med felmeddelande
            res.status(404).json({ error: 'Det finns inga schemalagda aktiviteter i databasen.' });
        }
    // Om något oväntat fel händer medan händer vid hämtning, ge statuskod 500 och ge felmeddelande
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get metod med adderat sökväg med id för att hämta en schemalagd aktivitet
router.get('/:id', async (req, res) => {
    try {
        // Försöker hämta en schemalagd aktivitet med samma id som skickats med get metod
        const schedule = await Schedule.findById(req.params.id);
        // Om en sådan finns, hämta datan i json-format
        if (schedule) {
            res.json(schedule);
        } else {
            // Om schemalagd aktiviteten inte kan hittas, ge statuskod 404 med felmeddelande
            res.status(404).json({ error: 'Schemalagda aktiviteten kunde inte hittas.' });
        }
    // Om något oväntat fel händer medan händer vid hämtning, ge statuskod 500 och ge felmeddelande
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Använder post metod för att lägga till en aktivitet i schemat.
router.post('/', async (req, res) => {
    // Skapa en ny aktivitet med data från förfrågan
    const schedule = new Schedule({
        day: req.body.day,
        training: req.body.training
    });

    try {
        // Försöker spara den nya aktiviteten
        const newSchedule = await schedule.save();

        if (newSchedule) {
            // Om aktiviteten kan skapas, skicka statuskod 201 med ett framgångsmeddelande
            res.status(201).json({ message: 'Aktivitet har lagts till i träninigsschemat.' });
        } else {
            // Om aktiviteten inte kan skapas, skicka statuskod 404 med meddelande.
            res.status(404).json({ message: 'Kunde inte lägga till aktivitet i träningsschemat, försök igen.' })
        }
    } catch (error) {
        // Om något oväntat händer vid skapandet av kursen, skicka statuskod 500 med ett felmeddelande
        res.status(500).json({ error: error.message });
    }
});

// Använder patch-metod för att uppdatera en schemalagd aktivitet. Med id som parameter i sökväg
router.patch('/:id', async (req, res) => {
    try {
        // Försöker hitta aktiviteten med det id som skickats med parameter
        const schedule = await Schedule.findById(req.params.id);

        if(!schedule) {
            // Om det inte hittas någon aktivitet med det ID, skicka felmeddelande
            res.status(404).json({ error: 'Aktiviteten kunde inte hittas.' });
        }

        // Om dag och träningsform inte är tomma i förfrågan, sätt nya värden.
        if (req.body.day != null && req.body.training != null) {
            schedule.day = req.body.day;
            schedule.training = req.body.training;
        }

        // Försöker spara en uppdaterad aktivitet i träningsschemat
        const updatedSchedule = await schedule.save();

        if (updatedSchedule) {
            // Om aktiviteten kan uppdateras, skicka statuskod 200 med ett framgångsmeddelande
            res.status(200).json({ message: 'Schemalagd aktivitet har uppdaterats.' });
        } else {
            // Om aktiviteten inte kan uppdateras, skicka statuskod 404 med meddelande.
            res.status(404).json({ message: 'Kunde inte uppdatera aktiviteten, försök igen.' })
        }
    } catch (error) {
        // Om något oväntat händer vid skapandet av kursen, skicka statuskod 500 med ett felmeddelande
        res.status(500).json({ error: error.message });
    }
});

// Använder delete-metod för att radera en schemalagd aktivitet. Med id som parameter i sökväg
router.delete('/:id', async (req, res) => {
    try {
        // Försöker hitta schemalagd aktivitet med id som är skickad med parameter
        const schedule = await Schedule.findByIdAndDelete(req.params.id);

        // Om en aktiviteten hittas, radera den med meddelande om den inte hittas ge, statuskod 404 och att den inte kunde hittas
        if(schedule) {
            res.status(200).json({ message: 'Schmalagd aktivitet är raderad' });
        } else {
            res.status(404).json({ error: 'Schemalagda aktiviteten kunde inte hittas.' });
        }
    // Om något oväntat händer vid radering fånga felet
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Exporterar router 
module.exports = router;