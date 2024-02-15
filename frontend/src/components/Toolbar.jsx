import { Box, Button, Flex, Image , useDisclosure, SlideFade} from "@chakra-ui/react";
import { useState } from 'react';

import DeleteIcon from './../assets/delete.svg';
import DrawIcon from './../assets/draw.svg';
import brush from './../assets/paint.svg';
import download from './../assets/download.svg';
import activeSelectionDeleteIcon from './../assets/activeSelectionDel.svg'


import ButtonExample from "c:/workflow/SketchDraw/src/components/colorPicker"

import {Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, Slider, SliderTrack, SliderFilledTrack, SliderThumb} from '@chakra-ui/react';

function Toolbar({ canvasRef }) {
  const [drawingState, setDrawingState] = useState(true);
  const [sizePaint, setSizePaint] = useState(1);
  const { isOpen, onToggle } = useDisclosure();



function SliderSize(){
  return (
    <Button m={2} p={2} colorScheme="linkedin">
    <Popover>
        <PopoverTrigger>
            <Image src={brush} py={4}></Image>
        </PopoverTrigger>
            <PopoverContent p="2">
            <PopoverArrow />
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
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                </Slider>
            </PopoverBody>
            </PopoverContent>
    </Popover>
</Button>
  )
}

const activeSelectionDelete = () =>{
  const canvas = canvasRef.current;
  if (canvas && canvas._activeObject) {
    const activeSelection = canvas._activeObject;
    console.log(activeSelection._objects);
    for( const object of activeSelection._objects){
      canvas.remove(object);
    }
    
    canvas.renderAll();
  }
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


   // Telechargement du canva
   const handleDownload = () => {
    const canvas = canvasRef.current;
    let canvasDataUrl = canvas.toDataURL({ format: 'png' });

    // Créez un lien de téléchargement
    const link = document.createElement('a');
    link.href = canvasDataUrl;
    link.download = 'mon_canvas.png'; 
    link.click();
  }


  // Ajout d'une zone de texte
  const addText = () => {
    const canvas = canvasRef.current;
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

  

  return (
    <>
      <Button onClick={onToggle} style={{bottom : '0', position:'fixed'}} colorScheme="blue" m={4}>Toggle Toolbar</Button>
      <SlideFade in={isOpen} offsetX='-200px' style={{ position: 'fixed', left: 0, height: '50%', zIndex: 'overlay' }}>
        <Flex direction="column" borderRadius={4} position="fixed" rounded='md' shadow='md'  p={8} backgroundColor="white">
        <Box>
              <Button m={2} p={2} style={{ backgroundColor: drawingState ? 'red' : 'green' }} onClick={drawingModeChange} >
                <Image src={DrawIcon} />
              </Button>
            </Box>
          <Box>
            <SliderSize />
          </Box>

          <Box>
              <ButtonExample canvasRef={canvasRef} />
          </Box>

          <Box>
            <Button m={2} p={2} colorScheme="linkedin" onClick={addText}>
              T
            </Button>
          </Box>

          <Box>
            <Button m={2} p={2} colorScheme="linkedin" onClick={activeSelectionDelete}>
            <Image src={activeSelectionDeleteIcon}></Image>
            </Button>
          </Box>
            
          <Box>
            <Button m={2} p={2} colorScheme="linkedin" onClick={handleDownload}>
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
