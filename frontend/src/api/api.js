/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
Api.js: Denna fil hanterar alla mina fetch anrop till mitt API för att kommunicera med min databas

*
**/

// "BASE_URL" innehåller den första delen av sökvägen till mitt API för att förenkla min kod
const BASE_URL = 'http://localhost:3000/api';

// Hämta schemalagda aktiviteter
export const getSchedules = async () => {
    try {
        // fetch-anrop hämta aktiviteter
        const response = await fetch(`${BASE_URL}/schedule`);
        // Om anropet inte är okej, skicka error och felmeddelande
        if (!response.ok) {
            throw new Error('Misslyckades med att hämta aktiviteter');
        }
        // Annars skicka svaret i json
        return await response.json();
        // Om något oväntat händer skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop aktiviteter', error);
        throw error;
    }
};

// Hämta aktiviteter med id
export const getScheduleById = async (id) => {
    try {
        // skicka anrop med id 
        const response = await fetch(`${BASE_URL}/schedule/${id}`);
        // Om anropet inte är okej, skicka error och felmeddelande
        if (!response.ok) {
            throw new Error('Misslyckades med att hämta id-specifik aktivitet');
        }
        // Annars skicka svaret i json
        return await response.json();
    } catch (error) {
        // Om något oväntat händer skicka felmeddelande
        console.error('Fel vid anrop aktiviteter med ID', error);
        throw error;
    }
};

// Lägg till en ny aktivitet
export const addSchedule = async (data) => {
    try {
        // Skicka api-anrop med post-metod med data i body
        const response = await fetch(`${BASE_URL}/schedule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        // ta datan i variabel i json-format
        const responseData = await response.json();
        // om responsen är lyckad returnera success och tomt felmeddelande
        if (response.ok) {
            return {
                success: true,
                errorMessage: '',
            };
            // om responsen är misslyckad returnera success-false och felmeddelande
        } else {
            return {
                success: false,
                errorMessage: responseData.message,
            };
        }
        // Om något oväntat händer skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop lagring av aktivitet', error);
        throw error;
    }
};

// Funktion för att uppdatera aktivitet med id i sökväg och data i body
export const updateSchedule = async (id, data) => {
    try {
        // Skicka anrop med id i sökväg med patch-metod och datan i body
        const response = await fetch(`${BASE_URL}/schedule/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        // om responsen är lyckad returnera success och tomt felmeddelande
        const responseData = await response.json();
        if (response.ok) {
            return {
                success: true,
                errorMessage: '',
            };
            // om responsen är misslyckad returnera success-false och felmeddelande
        } else {
            return {
                success: false,
                errorMessage: responseData.message,
            };
        }
        // Om något oväntat händer skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop uppdatering aktivitet:', error);
        throw error;
    }
};

// Radera en aktivitet med delete-metod, id i sökväg
export const deleteSchedule = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/schedule/${id}`, {
            method: 'DELETE',
        });
        // om responsen är lyckad returnera success och tomt felmeddelande
        const responseData = await response.json();
        if (response.ok) {
            return {
                success: true,
                errorMessage: '',
            };
            // om responsen är misslyckad returnera success-false och felmeddelande
        } else {
            return {
                success: false,
                errorMessage: responseData.message,
            };
        }
        // Om något oväntat händer skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop radering av aktivitet:', error);
        throw error;
    }
};

// Hämta träningsformer
export const getTrainings = async () => {
    try {
        // skicka fetch-anrop 
        const response = await fetch(`${BASE_URL}/training`);
        // Om inte ok skicka felmeddelande
        if (!response.ok) {
            throw new Error('Kunde inte hämta träningsformer');
        }
        // annars skicka datan i json-format
        return await response.json();
        // om något oväntat händer under andropet
    } catch (error) {
        console.error('Fel vid anrop av träningsformer:', error);
        throw error;
    }
};

// Hämta aktiviteter med id
export const getTrainingById = async (id) => {
    try {
        // Skicka fetch-anrop med ID i sökväg
        const response = await fetch(`${BASE_URL}/training/${id}`);
        // Om svaret inte lyckas skicka error och felmeddelande
        if (!response.ok) {
            throw new Error('Misslyckades hämta träningsform med ID');
        }
        // Ta annars emot svaret i json-format
        return await response.json();
        // Om något händer i anropet skicka fel
    } catch (error) {
        console.error('Fel vid anrop av träningsform med ID', error);
        throw error;
    }
};

// Försöker lägga till träningsform med POST-metod
export const addTraining = async (data) => {
    try {
        // Post-metod med data i body för att kunna lägg atill
        const response = await fetch(`${BASE_URL}/training`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Lagra svar i json-format, om ok- ge success och inget felmeddelande
        const responseData = await response.json();
        if (response.ok) {
            return {
                success: true,
                errorMessage: '',
            };
            // Om misslyckat anrop success-false och felmeddelande
        } else {
            return {
                success: false,
                errorMessage: responseData.message,
            };
        }
        // Om något fel händer i anrop, skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop, lägga till träningsform', error);
        throw error;
    }
};

// Uppdatera träning med id och data 
export const updateTraining = async (id, data) => {
    try {
        // fetch-anrop med id i sökväg och data i body
        const response = await fetch(`${BASE_URL}/training/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Lagra svar i json-format, om ok- ge success och inget felmeddelande
        const responseData = await response.json();
        if (response.ok) {
            return {
                success: true,
                errorMessage: '',
            };
            // Om misslyckat anrop success-false och felmeddelande
        } else {
            return {
                success: false,
                errorMessage: responseData.message,
            };
        }
        // Om något fel händer i anrop, skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop, uppdatera träningsform', error);
        throw error;
    }
};

// Radera träningsform
export const deleteTraining = async (id) => {
    try {
        // Skicka fetch-anrop med id i sökväg och delete-metod
        const response = await fetch(`${BASE_URL}/training/${id}`, {
            method: 'DELETE',
        });

        // Lagra svar i json-format, om ok- ge success och inget felmeddelande
        const responseData = await response.json();
        if (response.ok) {
            return {
                success: true,
                errorMessage: '',
            };
            // Om misslyckat anrop success-false och felmeddelande
        } else {
            return {
                success: false,
                errorMessage: responseData.message,
            };
        }
        // Om något fel händer i anrop, skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop radera träningsform', error);
        throw error;
    }
};

// Hämta träningsmål
export const getTrainingGoal = async () => {
    try {
        // Fetch-anrop för att hämta träningsmål
        const response = await fetch(`${BASE_URL}/goal`);
        // Om anropet misslyckas skicka error och felmeddelande
        if (!response.ok) {
            throw new Error('Misslyckades hämta träningsmål');
        }
         // Annars hämta svaret i json-format
        return await response.json();
        // Om fel vid anropet skicka felet
    } catch (error) {
        console.error('Fel vid anrop, hämta träningsform:', error);
        throw error;
    }
};

// Uppdatera träningsmål med data i body
export const updateTrainingGoal = async (data) => {
    try {
        // Fetch-anrop med patch-metod med data i body
        const response = await fetch(`${BASE_URL}/goal`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Lagra svar i json-format, om ok- ge success och inget felmeddelande
        const responseData = await response.json();
        if (response.ok) {
            return {
                success: true,
                errorMessage: '',
            };
            // Om misslyckat anrop success-false och felmeddelande
        } else {
            return {
                success: false,
                errorMessage: responseData.message,
            };
        }
        // Om något fel händer i anrop, skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop uppdatera träningsmål:', error);
        throw error;
    }
};

// Hämta schemalagda träningsmål
export const getScheduledMinutes = async () => {
    try {
        // Skicka fetch-anrop 
        const response = await fetch(`${BASE_URL}/scheduledMinutes`);
        // Om svaret misslyckas skicka error och felmeddelande
        if (!response.ok) {
            throw new Error('Failed to fetch training goal');
        }
        // Annars hämta svaret i json-format
        return await response.json();
        // Om något fel händer i anrop, skicka felmeddelande
    } catch (error) {
        console.error('Fel vid anrop hämta schemalagda träningsminuter:', error);
        throw error;
    }
};