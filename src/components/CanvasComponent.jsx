import { useEffect } from 'react';
import { fabric } from 'fabric';



function CanvasComponent() {



    useEffect(() => {
        const canvas = new fabric.Canvas('my-fabric-canvas', {
            backgroundColor: 'white',
            isDrawingMode: true
        });
        canvas.renderAll();
    }, []);



    return (
        <div>
            <canvas
                id="my-fabric-canvas"
                width="800"
                height="600"

            ></canvas>
        </div>
    );
}

export default CanvasComponent;