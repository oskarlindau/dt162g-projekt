/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
DeleteTrainingModal.js: Modal för att radera en träningsform

*
**/

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const DeleteTrainingModal = ({ isOpen, onRequestClose, training, onSubmit }) => {
    // State för att hantera formulärdata och meddelanden
    const [formData, setFormData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Effektfunktion som körs när training uppdateras
    useEffect(() => {
        // Kontrollera om training är satt
        if (training) {
            // Uppdatera formulärdata med training-information
            setFormData({
                _id: training._id,
                name: training.name,
                durationMinutes: training.durationMinutes,
            });
        }
    }, [training]);

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
    
    // Funktion för att stänga modalen och ladda om sidan
    const handleClose = () => {
        // Återställ meddelanden och stäng modalen
        setErrorMessage('');
        setSuccessMessage('');
        onRequestClose();
        window.location.reload();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="Radera träningsform"
        >
        {/* Rubrik för modal */}
        <h2 style={{ backgroundColor: 'rgb(194, 191, 229)', padding: '.5rem 0' }}>Radera träningsform</h2>
        {/* Visa fel- och succémeddelanden */}
        {errorMessage && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.25rem' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green', fontWeight: '600', fontSize: '1.25rem' }}>{successMessage}</p>}
        {/* Visa fråga om att radera träningsformen */}
        {!errorMessage && !successMessage && formData && (
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #454545', maxWidth: '320px', width: '100%', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>Är du säker på att du vill radera {formData.name}, {formData.durationMinutes} min?</p>
                {/* Knapp för att radera träningsformen */}
                <button className='green-btn' type="button" onClick={handleSubmit}>Ja, radera</button>
            </div>
        )}
        {/* Knapp för att stänga modalen */}
        <button className='red-btn' style={{ maxWidth: '320px', width: '100%', marginTop: '1rem', borderTop: '1px solid #454545' }} type="button" onClick={handleClose}>Stäng</button>
        </Modal>
    );
};

export default DeleteTrainingModal;

