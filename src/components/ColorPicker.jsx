import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

function ButtonExample() {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
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
      <button onClick={handleClick}>Pick Color</button>
      {displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose}/>
          <ChromePicker />
        </div>
      ) : null}
    </div>
  );
}

export default ButtonExample;
