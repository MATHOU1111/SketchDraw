import React, {useEffect, useState} from 'react';
import Toolbar from './Toolbar';
import {useParams, useNavigate} from 'react-router-dom';
import {useGetRequest} from "../utils/hooks/useGetRequest.js";
import usePutRequest from "../utils/hooks/usePutRequest.js";
import canvasSkeleton from "../utils/data/canvas.js";
import {Button, Box, Center, Spinner, Input, Flex} from '@chakra-ui/react'
import useFabricCanvas from "../utils/hooks/useFabricCanvas.js";
import PagesList from "./PagesList.jsx";

const CanvasComponent = () => {
    // differentes importations de hooks etc
    const navigate = useNavigate();
    const {idCanvas} = useParams();
    const {data, loading} = useGetRequest(`http://localhost:3000/canvas/${idCanvas}`);
    const {fetchData} = usePutRequest(`http://localhost:3000/canvas/${idCanvas}`);

    // page du canva
    const [pages, setPages] = useState([]);

    const [drawName, setDrawName] = useState("");
    const [pageName, setPageName] = useState("");

    const [dataLoaded, setDataLoaded] = useState(false);

    const canvasRef = useFabricCanvas(dataLoaded, data);

    // on récupère les données du canva !
    useEffect(() => {
        if (data !== null) {
            setDataLoaded(true);
            setDrawName(data.name);
            setPages(data.pages);
            setPageName(data.pages[canvasRef.pageNumber].name);
        }
    }, [data]);

    const drawerNameChange = (event) => {
        if (event.target.value !== data.name) {
            data.name = event.target.value;
            setDrawName(data.name);
            fetchData(data)
                .then(() => {
                    console.log("Le nom a bien été changé.");
                })
                .catch(error => {
                    console.error("Une erreur s'est produite lors de la requête :", error);
                });
        }
    }

    const pageNameChange = (event) => {
        if (event.target.value !== data.pages[canvasRef.pageNumber].name) {
            const newPageName = event.target.value;
            data.pages[canvasRef.pageNumber].name = newPageName;
            setPageName(newPageName); // Met à jour pageName
            // Effectuer des actions une fois que pageName a été mis à jour
            fetchData(data)
                .then(() => {
                    console.log("Le nom a bien été changé.");
                })
                .catch(error => {
                    console.error("Une erreur s'est produite lors de la requête :", error);
                });
        }
    }


    const addPage = () => {
        data.pages.push(canvasSkeleton.pageSkeleton);
        fetchData(data)
            .then(() => {
                console.log("La page a été ajoutée.");
                setPages(data.pages);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la requête :", error);
            });
        let temp = data.pages.length;
        navigate(`?page=${data.pages[temp - 1].id}`);
    };

    const switchPage = (page) => {
        navigate(`?page=${page.id}`);
    };

    return (
        <>
            {loading ? (
                <Center h="80vh">
                    <Spinner size="xl"/>
                </Center>
            ) : (
                <>
                    <Box w={"40%"}>
                        <Box p={"4"}>
                            <Input placeholder="Nom de votre dessin" defaultValue={drawName} onBlur={drawerNameChange}/>
                        </Box>
                        {/*                          <Box p={"4"}>
                            <Input placeholder="Nom de la page" value={pageName}
                                   onChange={(event) => setPageName(event.target.value)} onBlur={pageNameChange}/>
                        </Box> */}
                    </Box>
                    <Flex>
                        <Box overflowY="scroll" h="565px">
                            <Button m={4} onClick={addPage}>Ajouter une page</Button>
                            <PagesList switchPage={switchPage} data={pages}/>
                        </Box>
                        <Center h="60vh">
                            <Box direction="column" alignItems="center" border="2px solid" borderColor="grey">
                                <canvas id="my-unique-canvas" width="1000" height="550"></canvas>
                            </Box>
                            <Toolbar canvasRef={canvasRef.canvasRef}/>
                        </Center>
                    </Flex>
                </>
            )}
        </>
    );
};

export default CanvasComponent;