import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import {Button } from '@chakra-ui/react';

function ButtonExample() {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState("#fff");

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    console.log(color.hex)
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
    bottom: '35%', // Décale la div au-dessus du bouton
  };

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return (
    <div>
      <Button colorScheme="linkedin" onClick={handleClick}>Pick Color</Button>
      {displayColorPicker ? (
        <div style={ popover }>
          <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={handleClose}/>
          <ChromePicker
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ButtonExample;
