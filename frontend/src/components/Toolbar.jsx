import {Box, Button, Flex, Image, useDisclosure, SlideFade} from "@chakra-ui/react";
import {useState} from 'react';

import DeleteIcon from './../assets/delete.svg';
import DrawIcon from './../assets/draw.svg';
import brush from './../assets/paint.svg';
import download from './../assets/download.svg';
import activeSelectionDeleteIcon from './../assets/activeSelectionDel.svg'
import {addShape , addText , handleDownload} from "../utils/fabricUtils.js";

import ButtonExample from "c:/workflow/sketchDraw/SketchDraw/frontend/src/components/colorPicker"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from '@chakra-ui/react';

function Toolbar({canvasRef}) {
    const [drawingState, setDrawingState] = useState(true);
    const [sizePaint, setSizePaint] = useState(1);
    const {isOpen, onToggle} = useDisclosure();


    const canvas = canvasRef.current

    function SliderSize() {
        return (
            <Button m={2} p={2} colorScheme="linkedin">
                <Popover>
                    <PopoverTrigger>
                        <Image src={brush} py={4}></Image>
                    </PopoverTrigger>
                    <PopoverContent p="2">
                        <PopoverArrow/>
                        <PopoverBody p="2">
                            <Slider
                                aria-label='slider-ex-3'
                                defaultValue={sizePaint}
                                min={-10}
                                max={12}
                                p="2"
                                onChange={handleSliderChange} // Add this onChange handler
                            >
                                <SliderTrack>
                                    <SliderFilledTrack/>
                                </SliderTrack>
                                <SliderThumb boxSize={6}/>
                            </Slider>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Button>
        )
    }

    const activeSelectionDelete = () => {
        const canvas = canvasRef.current
        if (canvas && canvas._activeObject) {
            const activeSelection = canvas._activeObject;
            console.log(activeSelection._objects);
            for (const object of activeSelection._objects) {
                canvas.remove(object);
            }
            canvas.renderAll();
        }
    }


    // Clear
    const canvasClear = () => {
        if (canvas) {
            canvas.clear();
            canvas.backgroundColor = 'white';
            canvas.renderAll();
        }
    };

    // Bouton on/off pour le dessin
    const drawingModeChange = () => {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        setDrawingState(!drawingState);
    };

    // Fonction pour la taille du pinceau
    const handleSliderChange = (value) => {
        setSizePaint(value);
        if (canvas.isDrawingMode) {
            canvas.freeDrawingBrush.width = value;
        }
    };


    // Telechargement du canva
    const downloadCanva = () => {
        handleDownload(canvas)
    }


    // Ajout d'une zone de texte
    const addTextToC = () => {
        addText(canvas)
    };

    const addSquare = () => {
        addShape("square", canvas)
    }

    const addCircle = () => {
        addShape("circle", canvas)
    }

    const addTriangle = () => {
        addShape("triangle", canvas)
    }



    return (
        <>
            <Button onClick={onToggle} style={{bottom: '0', position: 'fixed'}} colorScheme="blue" m={4}>Toggle
                Toolbar</Button>
            <SlideFade in={isOpen} offsetX='-200px'
                       style={{position: 'fixed', left: 0, height: '50%', zIndex: 'overlay'}}>
                <Flex direction="column" borderRadius={4} position="fixed" rounded='md' shadow='md' p={8}
                      backgroundColor="white">
                    <Box>
                        <Button m={2} p={2} style={{backgroundColor: drawingState ? 'red' : 'green'}}
                                onClick={drawingModeChange}>
                            <Image src={DrawIcon}/>
                        </Button>
                    </Box>
                    <Box>
                        <SliderSize/>
                    </Box>

                    <Box>
                        <ButtonExample canvasRef={canvasRef}/>
                    </Box>

                    <Box>
                        <Button m={2} p={2} colorScheme="linkedin" onClick={addTextToC}>
                            T
                        </Button>
                    </Box>
                    <Box>
                        <Button m={2} p={2} colorScheme="linkedin" onClick={addSquare}>
                            S
                        </Button>
                    </Box>
                    <Box>
                        <Button m={2} p={2} colorScheme="linkedin" onClick={addCircle}>
                            R
                        </Button>
                    </Box>
                    <Box>
                        <Button m={2} p={2} colorScheme="linkedin" onClick={addTriangle}>
                            R
                        </Button>
                    </Box>

                    <Box>
                        <Button m={2} p={2} colorScheme="linkedin" onClick={activeSelectionDelete}>
                            <Image src={activeSelectionDeleteIcon}></Image>
                        </Button>
                    </Box>

                    <Box>
                        <Button m={2} p={2} colorScheme="linkedin" onClick={downloadCanva}>
                            <Image src={download}></Image>
                        </Button>
                    </Box>
                    <Box>
                        <Button m={2} p={2} colorScheme="linkedin" onClick={canvasClear}>
                            <Image src={DeleteIcon}></Image>
                        </Button>

                    </Box>
                </Flex>
            </SlideFade>
        </>
    );
}

export default Toolbar;
