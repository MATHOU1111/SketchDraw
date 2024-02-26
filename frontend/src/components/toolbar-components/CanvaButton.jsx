import { Box, Tooltip, Button, Image } from "@chakra-ui/react"


function CanvaButton({name, tooltip, colorScheme , imgSource , action}){


    return(
        <Box name={name}>
                        <Tooltip label={tooltip}>
                        <Button m={2} p={2} colorScheme={colorScheme} onClick={{action}}>
                            <Image src={imgSource}></Image>
                        </Button>
                        </Tooltip>
                    </Box>
    )

}

export default CanvaButton;