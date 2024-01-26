import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useState } from 'react';

import DeleteIcon from './../assets/delete.svg';
import DrawIcon from './../assets/draw.svg';
import brush from './../assets/paint.svg';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Portal,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
  } from '@chakra-ui/react'


function Toolbar({ canvasRef }) {
  const [drawingState, setDrawingState] = useState(true);
  const [sizePaint, setSizePaint] = useState(1); // Changed setsizePaint to setSizePaint


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
            <Button m={2} colorScheme="teal">
                <Popover>
                    <PopoverTrigger>
                        <Image src={brush} py={4}></Image>
                    </PopoverTrigger>
                    <Portal>
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
                    </Portal>
                </Popover>
            </Button>
        </Box>
        <Box>
            <Button m={2} colorScheme="teal" onClick={drawingModeChange} >
                <Image src={DrawIcon}></Image>
            </Button>
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
