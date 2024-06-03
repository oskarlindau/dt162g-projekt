/**

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
UpdateTrainingModal.js: Modal för att uppdatera träningsformer

*
**/

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateTrainingModal = ({ isOpen, onRequestClose, training, onSubmit }) => {
  // State för formulärdata, fel- och framgångsmeddelanden.
  const [formData, setFormData] = useState({
    name: '',
    durationMinutes: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Uppdatera formData när training ändras.
  useEffect(() => {
    if (training) {
      setFormData({
        _id: training._id,
        name: training.name,
        durationMinutes: training.durationMinutes
      });
    }
  }, [training]);

  // Funktion för att hantera ändringar i formulärfält.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Funktion för att hantera formulärsubmission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Anropa onSubmit-funktionen med formData för att uppdatera träningsformen.
      const response = await onSubmit(formData);
      if (response.success) {
        // Uppdatera state med framgångsmeddelande om submission lyckas.
        setSuccessMessage('Träningsformen har uppdaterats!');
        setErrorMessage('');
      } else {
        // Uppdatera state med felmeddelande om submission misslyckas.
        setErrorMessage('Det gick inte att uppdatera träningsform. Tänk på att det måste finnas ett namn och träningsminuter måste vara högre än 0.');
        setSuccessMessage('');
      }
    } catch (error) {
      // Hantera eventuella fel vid submission.
      setErrorMessage('Det gick inte att uppdatera träningsform. Tänk på att det måste finnas ett namn och träningsminuter måste vara högre än 0.');
      setSuccessMessage('');
    }
  };

  // Funktion för att stänga modalen och återställa formulärdata samt meddelanden.
  const handleClose = () => {
    setFormData({
      name: '',
      durationMinutes: ''
    });
    setErrorMessage('');
    setSuccessMessage('');
    onRequestClose();
    window.location.reload(); // Ladda om sidan för att se ändringar i träningsformen.
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Uppdatera träningsform"
    >
      {/* Rubrik för modalen */}
      <h2 style={{ backgroundColor: 'rgb(194, 191, 229)', padding: '.5rem 0' }}>Uppdatera träningsform</h2>
      {/* Visa felmeddelande om det finns */}
      {errorMessage && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.25rem' }}>{errorMessage}</p>}
      {/* Visa framgångsmeddelande om det finns */}
      {successMessage && 
        <>
          <p style={{ color: 'green', fontWeight: '600', fontSize: '1.25rem' }}>{successMessage}</p>
          {/* Visa uppdaterade träningsuppgifter */}
          <div>
            <p>Träningsform: {formData.name}</p>
            <p>Träningsminuter: {formData.durationMinutes}</p>
          </div>
        </>
      }
      {/* Visa formulär om varken framgångs- eller felmeddelande finns */}
      {!successMessage && (
        <form style={{ paddingBottom: '1rem', borderBottom: '1px solid #454545' }} onSubmit={handleSubmit}>
          <div>
            {/* Input-fält för att ange träningsformens namn */}
            <label htmlFor="name">Namn:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Träningsnamn"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            {/* Input-fält för att ange träningsformens längd i minuter */}
            <label htmlFor="durationMinutes">Träningsminuter:</label>
            <input
              type="number"
              id="durationMinutes"
              name="durationMinutes"
              min="1"
              value={formData.durationMinutes}
              onChange={handleChange}
              required
            />
          </div>
          {/* Knapp för att skicka formuläret */}
          <button className='green-btn' type="submit">Uppdatera</button>
        </form>
      )}
      {/* Knapp för att stänga modalen */}
      <button className='red-btn' style={{ maxWidth: '320px', width: '100%', marginTop: '1rem', borderTop: '1px solid #454545' }} type="button" onClick={handleClose}>Stäng</button>
    </Modal>
  );
};

export default UpdateTrainingModal;
