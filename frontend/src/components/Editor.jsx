import React, {useRef, useEffect, useState} from 'react';
import {fabric} from 'fabric';
import {Box, Center, Spinner} from "@chakra-ui/react";
import Toolbar from './Toolbar';
import {useParams} from 'react-router-dom';
import {useGetRequest} from "../utils/hooks/useGetRequest.js";
import usePutRequest from "../utils/hooks/usePutRequest.js";
import {Input} from "@chakra-ui/react";


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function useFabricCanvas(dataLoaded, data) {
    const {idCanvas} = useParams();
    const {loading, error, success, fetchData} = usePutRequest(`http://localhost:3000/canvas/${idCanvas}`);

    const canvasRef = useRef(null);
    const [pageNumber, setPageNumber] = useState(0)


    useEffect(() => {
            if (dataLoaded && data) {
                const canvas = new fabric.Canvas(canvasRef.current, {
                    backgroundColor: 'white', isDrawingMode: false, objects: data.pages[pageNumber].objects
                })
                canvasRef.current = canvas;
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
                                // Pour d'autres types, créez l'objet avec les propriétés directement
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

        , [dataLoaded, data, pageNumber]);


    return canvasRef;
}

function CanvasComponent() {
    const {idCanvas} = useParams();
    const {data, loading} = useGetRequest(`http://localhost:3000/canvas/${idCanvas}`);
    const {fetchData} = usePutRequest(`http://localhost:3000/canvas/${idCanvas}`);

    const [dataLoaded, setDataLoaded] = useState(false);
    const canvasRef = useFabricCanvas(dataLoaded, data);

    useEffect(() => {
        if (data !== null) {
            setDataLoaded(true);
        }
    }, [data]);

    const drawerNameChange = (event) => {
        data.name = event.target.value
        fetchData(data)
            .then(() => {
                console.log("La requête a réussi !");
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la requête :", error);
            });
    };

    return (
        <>
            {loading ? (
                <Center h="80vh">
                    <Spinner size="xl"/>
                </Center>
            ) : (
                <>
                    <Box p={"4"}>
                        <Input placeholder="Nom de votre dessin" onChange={drawerNameChange}/>
                    </Box>
                    <Center h="80vh">
                        <Box direction="column" alignItems="center" border="2px solid" borderColor="grey">
                            <canvas ref={canvasRef} width="1000" height="550"></canvas>
                        </Box>
                        <Toolbar canvasRef={canvasRef}/>
                    </Center>
                </>
            )}
        </>
    );
}

export default CanvasComponent;