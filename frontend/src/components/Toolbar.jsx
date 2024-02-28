import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    useDisclosure,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react";
import {useState} from 'react';
import DeleteIcon from './../assets/delete.svg';
import DrawIcon from './../assets/draw.svg';
import brush from './../assets/paint.svg';
import activeSelectionDeleteIcon from './../assets/activeSelectionDel.svg'
import {addShape, addText, handleDownload, activeSelectionDelete} from "../utils/fabricUtils.js";
import ButtonExample from "./../components/ColorPicker.jsx"

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
    const [drawingState, setDrawingState] = useState(false);
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


    // A REFAIRE
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

    const deleteSelection = () => {
        activeSelectionDelete(canvas);
    }


    return (
        <>
            <Box name="Barre d'outil" w={"90%"} m={2} rounded='md' shadow='md'>
                <Flex name="menu-top" borderRadius={4} w={"60%"}>
                    <Menu isLazy>
                        <MenuButton name="file-menu" p={2} _hover={{bg: "#E7E7E7", color: "black"}} color="white">
                            Fichier</MenuButton>
                        <MenuList>
                            <MenuItem>New Window</MenuItem>
                            <MenuItem>Open Closed Tab</MenuItem>
                            <MenuItem>Open File</MenuItem>
                            <MenuItem onClick={downloadCanva}><Text>Download</Text></MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu isLazy>
                        <Box name="insert-menu">
                            <MenuButton p={2} _hover={{bg: "#E7E7E7", color: "black"}} color="white">Insérer</MenuButton>
                            <MenuList>
                                <MenuItem onClick={addSquare}><Text>Square</Text></MenuItem>
                                <MenuItem onClick={addCircle}><Text colorScheme="linkedin">Circle</Text>
                                </MenuItem>
                                <MenuItem onClick={addTriangle}><Text colorScheme="linkedin">Triangle</Text>
                                </MenuItem>
                                <MenuItem onClick={addTextToC}><Text colorScheme="linkedin">Text area</Text>
                                </MenuItem>
                            </MenuList>
                        </Box>
                    </Menu>
                </Flex>
                <Divider name="divider" />
                <Flex name="menu-bottom">
                    <Box name="drawing-mode">
                        <Button m={2} p={2} style={{backgroundColor: drawingState ? 'red' : 'green'}}
                                onClick={drawingModeChange}>
                            <Image src={DrawIcon}/>
                        </Button>
                    </Box>
                    <Box name="pen-size">
                        <SliderSize />
                    </Box>
                    <Box name="color">
                        <ButtonExample canvasRef={canvasRef}/>
                    </Box>
                    <Box name="delete-active-selection">
                        <Button m={2} p={2} colorScheme="linkedin" onClick={deleteSelection}>
                            <Image src={activeSelectionDeleteIcon}></Image>
                        </Button>
                    </Box>
                    <Box name="clear-canvas">
                        <Button m={2} p={2} colorScheme="linkedin" onClick={canvasClear}>
                            <Image src={DeleteIcon}></Image>
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </>
    );
}

export default Toolbar;