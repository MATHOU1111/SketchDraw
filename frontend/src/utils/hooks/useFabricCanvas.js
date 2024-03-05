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
    const { loadingPut, error, success, fetchData } = usePutRequest(`http://localhost:3000/canvas/${idCanvas}`);

    // Référence du canvas, important pour l'utilisation de la toolbar
    const canvasRef = useRef(null);

    const [pageNumber, setPageNumber] = useState(0);
    const [selectedObject, setSelectedObject] = useState(null);

    // Affichage du canvas dynamiquement
    useEffect(() => {
        if (dataLoaded && data && canvasRef.current !== undefined) {
            const index = data.pages.findIndex(page => page.id === idPage);
            if (index !== -1) {
                setPageNumber(index);
            }
        }
    }, [dataLoaded, data, idPage]);

    useEffect(() => {
        if (canvasRef.current !== undefined && data && data.pages && data.pages[pageNumber]) {
            const canvas = new fabric.Canvas('my-unique-canvas', {
                backgroundColor: 'white', objects: data.pages[pageNumber], renderOnAddRemove: false, isDrawingMode : true
            });

            canvasRef.current = canvas;
            // Définition de tous les types d'objets qui peuvent entrer
            const fabricConstructors = {
                'textbox': fabric.Textbox,
                'rect': fabric.Rect,
                'circle': fabric.Circle,
                'triangle': fabric.Triangle,
                'path': fabric.Path,
            };

            // On insère les éléments de la page dans le canvas
            if (data.pages[pageNumber].objects && Array.isArray(data.pages[pageNumber].objects)) {
                data.pages[pageNumber].objects.forEach(object => {
                    if (object.type in fabricConstructors) {
                        let fabricObject;
                        // Affichage des dessins
                        if (object.type === 'path') {
                            fabricObject = new fabric.Path(object.path, object);
                            // Affichage de la textbox
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
                });
            }

            const sendData = (e) => {
                let obj = e.target;
                console.log('Objet modifié: ', obj);
                console.log(canvas._objects);
                data.pages[pageNumber].objects = canvas._objects
                fetchData(data)
                    .then(() => {
                        console.log("La requête a réussi !", data);
                    })
                    .catch(error => {
                        console.error("Une erreur s'est produite lors de la requête :", error);
                    });
            }


            if (canvas) {
                // Events sur le canvas
                canvas.on('object:modified', function (e) {
                    sendData(e);
                });

                canvas.on('object:added', function (e) {
                    sendData(e);
                });

                canvas.on('object:removed', function (e) {
                    sendData(e);
                });

                canvas.on('selection:updated', function (e) {
                    console.log("lol")
                    // console.log(e.selected[0])
                    // setSelectedObject(e.selected[0]);
                });

                canvas.on('selection:created', function (e) {
                    console.log("lol")
                    // console.log(e.selected[0])
                    // setSelectedObject(e.selected[0]);
                });

                canvas.on('selection:cleared', () => {
                    setSelectedObject(null);
                });


                canvas.on('mouse:wheel', function (opt) {
                    // console.log(opt)
                    var delta = opt.e.deltaY;
                    var zoom = canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;
                    canvas.setZoom(zoom);
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                });


                canvas.renderAll();
                canvasRef.current = canvas;
            }

            return () => {
                canvas.dispose(); // Nettoie et supprime l'instance du canvas
            };
        }
    }, [dataLoaded, data, pageNumber]);

    return { canvasRef, pageNumber, loadingPut, success, selectedObject };
}

export default useFabricCanvas;
