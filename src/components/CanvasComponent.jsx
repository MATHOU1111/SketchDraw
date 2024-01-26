import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { Box, Center } from "@chakra-ui/react";
import Toolbar from './Toolbar';

function useFabricCanvas(id) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(id, {
            backgroundColor: 'white',
            isDrawingMode: true,
        });

        canvasRef.current = canvas;

        return () => {
            canvas.dispose();
        };
    }, [id]);

    return canvasRef;
}

function CanvasComponent() {
    const canvasRef = useFabricCanvas('my-fabric-canvas');

    return (
        <Center h="80vh">
            <Box direction="column" alignItems="center" border="2px solid" borderColor="grey">
                <canvas id="my-fabric-canvas" width="800"  height="550"></canvas>
            </Box>
            <Toolbar canvasRef={canvasRef} />
        </Center>
    );
}

export default CanvasComponent;
