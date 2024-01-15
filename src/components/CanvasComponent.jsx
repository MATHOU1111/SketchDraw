import { useEffect, useRef  } from 'react';
import { fabric } from 'fabric';
import { Button} from "@chakra-ui/react";


function CanvasComponent() {

    const canvasRef = useRef(null);

    const canvasClear = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            console.log(canvas.clear())
            canvas.isDrawingMode = false;
        }
    }



        useEffect(() => {
            const canvas = new fabric.Canvas('my-fabric-canvas', {
                backgroundColor: 'white',
                isDrawingMode: true
            });

            canvasRef.current = canvas;
            canvas.renderAll();
        }, []);


        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>

                <canvas
                    id="my-fabric-canvas"
                    width="900"
                    height="600">
                </canvas>
                <div>
                    <Button onClick={canvasClear}> Clear </Button>
                </div>
            </div>
        )

}

export default CanvasComponent;