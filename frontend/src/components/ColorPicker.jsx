import {useState} from 'react';
import {ChromePicker} from 'react-color';
import {Box, Button, Image} from '@chakra-ui/react';
import colorIcon from '../assets/color.svg';

function ColorPicker({canvasRef, objectSelected}) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [colorBrush, setColorBrush] = useState("black");
    const [colorForm, setColorForm] = useState("#fff")


    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    // Changement de couleur du pinceau
    const handleChangeComplete = (color) => {
        const canvas = canvasRef.current;
        setColorBrush(color.hex);
        canvas.freeDrawingBrush.color = color.hex;
    };

    // Changement de couleur lors de la section
    const handleChangeComplete2 = (color) => {
        let object = objectSelected
        if (object.type === "circle" || object.type === "rect" || object.type === "triangle") {
            setColorForm(color.hex);
            object.set("fill", color.hex);
        } else if (object.type === "path") {
            setColorForm(color.hex);
            object.set("stroke", color.hex);
        } else if (object.type === "textbox") {
            setColorForm(color.hex);
            object.set("fill", color.hex);
        }
    }


    // Style pour la fenêtre du colorPicker
    const popover = {
        position: 'absolute',
        zIndex: '2',
        bottom: '35%', // Décale la div au-dessus du bouton
    };

    return (
        <Box m={2}>
            {objectSelected ? (
                <div>
                    <Button p={2} backgroundColor={objectSelected.fill} onClick={handleClick}>
                        <Image src={colorIcon}/>
                    </Button>
                    {displayColorPicker && (
                        <div style={popover}>
                            <div style={{position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px'}}
                                 onClick={handleClose}/>
                            <ChromePicker color={colorForm} onChangeComplete={handleChangeComplete2}/>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Button p={2} backgroundColor={colorBrush} onClick={handleClick}>
                        <Image src={colorIcon}/>
                    </Button>
                    {displayColorPicker && (
                        <div style={popover}>
                            <div style={{position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px'}}
                                 onClick={handleClose}/>
                            <ChromePicker color={colorBrush} onChangeComplete={handleChangeComplete}/>
                        </div>
                    )}
                </div>
            )}
        </Box>
    );
}

export default ColorPicker;
