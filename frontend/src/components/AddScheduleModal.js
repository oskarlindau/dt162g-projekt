/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
AddScheduleModal.js: Modal för att lägga till en aktivitet till min databas

*
**/

// Importerar React och 'react-modal' ett paket som udnerlättar arbete med modal
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
// Importerar fetch-anrop från api.js
import { getTrainings } from '../api/api';

// Deklarerar komponent sätter form data och de useState som jag behöver
const AddScheduleModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    day: '',
    training: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [trainings, setTrainings] = useState([]); 


  // När komponenten laddas kommer den att hämta träningsformer och sätta i state
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await getTrainings();
        setTrainings(response);
      } catch (error) {
        console.error('Problem vid hämtning av träningsformer:', error);
      }
  };

    fetchTrainings();
  }, []); 

  // Funktion för att kunna manipulera min data i formulär och skicka vidare. Den tar all data i mitt formulär.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // funktion för att hantera att någon klickar på lägg till
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Försöker skicka data till databas
    try {
      const response = await onSubmit(formData);
      // Om svaret är success så har databasen lagrat
      if (response.success) {
        setSuccessMessage('Aktiviteten har lagts till!');
        setErrorMessage('');
        // Om inte så ladda felmeddelande
      } else {
        setErrorMessage('Det gick inte att lägga till aktiviteten. Försök igen.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Det gick inte att lägga till aktiviteten. Försök igen.');
      setSuccessMessage('');
    }
  };

  // Om man försöker stänga modalen så nollställ formdatat och meddelanden
  const handleClose = () => {
    setFormData({
      day: '',
      training: ''
    });
    setErrorMessage('');
    setSuccessMessage('');
    onRequestClose();
  };

  // Rendering 
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Lägg till aktivitet"
    >
      {/* Rendera en rubrik i modalen och styr sedan innehållet med operatorer beroende på vilket meddelande som är laddat */}
      <h2 style={{ backgroundColor: 'rgb(194, 191, 229)', padding: '.5rem 0' }}>Lägg till aktivitet</h2>
      {errorMessage && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.25rem' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green', fontWeight: '600', fontSize: '1.25rem' }}>{successMessage}</p>}
      {!successMessage && (
        <form style={{ paddingBottom: '1rem', borderBottom: '1px solid #454545' }} onSubmit={handleSubmit}>
          <div>
            {/* Select som tar veckodagarna som value, det är vad min databas accepterar */}
            <label htmlFor="day">Veckodag:</label>
            <select
              id="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              required
            >
              <option value="">Välj veckodag</option>
              <option value="Måndag">Måndag</option>
              <option value="Tisdag">Tisdag</option>
              <option value="Onsdag">Onsdag</option>
              <option value="Torsdag">Torsdag</option>
              <option value="Fredag">Fredag</option>
              <option value="Lördag">Lördag</option>
              <option value="Söndag">Söndag</option>
            </select>
          </div>
          <div>
            <label htmlFor="training">Träningsform:</label>
            <select
              id="training"
              name="training"
              value={formData.training}
              onChange={handleChange}
              required
            >
              {/* Skriv ut alla träningsformer och ge id som value för att spara i databasen, resten för att presentera mot klienten */}
              <option value="">Välj träningsform</option>
              {trainings.map(training => (
                <option key={training._id} value={training._id}>{training.name}, {training.durationMinutes} min</option>
              ))}
            </select>
          </div>
          <button className='green-btn' type="submit">Lägg till</button>
        </form>
      )}
      <button className='red-btn' style={{ maxWidth: '320px', width: '100%', marginTop: '1rem', borderTop: '1px solid #454545' }} type="button" onClick={handleClose}>Stäng</button>
    </Modal>
  );
};

// exportera komponent
export default AddScheduleModal;
