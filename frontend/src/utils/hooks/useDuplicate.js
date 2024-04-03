import { useState } from 'react';

export function useDuplicate(url) {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Use null or a more descriptive initial state for error
    // Added state for data
    const [data, setData] = useState(null);


    const duplication = async (id) => {
        setLoading(true);

        try {
            // Fetch data
            const fetchedData = await fetchData(id);
            // Post fetched data
            await postFetchedData(fetchedData);
        } catch (err) {
            console.error('Error during duplication process:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    async function fetchData(id) {
        try {
            const response = await fetch(url + `/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(true);
            throw err; // Propagate the error to be caught in `duplication`
        }
    }

    async function postFetchedData(data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const responseData = await response.json();
            setData(responseData); // Now correctly setting the state
            console.log(responseData);
        } catch (err) {
            console.error('Error posting data:', err);
            setError(err);
            throw err; // Allow the error to be caught by the caller
        }
    }

    // Return states and the function that allows data duplication
    return { isLoading, error, data, duplication }; 
}
