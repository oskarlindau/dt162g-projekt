/**

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
UpdateScheduleModal.js: Modal för att uppdatera träningsaktivitet

*
**/

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getTrainings } from '../api/api';

const UpdateScheduleModal = ({ isOpen, onRequestClose, schedule, onSubmit }) => {
  // State för att hålla formulärdata, fel- och framgångsmeddelanden, samt hämtade träningsformer från API:et.
  const [formData, setFormData] = useState({
    day: '',
    training: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    // Uppdatera formData när en ny schemarad valts.
    if (schedule) {
      setFormData({
        _id: schedule._id,
        day: schedule.day,
        training: schedule.training
      });
    }

    // Hämta träningsformer från API:et när komponenten mountas eller schedule ändras.
    const fetchTrainings = async () => {
      try {
        const response = await getTrainings();
        setTrainings(response);
      } catch (error) {
        console.error('Problem vid hämtning av träningsformer:', error);
      }
    };

    fetchTrainings();
  }, [schedule]);

  // Funktion för att uppdatera formData när formulärfält ändras.
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
      // Anropar onSubmit-funktionen med formData för att uppdatera schemaraden.
      const response = await onSubmit(formData);
      if (response.success) {
        // Uppdatera state med framgångsmeddelande om submission lyckas.
        setSuccessMessage('Aktiviteten har uppdaterats!');
        setErrorMessage('');
      } else {
        // Uppdatera state med felmeddelande om submission misslyckas.
        setErrorMessage('Det gick inte att uppdatera aktiviteten. Försök igen.');
        setSuccessMessage('');
      }
    } catch (error) {
      // Hantera eventuella fel vid submission.
      setErrorMessage('Det gick inte att uppdatera aktiviteten. Försök igen.');
      setSuccessMessage('');
    }
  };

  // Funktion för att stänga modalen.
  const handleClose = () => {
    // Återställ formulärdata och meddelanden samt stäng modalen.
    setFormData({
      day: '',
      training: ''
    });
    setErrorMessage('');
    setSuccessMessage('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Uppdatera aktivitet"
    >
      {/* Rubrik för modalen */}
      <h2 style={{ backgroundColor: 'rgb(194, 191, 229)', padding: '.5rem 0' }}>Uppdatera aktivitet</h2>
      {/* Visa felmeddelande om det finns */}
      {errorMessage && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.25rem' }}>{errorMessage}</p>}
      {/* Visa framgångsmeddelande om det finns */}
      {successMessage && <p style={{ color: 'green', fontWeight: '600', fontSize: '1.25rem' }}>{successMessage}</p>}
      {/* Visa formulär om ingen framgångs- eller felmeddelande finns */}
      {!successMessage && (
        <form style={{ paddingBottom: '1rem', borderBottom: '1px solid #454545' }} onSubmit={handleSubmit}>
          <div>
            {/* Dropdown för att välja veckodag */}
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
            {/* Dropdown för att välja träningsform */}
            <label htmlFor="training">Träningsform:</label>
            <select
              id="training"
              name="training"
              value={formData.training}
              onChange={handleChange}
              required
            >
              <option value="">Välj träningsform</option>
              {/* Mappar över träningsformerna från API:et och skapar options */}
              {trainings.map(training => (
                <option key={training._id} value={training._id}>{training.name}, {training.durationMinutes} min</option>
              ))}
            </select>
          </div>
          {/* Knapp för att skicka formulär */}
          <button className='green-btn' type="submit">Uppdatera</button>
        </form>
      )}
      {/* Knapp för att stänga modalen */}
      <button className='red-btn' style={{ maxWidth: '320px', width: '100%', marginTop: '1rem', borderTop: '1px solid #454545' }} type="button" onClick={handleClose}>Stäng</button>
    </Modal>
  );
};

export default UpdateScheduleModal;
