/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
index.js: Sätter mitt rot-element och pekar på att det är min huvudapplikation som ska köras.

*
**/

import React from 'react';
import ReactDOM from 'react-dom/client'; // Uppdaterad import
import Modal from 'react-modal';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ange rot-elementet som app-element för react-modal
Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
