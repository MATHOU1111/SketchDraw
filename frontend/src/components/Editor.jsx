import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { Box, Center, Spinner } from "@chakra-ui/react";
import Toolbar from './Toolbar';
import { useParams } from 'react-router-dom';
import { useGetRequest } from "../utils/hooks/useGetRequest.js";

function useFabricCanvas(dataLoaded, data) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (dataLoaded && data) {
            const canvas = new fabric.Canvas(canvasRef.current, {
                backgroundColor: 'white',
                isDrawingMode: false,
                objects: data.objects
            });
            console.log(canvas)
        }
    }, [dataLoaded]);

    return canvasRef;
}

function CanvasComponent() {
    const { idCanvas } = useParams();
    const { data, loading } = useGetRequest(`http://localhost:3000/canvas/${idCanvas}`);

    const [dataLoaded, setDataLoaded] = useState(false);

    const canvasRef = useFabricCanvas(dataLoaded, data);

    useEffect(() => {
        if (data !== null) {
            console.log(data.objects);
            setDataLoaded(true);
        }
    }, [data]);

    return (
        <>
            {loading ? (
                <Center h="80vh">
                    <Spinner size="xl" />
                </Center>
            ) : (
                <Center h="80vh">
                    <Box direction="column" alignItems="center" border="2px solid" borderColor="grey">
                        <canvas ref={canvasRef} width="1000" height="550"></canvas>
                    </Box>
                    <Toolbar canvasRef={canvasRef} />
                </Center>
            )}
        </>
    );
}

export default CanvasComponent;
