/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
AddTrainingeModal.js: Modal för att lägga till en träningsform till min databas

*
**/

import React, { useState } from 'react';
import Modal from 'react-modal';

const AddTrainingModal = ({ isOpen, onRequestClose, onSubmit }) => {
  // State för att hantera formulärdata och meddelanden
  const [formData, setFormData] = useState({
    name: '',
    durationMinutes: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Funktion för att hantera ändringar i formuläret
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Funktion för att skicka data i formuläret 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await onSubmit(formData);
      // Kontrollera om anropet lyckades eller misslyckades
      if (response.success) {
        setSuccessMessage('Träningsformen har lagts till!');
        setErrorMessage('');
      } else {
        setErrorMessage('Det gick inte att lägga till träningsform. Tänk på att det måste finnas ett namn och träningsminuter måste vara högre än 0.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Det gick inte att lägga till träningsform. Tänk på att det måste finnas ett namn och träningsminuter måste vara högre än 0.');
      setSuccessMessage('');
    }
  };

  // Funktion för att stänga modalen
  const handleClose = () => {
    // Återställ formulärdata och meddelanden
    setFormData({
      name: '',
      durationMinutes: ''
    });
    setErrorMessage('');
    setSuccessMessage('');
    onRequestClose();
    // Ladda om sidan för att uppdatera träningsformer
    window.location.reload();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Lägg till träningsform"
    >
      {/* Rubrik för modal */}
      <h2 style={{ backgroundColor: 'rgb(194, 191, 229)', padding: '.5rem 0' }}>Lägg till träningsform</h2>
      {/* Visa fel- och succémeddelanden */}
      {errorMessage && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.25rem' }}>{errorMessage}</p>}
      {successMessage && 
        <>
          <p style={{ color: 'green', fontWeight: '600', fontSize: '1.25rem' }}>{successMessage}</p>
          {/* Visa information om den tillagda träningsformen */}
          <div>
              <p>Träningsform: {formData.name}</p>
              <p>Träningsminuter: {formData.durationMinutes}</p>
          </div>
        </>
      }
      {/* Formulär för att lägga till träningsform */}
      {!successMessage && (
        <form style={{ paddingBottom: '1rem', borderBottom: '1px solid #454545' }} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Namn:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Träningsnamn"
              min="1"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="durationMinutes">Träningsminuter:</label>
            <input
              type="number"
              id="durationMinutes"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleChange}
              required
            />
          </div>
          {/* Knapp för att lägga till */}
          <button className='green-btn' type="submit">Lägg till</button>
        </form>
      )}
      {/* Knapp för att stänga modalen */}
      <button className='red-btn' style={{ maxWidth: '320px', width: '100%', marginTop: '1rem', borderTop: '1px solid #454545' }} type="button" onClick={handleClose}>Stäng</button>
    </Modal>
  );
};

export default AddTrainingModal;
