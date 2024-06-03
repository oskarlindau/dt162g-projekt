/**

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
Training.js: Träningsformer i lista och action för modal och förälderkomponent till modaler

*
**/

import React, { useState, useEffect } from 'react';
import AddTrainingModal from './AddTrainingModal';
import UpdateTrainingModal from './UpdateTrainingModal';
import DeleteTrainingModal from './DeleteTrainingModal';
import { getTrainings, addTraining, updateTraining, deleteTraining } from '../api/api';

const Training = () => {
  // State för att hantera träningsformer och modalstatus
  const [trainings, setTrainings] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Funktion för att hämta träningsformer från databasen
  const fetchTrainings = async () => {
    try {
      const response = await getTrainings();
      setTrainings(response);
    } catch (error) {
      console.error('Error fetching training forms:', error);
    }
  };

  // Hämta träningsformer när komponenten mountas
  useEffect(() => {
    fetchTrainings();
  }, []);

  // Öppna modal för att lägga till träningsform
  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  // Stäng modal och ta bort info
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  // Öppna modal för att uppdatera träningsform, skicka med specifik träningsform
  const handleUpdateModalOpen = (training) => {
    setSelectedTraining(training);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedTraining(null);
  };

  // Öppna modal för att radera träningsform, skicka med specifik träningsform
  const handleDeleteModalOpen = (training) => {
    setSelectedTraining(training);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedTraining(null);
  };

  // Funktion för att lägga till träningsform
  const handleAddTraining = async (formData) => {
    try {
      const response = await addTraining(formData);
      fetchTrainings(); // Hämta uppdaterade träningsformer
      return response;
    } catch (error) {
      console.error('Error adding training form:', error);
    }
  };
  
  // Funktion för att uppdatera träningsform
  const handleUpdateTraining = async (formData) => {
    try {
      const response = await updateTraining(formData._id, formData);
      fetchTrainings(); // Hämta uppdaterade träningsformer
      return response;
    } catch (error) {
      console.error('Error updating training form:', error);
    }
  };  
  
  // Funktion för att radera träningsform
  const handleDeleteTraining = async (id) => {
    try {
      const response = await deleteTraining(id);
      fetchTrainings(); // Hämta uppdaterade träningsformer
      return response;
    } catch (error) {
      console.error('Error deleting training form:', error);
    }
  };

  // Rendera komponenten
  return (
    <div className='section' style={{ borderBottom: '1px solid #454545', paddingBottom: '2rem' }}>
      <h2>Mina träningsformer:</h2>
      {/* Tabell för att visa träningsformer */}
      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Träningsminuter</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((training) => (
            <tr key={training._id}>
              <td data-label="Namn:">{training.name}</td>
              <td data-label="Träningsminuter:">{training.durationMinutes} min</td>
              <td>
                <div className="knappdiv" style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
                  {/* Knappar för att uppdatera och radera träningsformer */}
                  <button className='green-btn' onClick={() => handleUpdateModalOpen(training)}>Uppdatera</button>
                  <button className='red-btn' onClick={() => handleDeleteModalOpen(training)}>Radera</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Knapp för att öppna modal för att lägga till träningsform */}
      <button className='green-btn' onClick={handleAddModalOpen}>Lägg till träningsform</button>
      
      {/* Lägg till modaler för att hantera lägg till, uppdatera och radera träningsformer */}
      <AddTrainingModal
        isOpen={isAddModalOpen}
        onRequestClose={handleAddModalClose}
        onSubmit={handleAddTraining}
      />
      <UpdateTrainingModal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleUpdateModalClose}
        training={selectedTraining}
        onSubmit={handleUpdateTraining}
      />
      <DeleteTrainingModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleDeleteModalClose}
        training={selectedTraining}
        onSubmit={handleDeleteTraining}
      />
    </div>
  );  
};

export default Training;