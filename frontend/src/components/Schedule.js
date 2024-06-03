/**

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
Schedule.js: Träningsaktiviteter i lista och action för modal och förälderkomponent till modaler

*
**/

import React, { useState, useEffect } from 'react';
import AddScheduleModal from './AddScheduleModal';
import DeleteScheduleModal from './DeleteScheduleModal';
import UpdateScheduleModal from './UpdateScheduleModal';
import { getSchedules, getTrainingById, addSchedule, deleteSchedule, updateSchedule } from '../api/api';

const Schedule = ({ updateScheduledMinutes }) => {
    // State för att hantera scheman och modalstatus
    const [schedules, setSchedules] = useState([]);
    const [scheduleComponents, setScheduleComponents] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    // Funktion för att hämta scheman från databasen
    const fetchSchedules = async () => {
        try {
            const response = await getSchedules();
            setSchedules(response);
            updateScheduledMinutes(); // Uppdatera planerade minuter
        } catch (error) {
            console.error('Error fetching training forms:', error);
        }
    };

    // Hämta scheman när komponenten mountas
    useEffect(() => {
        fetchSchedules();
    }, []);

    // Öppna modal för att lägga till aktivitet
    const handleAddModalOpen = () => {
        setIsAddModalOpen(true);
    };

    // Stäng modal och ta bort info
    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
    };

    // Öppna modal för att radera aktivitet skickar med specifik aktivitet
    const handleDeleteModalOpen = (schedule) => {
        setSelectedSchedule(schedule);
        setIsDeleteModalOpen(true);
    };

    // Stäng modal och ta bort info
    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setSelectedSchedule(null);
    };

    // Öppna modal för att uppdatera aktivitet skickar med specifik aktivitet
    const handleUpdateModalOpen = (schedule) => {
        setSelectedSchedule(schedule);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
        setSelectedSchedule(null);
    };

    // Funktion för att lägga till aktivitet till schema
    const handleAddSchedule = async (formData) => {
        try {
            const response = await addSchedule(formData);
            fetchSchedules(); // Hämta uppdaterade scheman
            return response;
        } catch (error) {
            console.error('Error adding schedule form:', error);
        }
    };

    // Funktion för att radera aktivitet från schema
    const handleDeleteSchedule = async (id) => {
        try {
            const response = await deleteSchedule(id);
            fetchSchedules(); // Hämta uppdaterade scheman
            return response;
        } catch (error) {
            console.error('Error deleting scheduled activity:', error);
        }
    };

    // Funktion för att uppdatera aktivitet i schema
    const handleUpdateSchedule = async (formData) => {
        try {
            const response = await updateSchedule(formData._id, formData);
            fetchSchedules(); // Hämta uppdaterade scheman
            return response;
        } catch (error) {
            console.error('Error updating training form:', error);
        }
    };  

    // Veckodagar
    const daysOfWeek = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

    // Effekt för att hämta och rendera schemakomponenter
    useEffect(() => {
        const fetchScheduleComponents = async () => {
            const components = await Promise.all(
                daysOfWeek.map(async day => {
                    const filteredSchedules = schedules.filter(schedule => schedule.day === day);
                    const dayComponents = await Promise.all(
                        filteredSchedules.map(async (schedule, index) => {
                            try {
                                const trainingInfo = await getTrainingById(schedule.training);
                                return (
                                    <div key={index} className='activity'>
                                        <p>Aktivitet: {trainingInfo.name}, {trainingInfo.durationMinutes} min.</p>
                                        <div className='knappdiv'>
                                            <button className='green-btn' onClick={() => handleUpdateModalOpen(schedule)}>Uppdatera</button>
                                            <button className='red-btn' onClick={() => handleDeleteModalOpen(schedule)}>Radera</button>
                                        </div>
                                    </div>
                                );
                            } catch (error) {
                                console.error('Error fetching training info:', error);
                                return null;
                            }
                        })
                    );
                    return { day, components: dayComponents };
                })
            );
            setScheduleComponents(components);
        };

        fetchScheduleComponents();
    }, [schedules]);

    // Rendera komponenten
    return (
        <div className='section' style={{ borderTop: '1px solid #454545', paddingTop: '2rem' }}>
            <h2>Mitt träningsschema:</h2>
            {/* Rendera schema för varje veckodag */}
            {scheduleComponents.map(({ day, components }) => (
                <div key={day} style={{ boxShadow: '0px 1px 4px #00000030', backgroundColor: '#f9f9f9', marginBottom: '1rem' }}>
                    <h3>{day}</h3>
                    <div style={{ padding: '1rem', paddingTop: '0' }}>
                        {components}
                        {/* Visa meddelande om inga aktiviteter för dagen */}
                        {components.length === 0 && (
                            <p>Inga aktiviteter på {day}.</p>
                        )}
                    </div>
                </div>
            ))}
            {/* Knapp för att lägga till aktivitet */}
            <button className='green-btn' onClick={handleAddModalOpen}>Lägg till aktivitet</button>
            {/* Modalkomponenter för att lägga till, radera och uppdatera aktiviteter */}
            <AddScheduleModal
                isOpen={isAddModalOpen}
                onRequestClose={handleAddModalClose}
                onSubmit={handleAddSchedule}
            />
            <DeleteScheduleModal
                isOpen={isDeleteModalOpen}
                onRequestClose={handleDeleteModalClose}
                onSubmit={handleDeleteSchedule}
                schedule={selectedSchedule}
            />
            <UpdateScheduleModal
                isOpen={isUpdateModalOpen}
                onRequestClose={handleUpdateModalClose}
                schedule={selectedSchedule}
                onSubmit={handleUpdateSchedule}
            />
        </div>
    );
};

export default Schedule;
