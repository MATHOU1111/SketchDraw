import {useEffect, useState} from 'react';
import Toolbar from './Toolbar';
import {useParams, useNavigate} from 'react-router-dom';
import {useGetRequest} from "../utils/hooks/useGetRequest.js";
import usePutRequest from "../utils/hooks/usePutRequest.js";
import canvasSkeleton from "../utils/data/canvas.js";
import {Button, Box, Center, Spinner , Input, Flex, Text, Image} from '@chakra-ui/react'
import useFabricCanvas from "../utils/hooks/useFabricCanvas.js";
import PagesList from "./PagesList.jsx";
import addButton from './../assets/add.svg'
import { CheckIcon } from '@chakra-ui/icons'



const Drawer = () => {
    // differentes importations de hooks etc
    const navigate = useNavigate();
    const {idCanvas} = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const {data, loading} = useGetRequest(`http://localhost:3000/canvas/${idCanvas}`);
    const canvasRef = useFabricCanvas(dataLoaded, data);

    const {loadingPut, success, fetchData} = usePutRequest(`http://localhost:3000/canvas/${idCanvas}`);

    // Les différents states
    const [pages, setPages] = useState([]);

    const [drawName, setDrawName] = useState("");
    const [pageName, setPageName] = useState("");

    // on récupère les données du canva !
    useEffect(() => {
        if (data && canvasRef.canvasReady) {
            setDataLoaded(true);
            setDrawName(data.name);
            setPages(data.pages);
            setPageName(data.pages[canvasRef.pageNumber].name);
        }
    }, [canvasRef.pageNumber, data]);


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
            setPageName(newPageName);
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


    return (
        <>
            {loading ? (
                <Center h="80vh">
                    <Spinner size="xl"/>
                </Center>
            ) : (
                <>
                    <Flex name="drawer-name">
                        <Box w={"20%"} p={"4"}>
                            <Input placeholder="Nom de votre dessin" defaultValue={drawName} onBlur={drawerNameChange}/>
                        </Box>
                        {(loadingPut || canvasRef.loadingPut) ? (
                            <>
                                    <Text mt={6}>Enregistrement des changements ...</Text>
                            </>
                        ) : (
                            (success || canvasRef.success) ? (
                                <Text mt={6}>Changements sauvegardés <CheckIcon m={2} /></Text>
                            ) : (
                                <Text m={6}></Text>
                            )
                        )}
                    </Flex>
                    <Flex align>
                        <Box name="Barre d'outil" p={2} mb={4} w="100%" rounded="md" shadow="lg">
                            <Toolbar canvasRef={canvasRef.canvasRef} selectedObject={canvasRef.selectedObject}/>
                        </Box>
                    </Flex>
                    <Flex name="editor">
                        <Box name="pages-section" overflowY="scroll" h="570px">
                            <Box p={"4"}>
                                <Text> Nom de la page : </Text>
                                <Input placeholder="Nom de la page"  value={pageName}
                                       onChange={(event) => setPageName(event.target.value)} onBlur={pageNameChange}/>
                            </Box>
                            <Button ml={4} pr={10} onClick={addPage}><Image mr={2} src={addButton} />Ajouter une page</Button>
                            <PagesList data={pages}/>
                        </Box>
                        <Center name="canvas-container" mb={32}>
                            <Box direction="column" alignItems="center" p={2} border="2px solid"
                                 backgroundColor="#ededed" borderColor="grey">
                                <canvas id="my-unique-canvas" border="1px" width="1200" height="550"></canvas>
                            </Box>
                        </Center>
                    </Flex>
                </>
            )}
        </>
    );
}


export default Drawer;