import { useState } from 'react';

const usePutRequest = (url) =>  {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const fetchData = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
            } else {
                const errorMessage = await response.text();
                setError(`Erreur ${response.status}: ${errorMessage}`);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError("Une erreur s'est produite lors de la requête. Veuillez réessayer plus tard.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, fetchData };
};

export default usePutRequest;
