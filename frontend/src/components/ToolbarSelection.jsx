import { Box, Flex, Input } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker.jsx";
import { useState, useEffect } from "react";

const ToolbarSelection = ({ objectSelected }) => {
    const [textboxSettings, setTextboxSettings] = useState(false);


    // Utilisez useEffect pour mettre à jour textboxSettings lorsque objectSelected change
    useEffect(() => {
        if (objectSelected.type === "textbox") {
            setTextboxSettings(true);
        } else {
            setTextboxSettings(false);
        }
    }, [objectSelected]);


    const sizeText = (e) => {
        objectSelected.set('fontSize', e.target.value);
    }


    return (
        <>
            <Box>
                <Flex name="menu-bottom">
                    <Box name="color">
                        <ColorPicker objectSelected={objectSelected} />
                    </Box>
                    {textboxSettings && (
                        <Box>
                            <Input m={2} onChange={sizeText} placeholder='large size' size='md' />
                        </Box>
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default ToolbarSelection;
