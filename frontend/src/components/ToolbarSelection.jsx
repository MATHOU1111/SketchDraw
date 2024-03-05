import { Box, Flex, Button } from "@chakra-ui/react";

const ToolbarSelection = (objectSelected) => {



    return (
        <>
            <Box>
                <Flex name="menu-bottom">
                    <Box name="color">
                    </Box>
                    <Box name="delete-active-selection">
                        <Button m={2} p={2} colorScheme="linkedin">
                        </Button>
                    </Box>
                    <Box name="clear-canvas">
                        <Button m={2} p={2} colorScheme="linkedin">
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};


export default ToolbarSelection;
