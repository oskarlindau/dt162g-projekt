/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
database.js: Denna filen hanterar min databasanslutning, som finns via MongoDB Atlas

*
**/

// Importerar "Mongoose"
const mongoose = require('mongoose');

// Definerar anslutningsväg till databasen
const uri = "mongodb+srv://oskarlindau:oskarpassword@oskarlindau.qrh8zkn.mongodb.net/training_app?retryWrites=true&w=majority";

// Klientinställningar vid anslutning till databasen
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Funktion för att ansluta till databasen
async function connectDatabase() {
  try {
    // Försöker ansluta till databas med sökväg och klientalternativ
    await mongoose.connect(uri, clientOptions);
    // Om det går bra, skriv att databasen är ansluten i konsol
    console.log("Databasen är ansluten");
  // Om det går fel under anslutning, fånga felet och skriv ut i konsol
  } catch (error) {
    console.error('Fel vid anslutning till databasen:', error.message);
    // Avsluta programmet med felkod 1
    process.exit(1);
  }
}

// Exporterar funktionen "connectDatabase"
module.exports = connectDatabase;