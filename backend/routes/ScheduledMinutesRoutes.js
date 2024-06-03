/**
*

Skapad av: Oskar Lindau till Slutprojektet i kursen DT162G
ScheduledMinutesRoutes.js: Denna filen är till för att hantera routingen för schemalagda träningsminuter

*
**/

// Importerar Express-modul samt träningsform modellen och skapar en instans av Express-router
const express = require('express');
const router = express.Router();
const { ScheduledMinutes } = require('../models/ScheduledMinutes');

/* 
    Endast ett dokument med schemalagta träningsminuter får och ska finnas i databasen.
    Om det inte finns något läggs det till enligt "seed.js".
    Därför behövs endast get-metod för att hämta värdet av schemalagda träningsminuter.
    Värdet uppdateras i databasen genom händelsehanterare i Schedule.js och Training.js.
*/ 

// Använder router get för att hämta schemalagda träningsminuter som finns i databasen
router.get('/', async (req, res) => {
    try {
        // Lagrar träningsminuter som finns i databasen i variabel "scheduledMinutes", skriv ut det i json-format
        const scheduledMinutes = await ScheduledMinutes.findOne();
        res.json(scheduledMinutes);
    // Om något oväntat fel händer medan händer vid hämtning, ge statuskod 500 och ge felmeddelande
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exporterar router 
module.exports = router;