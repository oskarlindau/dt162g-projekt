/**

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
UpdateTrainingGoalModal.js: Modal för att uppdatera träningsmål

*
**/

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateTrainingGoalModal = ({ isOpen, onRequestClose, trainingGoal, onSubmit }) => {
    // State för formulärdata, fel- och framgångsmeddelanden.
    const [formData, setFormData] = useState({
        goalMinutes: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Uppdatera formData när trainingGoal ändras.
        if (trainingGoal) {
            setFormData({
                goalMinutes: trainingGoal.goalMinutes
            });
        }
    }, [trainingGoal]);

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
            // Anropar onSubmit-funktionen med formData för att uppdatera träningsmålet.
            const response = await onSubmit(formData);
            if (response.success) {
                // Uppdatera state med framgångsmeddelande om submission lyckas.
                setSuccessMessage('Träningsmålet har uppdaterats!');
                setErrorMessage('');
            } else {
                // Uppdatera state med felmeddelande om submission misslyckas.
                setErrorMessage('Det gick inte att uppdatera träningsmålet. Stäng modalen och försök igen.');
                setSuccessMessage('');
            }
        } catch (error) {
            // Hantera eventuella fel vid submission.
            setErrorMessage('Det gick inte att uppdatera träningsmålet. Stäng modalen och försök igen.');
            setSuccessMessage('');
        }
    };
    
    // Funktion för att stänga modalen.
    const handleClose = () => {
        // Återställ formData och meddelanden samt stäng modalen.
        setFormData({
            goalMinutes: trainingGoal.goalMinutes
        });
        setErrorMessage('');
        setSuccessMessage('');
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="Uppdatera träningsmål"
        >
            {/* Rubrik för modalen */}
            <h2 style={{ backgroundColor: 'rgb(194, 191, 229)', padding: '.5rem 0', textAlign: 'center' }}>Uppdatera träningsmål</h2>
            {/* Visa felmeddelande om det finns */}
            {errorMessage && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.25rem' }}>{errorMessage}</p>}
            {/* Visa framgångsmeddelande om det finns */}
            {successMessage && <p style={{ color: 'green', fontWeight: '600', fontSize: '1.25rem' }}>{successMessage}</p>}
            {/* Visa formulär om varken framgångs- eller felmeddelande finns */}
            {!errorMessage && !successMessage && (
                <form style={{ paddingBottom: '1rem', borderBottom: '1px solid #454545' }}>
                    <div>
                        {/* Input-fält för att ange nytt träningsmål */}
                        <label htmlFor="goalMinutes">Nytt träningsmål (minuter):</label>
                        <input
                            type="number"
                            id="goalMinutes"
                            name="goalMinutes"
                            min="1"
                            value={formData.goalMinutes}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Knapp för att skicka formulär */}
                    <button className='green-btn' type="button" onClick={handleSubmit} style={{ width: '100%' }}>Uppdatera</button>
                </form>
            )}
            {/* Knapp för att stänga modalen */}
            <button className='red-btn' style={{ maxWidth: '320px', width: '100%', marginTop: '1rem' }} type="button" onClick={handleClose}>Stäng</button>
        </Modal>
    );
};

export default UpdateTrainingGoalModal;
