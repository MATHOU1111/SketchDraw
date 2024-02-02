import { Box, Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from 'react';

import DeleteIcon from './../assets/delete.svg';
import DrawIcon from './../assets/draw.svg';
import brush from './../assets/paint.svg';
import ButtonExample from "c:/workflow/SketchDraw/src/components/colorPicker"

import {Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, Slider, SliderTrack, SliderFilledTrack, SliderThumb} from '@chakra-ui/react';

function Toolbar({ canvasRef }) {
  const [drawingState, setDrawingState] = useState(true);
  const [sizePaint, setSizePaint] = useState(1);
  const [color, setColor] = useState('#000'); // État pour gérer la couleur sélectionnée
  const { isOpen, onToggle } = useDisclosure(); // Pour gérer l'affichage du sélecteur de couleur





  
  // Fonction pour changer la couleur
  const handleChangeComplete = (color) => {
    setColor(color.hex);
    const canvas = canvasRef.current;
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush.color = color.hex;
    }
  };




function SliderSize(){
  return (
    <Button m={2} colorScheme="teal">
    <Popover>
        <PopoverTrigger>
            <Image src={brush} py={4}></Image>
        </PopoverTrigger>
            <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
                <Slider
                    aria-label='slider-ex-3'
                    defaultValue={sizePaint}
                    min={-10}
                    max={12}
                    onChange={handleSliderChange} // Add this onChange handler
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </PopoverBody>
            </PopoverContent>
    </Popover>
</Button>
  )
}


  // Clear
  const canvasClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = 'white';
      canvas.renderAll();
    }
  };

  // Bouton on/off pour le dessin
  const drawingModeChange = () => {
    const canvas = canvasRef.current;
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setDrawingState(!drawingState);
  };

  // Fonction pour la taille du pinceau 
  const handleSliderChange = (value) => {
    setSizePaint(value); 
    const canvas = canvasRef.current;
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush.width = value;
    }
  };



  return (
    <Flex direction="row" borderRadius={4} border="2px" borderColor="grey" position="fixed" bottom="0" p={2} px={60} backgroundColor="white">
        <Box>
          <SliderSize />
        </Box>
        <Box>
            <Button m={2} colorScheme="teal" onClick={drawingModeChange} >
                <Image src={DrawIcon}></Image>
            </Button>
            <ButtonExample color={color} onChangeComplete={handleChangeComplete} />
        </Box>
        <Box>
            <Button m={2} colorScheme="teal" onClick={canvasClear}>
                <Image src={DeleteIcon}></Image>
            </Button>
        </Box>
    </Flex>
  );
}

export default Toolbar;
