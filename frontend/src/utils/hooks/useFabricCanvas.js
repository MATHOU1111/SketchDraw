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
    const [canvasReady, setCanvasReady] = useState(false);




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
                backgroundColor: 'white', objects: data.pages[pageNumber], renderOnAddRemove: false, isDrawingMode: false
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
                    console.log(e.selected[0])
                    setSelectedObject(e.selected[0]);
                });

                canvas.on('selection:created', function (e) {
                    console.log("lol")
                    console.log(e.selected[0])
                    setSelectedObject(e.selected[0]);
                });

                canvas.on('selection:cleared', () => {
                    setSelectedObject(null);
                });


                // event pour le zoom
                canvas.on('mouse:wheel', function (opt) {
                    var delta = opt.e.deltaY;
                    var zoom = canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;

                    // Coordonnées de la souris sur le canvas
                    var pointer = canvas.getPointer(opt.e);
                    var pointerX = pointer.x;
                    var pointerY = pointer.y;

                    // Ajustements de la position de zoom
                    var zoomPoint = new fabric.Point(pointerX, pointerY);
                    canvas.zoomToPoint(zoomPoint, zoom);
                    canvas.requestRenderAll()
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                });


                // Event pour déplacer le canvas avec alt 
                let isDragging = false;
                let lastPosX = 0;
                let lastPosY = 0;

                canvas.on('mouse:down', function (opt) {
                    var evt = opt.e;
                    if (evt.altKey === true) {
                        isDragging = true;
                        canvas.selection = false; 
                        lastPosX = evt.clientX;
                        lastPosY = evt.clientY;
                    }
                });

                canvas.on('mouse:move', function (opt) {
                    if (isDragging) {
                        var e = opt.e;
                        var vpt = canvas.viewportTransform;
                        vpt[4] += e.clientX - lastPosX;
                        vpt[5] += e.clientY - lastPosY;
                        canvas.requestRenderAll();
                        lastPosX = e.clientX;
                        lastPosY = e.clientY;
                    }
                });

                canvas.on('mouse:up', function (opt) {
                    // Réactiver la sélection du canvas après le déplacement
                    canvas.selection = true;
                    isDragging = false;
                });

                setCanvasReady(true);
                canvas.renderAll();
                canvasRef.current = canvas;
            }

            return () => {
                canvas.dispose(); // Nettoie et supprime l'instance du canvas
            };
        }
    }, [dataLoaded, data, pageNumber]);

    return { canvasRef, pageNumber, loadingPut, success, selectedObject, canvasReady };
}

export default useFabricCanvas;
