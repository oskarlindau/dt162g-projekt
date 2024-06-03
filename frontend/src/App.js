/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
App.js: Detta är filen för min huvudapplikation, det är den som renderas i index.js

*
**/

// Importerar komponenter och filer för att applikationen ska fungera
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Training from './components/Training';
import TrainingGoal from './components/TrainingGoal';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import { getScheduledMinutes } from './api/api';
import './App.css';

function App() {
  // Tillstånd för att lagra schemalagda minuter
  const [scheduledMinutes, setScheduledMinutes] = useState([]);

  // Funktion för att hämta schemalagda minuter från API:et
  const fetchScheduledMinutes = async () => {
    try {
      const response = await getScheduledMinutes();
      setScheduledMinutes(response);
    } catch (error) {
      console.error('Fel vid hämtning av schemalagda minuter:', error);
    }
  };

  // useEffect-hook för att hämta schemalagda minuter när komponenten monteras
  useEffect(() => {
    fetchScheduledMinutes();
  }, []);

  // Funktion för att uppdatera schemalagda minuter, anropas när det sker en förändring i scheman
  const updateScheduledMinutes = async () => {
    try {
      const response = await getScheduledMinutes();
      setScheduledMinutes(response);
    } catch (error) {
      console.error('Fel vid hämtning av schemalagda minuter:', error);
    }
  };

  return (
    <div id="container">
      {/* Header-komponent */}
      <Header />

      <main>
        {/* Training-komponent med en prop för att uppdatera schemalagda minuter */}
        <Training updateScheduledMinutes={updateScheduledMinutes} />

        {/* TrainingGoal-komponent med schemalagda minuter som prop */}
        <TrainingGoal scheduledMinutes={scheduledMinutes} />

        {/* Schedule-komponent med en prop för att uppdatera schemalagda minuter */}
        <Schedule updateScheduledMinutes={updateScheduledMinutes} />
      </main>

      {/* Footer-komponent */}
      <Footer />
    </div>
  );
}

export default App;
