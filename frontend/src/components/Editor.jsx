import React, {useRef, useEffect, useState} from 'react';
import {fabric} from 'fabric';
import {Box, Center, Spinner} from "@chakra-ui/react";
import Toolbar from './Toolbar';
import {useParams} from 'react-router-dom';
import {useGetRequest} from "../utils/hooks/useGetRequest.js";

function useFabricCanvas(dataLoaded, data) {
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


            // In the case where there are multiples objects
            if (data && data.pages && data.pages[pageNumber].objects && Array.isArray(data.pages[pageNumber].objects)) {
                for (let object of data.pages[pageNumber].objects) {
                    console.log(object)
                    if (object.type in fabricConstructors) {
                        const objectConstructor = fabricConstructors[object.type];
                        canvas.add(new objectConstructor(object.type, object))
                    } else {
                        console.error('Type d\'objet non pris en charge :', object.type);
                    }
                }
            }
            canvas.renderAll();
        }
    }, [dataLoaded, data, pageNumber]);

    return canvasRef;
}

function CanvasComponent() {
    const {idCanvas} = useParams();
    const {data, loading} = useGetRequest(`http://localhost:3000/canvas/${idCanvas}`);

    const [dataLoaded, setDataLoaded] = useState(false);

    const canvasRef = useFabricCanvas(dataLoaded, data);

    useEffect(() => {
        if (data !== null) {
            setDataLoaded(true);
        }
    }, [data]);

    return (<>
        {loading ? (<Center h="80vh">
            <Spinner size="xl"/>
        </Center>) : (<Center h="80vh">
            <Box direction="column" alignItems="center" border="2px solid" borderColor="grey">
                <canvas ref={canvasRef} width="1000" height="550"></canvas>
            </Box>
            <Toolbar canvasRef={canvasRef}/>
        </Center>)}
    </>);
}

export default CanvasComponent;