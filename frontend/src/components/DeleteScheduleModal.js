/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
DeleteScheduleModal.js: Modal för att radera en aktivitet

*
**/

// Importerar React och modal-paket
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
// Behöver ID specifik träningsform för att få ut info om träningsform
import { getTrainingById } from '../api/api';

const DeleteScheduleModal = ({ isOpen, onRequestClose, schedule, onSubmit }) => {
    // State för att hantera formulärdata och meddelanden
    const [formData, setFormData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [training, setTraining] = useState('');

    // Effektfunktion som körs när schedule uppdateras
    useEffect(() => {
        // Kontrollera om schedule är satt
        if (schedule) {
            // Uppdatera formulärdata med schedule-information
            setFormData({
                _id: schedule._id,
                day: schedule.day,
                training: schedule.training,
            });

            // Funktion för att hämta träningsinformation baserat på schedule.training-id
            const fetchTraining = async () => {
                try {
                    const response = await getTrainingById(schedule.training);
                    setTraining(response);
                } catch (error) {
                    console.error('Error fetching training:', error);
                }
            };

            // Kör fetchTraining om modalen är öppen
            if (isOpen) {
                fetchTraining();
            }
        }
    }, [schedule, isOpen]);

    // Funktion för att hantera inlämning av formuläret för att radera träningsformen
    const handleSubmit = async () => {
        try {
            // Anropa onSubmit-funktionen med formulärdata._id för att radera träningsformen
            const response = await onSubmit(formData._id);
            if (response.success) {
                setSuccessMessage('Träningsformen har raderats!');
                setErrorMessage('');
            } else {
                setErrorMessage('Det gick inte att radera träningsformen. Stäng modalen och försök igen.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Det gick inte att radera träningsformen. Stäng modalen och försök igen.');
            setSuccessMessage('');
        }
    };
    
    // Funktion för att stänga modalen
    const handleClose = () => {
        // Återställ meddelanden och stäng modalen
        setErrorMessage('');
        setSuccessMessage('');
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="Radera aktivitet"
        >
        {/* Rubrik för modal */}
        <h2 style={{ backgroundColor: 'rgb(194, 191, 229)', padding: '.5rem 0' }}>Radera aktivitet</h2>
        {/* Visa fel- och succémeddelanden */}
        {errorMessage && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.25rem' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green', fontWeight: '600', fontSize: '1.25rem' }}>{successMessage}</p>}
        {/* Visa fråga om att radera träningsformen */}
        {!errorMessage && !successMessage && formData && (
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #454545', maxWidth: '320px', width: '100%', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>Är du säker på att du vill radera {training.name}, {training.durationMinutes} min på {formData.day}?</p>
                {/* Knapp för att radera träningsformen */}
                <button className='green-btn' type="button" onClick={handleSubmit}>Ja, radera</button>
            </div>
        )}
        {/* Knapp för att stänga modalen */}
        <button className='red-btn' style={{ maxWidth: '320px', width: '100%', marginTop: '1rem', borderTop: '1px solid #454545' }} type="button" onClick={handleClose}>Stäng</button>
        </Modal>
    );
};

export default DeleteScheduleModal;
