import { useLocation, useParams } from "react-router-dom";
import usePutRequest from "./usePutRequest.js";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

function useFabricCanvas(dataLoaded, data) {
    // Récupération des Ids de l'URL
    const { idCanvas } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idPage = searchParams.get('page');

    // hook
    const { loading, error, success, fetchData } = usePutRequest(`http://localhost:3000/canvas/${idCanvas}`);

    // Référence du canvas, important pour l'utilisation de la toolbar
    let canvasRef = useRef(null);
    const [pageNumber, setPageNumber] = useState(0);



    // Affichage du canvas dynamiquement
    useEffect(() => {
        if (dataLoaded && data && canvasRef.current !== undefined) {

            for (let i = 0; i < data.pages.length; i++) {
                if (data.pages[i].id === idPage) {
                    console.log(data.pages[i].id);
                    setPageNumber(i);
                    console.log(i);
                }
            }

            let objects = data.pages[pageNumber].objects;
            console.log(objects);
            const canvas = new fabric.Canvas('my-unique-canvas', {
                backgroundColor: 'white', isDrawingMode: false, objects: objects
            });



            // Définition de tous les types d'objets qui peuvent entrer
            const fabricConstructors = {
                'textbox': fabric.Textbox,
                'rect': fabric.Rect,
                'circle': fabric.Circle,
                'triangle': fabric.Triangle,
                'path': fabric.Path,
            };

            // On insère les éléments de la page dans le canvas
            if (data && data.pages && data.pages[pageNumber].objects && Array.isArray(data.pages[pageNumber].objects)) {
                for (let object of data.pages[pageNumber].objects) {
                    console.log(object);
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
            const sendData = (e) => {
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

            canvas.on('object:modified', function (e) {
                sendData(e);
            });

            canvas.on('object:added', function (e) {
                sendData(e);
            });

            canvas.on('object:deleted', function (e) {
                sendData(e);
            });

            canvasRef.current = canvas;
            return () => {
                canvas.dispose(); // Nettoie et supprime l'instance du canvas
            };
        }
    }, [dataLoaded, data, pageNumber, idPage]);

    return { canvasRef, pageNumber };
}

export default useFabricCanvas;
