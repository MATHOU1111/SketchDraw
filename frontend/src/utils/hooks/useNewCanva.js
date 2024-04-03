import { useState } from 'react';

export function usePostCanva(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const postData = async (body) => {
        if (!url) {
            console.error('URL not provided for post request');
            setError(new Error('URL not provided'));
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Une erreur est survenue lors de la réponse réseau');
            }

            const responseData = await response.json();
            setData(responseData);
            console.log(responseData);
            return responseData;
        } catch (err) {
            console.error('Erreur lors de la soumission des données:', err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading,error, postData };
}
