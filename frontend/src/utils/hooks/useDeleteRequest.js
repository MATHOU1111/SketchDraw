// useDeleteRequest.js
import { useState } from "react";

export function useDeleteRequest() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const responseData = await response.json();
                setError(
                    responseData.message ||
                    "Une erreur est survenue lors de la suppression."
                );
            }
        } catch (err) {
            console.error("Erreur lors de la suppression des données :", err);
            setError(err.message || true);
        } finally {
            setLoading(false);
        }
    };

    return { isLoading, error, deleteData };
}