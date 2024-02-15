import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import {Box, Button, Image } from '@chakra-ui/react';
import colorIcon from './../assets/color.svg';

function ButtonExample({ canvasRef }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState("#fff");

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeComplete = (color) => {
    const canvas = canvasRef.current;
    setColor(color.hex);
    canvas.freeDrawingBrush.color = color.hex;
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
    bottom: '35%', // Décale la div au-dessus du bouton
  };

  return (
    <Box m={2} >
      <Button p={2} colorScheme="linkedin" onClick={handleClick}><Image src={colorIcon}></Image></Button>
      {displayColorPicker ? (
        <div style={ popover }>
          <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={handleClose}/>
          <ChromePicker
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      ) : null}
    </Box>
  );
}

export default ButtonExample;
