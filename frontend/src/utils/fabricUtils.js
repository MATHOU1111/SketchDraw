
import { fabric } from 'fabric';



const addShape = (shapeType, canvas) => {
    if (!canvas) return;

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
    canvas.renderAll(); // Rafraîchit le canvas pour afficher la nouvelle forme
};

const addText = (canvas) => {
    if (canvas) {
        const text = new fabric.Textbox('Votre texte ici', {
            left: 100, // Position horizontale
            top: 100,  // Position verticale
            width: 200, // Largeur de la zone de texte
            fontSize: 20, // Taille de la police
            fill: 'black' // Couleur du texte
        });
        canvas.add(text);
        canvas.renderAll();
    }
};

const handleDownload = (canvas) => {
    let canvasDataUrl = canvas.toDataURL({format: 'png'});

    // Créez un lien de téléchargement
    const link = document.createElement('a');
    link.href = canvasDataUrl;
    link.download = 'mon_canvas.png';
    link.click();
}


export { addShape , addText , handleDownload};