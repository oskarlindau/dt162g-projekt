/**

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
TrainingGoal.js: Hanterar och presnenterar mitt träningsmål i databasen

*
**/

import React, { useState, useEffect } from 'react';
import { getTrainingGoal, updateTrainingGoal } from '../api/api';
import UpdateTrainingGoalModal from './UpdateTrainingGoalModal';

const TrainingGoalComponent = ({ scheduledMinutes }) => {
    // State för att hantera träningsmål och modalstatus
    const [trainingGoal, setTrainingGoal] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [scheduledMinutesColor, setScheduledMinutesColor] = useState('green'); // State för färgen på de schemalagda minuterna

    // Funktion för att hämta träningsmål från databasen
    const fetchTrainingGoal = async () => {
        try {
            const response = await getTrainingGoal();
            setTrainingGoal(response);
        } catch (error) {
            console.error('Error fetching training goal:', error);
        }
    };

    // Hämta träningsmål när komponenten mountas
    useEffect(() => {
        fetchTrainingGoal();
    }, []);

    // Uppdatera färgen på de schemalagda minuterna baserat på träningsmålet
    useEffect(() => {
        const newColor = scheduledMinutes.scheduledMinutes < trainingGoal.goalMinutes ? 'red' : 'green';
        setScheduledMinutesColor(newColor);
    }, [scheduledMinutes.scheduledMinutes, trainingGoal.goalMinutes]);
    
    // Öppna modal för att uppdatera träningsmål
    const handleUpdateModalOpen = () => {
        setIsUpdateModalOpen(true);
    };

    // Stäng modal för att uppdatera träningsmål
    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
    };

    // Funktion för att uppdatera träningsmål
    const handleUpdateTrainingGoal = async (formData) => {
        try {
            const response = await updateTrainingGoal(formData);
            fetchTrainingGoal(); // Hämta uppdaterade träningsmål
            return response;
        } catch (error) {
            console.error('Error updating training goal:', error);
        }
    };

    // Rendera komponenten
    return (
        <div className='section' style={{ display: 'flex', flexDirection: 'column', width: '320px', padding: '1rem', backgroundColor: '#f9f9f9', gap: '1rem', textAlign: 'center', alignSelf: 'center', boxShadow: '0px 1px 4px #00000030', fontSize: '1.125rem', fontWeight: '600', marginTop: '2rem', marginBottom: '2rem' }}>
            {/* Visa träningsmål och knapp för att uppdatera */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                Träningsmål: {trainingGoal.goalMinutes} min
                <button className='green-btn' onClick={handleUpdateModalOpen}>Uppdatera</button>
            </div>
            {/* Visa de schemalagda minuterna och färgen baserat på träningsmålet */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid #ddd', paddingTop: '1rem'}}>
                Schemalagda träningsminuter: <p style={{ margin: '0', color: scheduledMinutesColor }}>{scheduledMinutes.scheduledMinutes} min</p>
            </div>
            {/* Uppdatera träningsmål-modal */}
            <UpdateTrainingGoalModal
                isOpen={isUpdateModalOpen}
                onRequestClose={handleUpdateModalClose}
                onSubmit={handleUpdateTrainingGoal}
                trainingGoal={trainingGoal}
            />
        </div>
    );
};

export default TrainingGoalComponent;