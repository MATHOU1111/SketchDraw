import React, {useRef, useEffect, useState} from 'react';
import {fabric} from 'fabric';
import Toolbar from './Toolbar';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import {useGetRequest} from "../utils/hooks/useGetRequest.js";
import usePutRequest from "../utils/hooks/usePutRequest.js";
import canvasSkeleton from "../utils/data/canvas.js";
import {Menu, MenuButton, MenuList, MenuItem, Button, Box, Center, Spinner, Input, Divider} from '@chakra-ui/react'

function useFabricCanvas(dataLoaded, data) {
    // Récupération des Ids de l'URL
    const {idCanvas} = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idPage = searchParams.get('page');

    // hook
    const {loading, error, success, fetchData} = usePutRequest(`http://localhost:3000/canvas/${idCanvas}`);

    // reference du canvas, important pour l'utilisation de la toolbar
    let canvasRef = useRef(null);

    const [pageNumber, setPageNumber] = useState(0)


    // Affichage du canvas dynamiquement

    useEffect(() => {
            if (dataLoaded && data && canvasRef.current !== undefined) {
                for(let i = 0 ; i < data.pages.length; i++){
                    if(data.pages[i].id === idPage){
                        console.log(data.pages[i].id)
                        setPageNumber(i);
                        console.log(i);
                    }
                }

                let objects = data.pages[pageNumber].objects
                console.log(objects)
                const canvas = new fabric.Canvas(canvasRef.current, {
                    backgroundColor: 'white', isDrawingMode: false, objects: objects
                })

                canvasRef = canvas;

                // Definition de tous les types d'objets qui peuvent rentrer
                const fabricConstructors = {
                    'textbox': fabric.Textbox,
                    'square': fabric.Rect,
                    'circle': fabric.Circle,
                    'triangle': fabric.Triangle,
                    'path': fabric.Path,
                };

                function sendData(e) {
                    let obj = e.target;
                    console.log('Objet modifié: ', obj);
                    console.log(canvas._objects);
                    data.pages[pageNumber].objects = canvas._objects;
                    fetchData(data)
                        .then(() => {
                            console.log("La requête a réussi !");
                        })
                        .catch(error => {
                            console.error("Une erreur s'est produite lors de la requête :", error);
                        });
                }


                canvas.clear();
                canvas.backgroundColor = 'white';
                canvas.renderAll();


                // In the case where there are multiples objects
                if (data && data.pages && data.pages[pageNumber].objects && Array.isArray(data.pages[pageNumber].objects)) {
                    for (let object of data.pages[pageNumber].objects) {
                        console.log(object)
                        if (object.type in fabricConstructors) {
                            let fabricObject;
                            if (object.type === 'path') {
                                fabricObject = new fabric.Path(object.path, object);
                            } else if (object.type === 'textbox') {
                                fabricObject = new fabric.Textbox(object.text, object);
                            } else {
                                // Pour les autres types on crée directement l'objet comme ça
                                const objectConstructor = fabricConstructors[object.type];
                                fabricObject = new objectConstructor(object);
                            }
                            canvas.add(fabricObject);
                        } else {
                            console.error('Type d\'objet non pris en charge :', object.type);
                        }
                    }
                }
                canvas.renderAll();
                canvas.on('object:modified', function (e) {
                    sendData(e);
                });

                canvas.on('object:added', function (e) {
                    sendData(e);
                });

                canvas.on('object:deleted', function (e) {
                    sendData(e);
                });
            }

        }

        , [dataLoaded, data, pageNumber, idPage]);


    return canvasRef;
}

const CanvasComponent = () => {
    const navigate = useNavigate();
    const { idCanvas } = useParams();
    const { data, loading } = useGetRequest(`http://localhost:3000/canvas/${idCanvas}`);
    const { fetchData } = usePutRequest(`http://localhost:3000/canvas/${idCanvas}`);

    const [pages, setPages] = useState([]);
    const [drawName, setDrawName] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);

    const canvasRef = useFabricCanvas(dataLoaded, data);

    useEffect(() => {
        if (data !== null) {
            setDataLoaded(true);
            setDrawName(data.name);
            setPages(data.pages);
        }
    }, [data]);

    const drawerNameChange = (event) => {
        data.name = event.target.value;
        setDrawName(data.name);
        fetchData(data)
            .then(() => {
                console.log("Le nom a bien été changé.");
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la requête :", error);
            });
    };

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
    };

    const switchPage = (page) => {
        navigate(`?page=${page.id}`);
    };

    return (
        <>
            {loading ? (
                <Center h="80vh">
                    <Spinner size="xl" />
                </Center>
            ) : (
                <>
                    <Box p={"4"}>
                        <Input placeholder="Nom de votre dessin" defaultValue={drawName} onBlur={drawerNameChange} />
                    </Box>
                    <Box p={"4"}>
                        <Menu>
                            <MenuButton as={Button}>Actions</MenuButton>
                            <MenuList>
                                <MenuItem onClick={addPage}>Ajouter une page</MenuItem>
                                <Divider />
                                {pages.map((page, index) => (
                                    <MenuItem onClick={() => switchPage(page)} key={page.id}>
                                        {index + 1} - {page.name}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Box>
                    <Center h="80vh">
                        <Box direction="column" alignItems="center" border="2px solid" borderColor="grey">
                            <canvas ref={canvasRef} width="1000" height="550"></canvas>
                        </Box>
                        <Toolbar canvasRef={canvasRef} />
                    </Center>
                </>
            )}
        </>
    );
};

export default CanvasComponent;