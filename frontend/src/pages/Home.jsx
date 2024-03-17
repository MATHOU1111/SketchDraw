import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './../components/NavBar.jsx';
import { usePostCanva } from "../utils/hooks/useNewCanva.js";
import { Button } from "@chakra-ui/react";
import canvasSkeleton from "../utils/data/canvas.js";
import DrawList from "../components/DrawList.jsx";

function Home() {

    const { dataPost, loadingPost, errorPost, postData } = usePostCanva("http://localhost:3000/canvas");
    const navigate = useNavigate();
    const [listType , setListType] = useState("grid");


    const newCanvas = async () => {
        try {
            const response = await postData(canvasSkeleton.canvasSkeleton);
            if(response.id){
                navigate(`editor/${response.id}/?page=${response.pages[0].id}`);
            }
        } catch (error) {
            console.error('Erreur lors de la création du canevas :', error);
        }
    };

    const listModeSwitch = async () =>{
        if(listType === "grid"){
            setListType("small");
            console.log(listType)
        }
        else{
            setListType("grid");
            console.log(listType)
        }
    }

    return (
        <div>
            <Navbar />
            <Button m={4} onClick={newCanvas}>Nouveau</Button>
            <Button m={4} onClick={listModeSwitch} >List</Button>
            <DrawList />
        </div>
    );
}

export default Home;
