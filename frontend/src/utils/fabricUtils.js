import { fabric } from 'fabric';

const addShape = (shapeType, canvas) => {
    if (!canvas) return;

    console.log(canvas)
    let shape;
    switch (shapeType) {
        case 'square':
            shape = new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'blue',
                width: 100,
                height: 100
            });
            break;
        case 'triangle':
            shape = new fabric.Triangle({
                left: 150,
                top: 150,
                fill: 'blue',
                width: 100,
                height: 100
            });
            break;
        case 'circle':
            shape = new fabric.Circle({
                left: 200,
                top: 200,
                fill: 'blue',
                radius: 50
            });
            break;
        default:
            console.log("Type de forme non reconnu");
            return; // Sortie anticipée si le type de forme n'est pas reconnu
    }

    canvas.add(shape); // Ajoute la forme au canvas
};

const handleDownload = (canvas) => {
    let canvasDataUrl = canvas.toDataURL({format: 'png'});

    // Créez un lien de téléchargement
    const link = document.createElement('a');
    link.href = canvasDataUrl;
    link.download = 'mon_canvas.png';
    link.click();
}

const activeSelectionDelete = (canvas) => {
    if (canvas && canvas._activeObject) {
        const activeSelection = canvas._activeObject;
        if(activeSelection._objects){
            for (const object of activeSelection._objects) {
                canvas.remove(object);
            }
        }else{
            canvas.remove(activeSelection)
        }


        canvas.renderAll();
    }
}


export { addShape , addText , handleDownload, activeSelectionDelete};
