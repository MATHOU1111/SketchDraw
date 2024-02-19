import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './../components/NavBar.jsx';
import { useGetRequest } from "../utils/hooks/useGetRequest";
import { usePostCanva } from "../utils/hooks/useNewCanva.js";
import { Button } from "@chakra-ui/react";
import canvasSkeleton from "../utils/data/canvas.js";

function Home() {

    const { data: canvasList, loadingGet, errorGet } = useGetRequest("http://localhost:3000/canvas");
    const { dataPost, loadingPost, errorPost, postData } = usePostCanva("http://localhost:3000/canvas");
    const navigate = useNavigate();

    const newCanvas = async () => {
        try {
            const response = await postData(canvasSkeleton);
            if(response.id){
                navigate(`editor/${response.id}`);
            }
        } catch (error) {
            console.error('Erreur lors de la création du canevas :', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Button onClick={newCanvas}>Créer un nouveau dessin</Button>
        </div>
    );
}

export default Home;
