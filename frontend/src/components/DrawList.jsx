import React from 'react';
import { useGetRequest } from "../utils/hooks/useGetRequest.js";
import DrawItem from "./DrawItem.jsx";

const DrawList = () => {
    const { data: canvasList, loadingGet, errorGet } = useGetRequest("http://localhost:3000/canvas");


    // Loading state
    if (loadingGet) {
        return <div>Loading...</div>;
    }

    // Error state
    if (errorGet) {
        return <div>Error: {errorGet.message}</div>;
    }

    // Render list if data is available
    return (
        <div>
            {canvasList && canvasList.map(draw => (
                <DrawItem draw={draw} key={draw.id} />
            ))}
        </div>
    );
};

export default DrawList;
