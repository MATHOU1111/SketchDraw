import React from 'react';
import {
    Card,
    CardBody,
    Stack,
    Heading,
    Divider,
    CardFooter,
    ButtonGroup,
    Button,
    Image,
    Center,
    Flex,
    Box, VStack, Icon
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useDeleteRequest} from "../utils/hooks/useDeleteRequest.js";
import pencil from './../assets/pencil.jpg'

const DrawItem = ({draw, listType}) => {
    const navigate = useNavigate();
    const {deleteData} = useDeleteRequest();

    const visualize = () => {
        navigate(`editor/${draw.id}/?page=${draw.pages[0].id}`);
    };

    const deleteCanva = () => {
        deleteData(`http://localhost:3000/canvas/${draw.id}`)
            .then(() => {
                console.log("L'item a bien été supprimé");
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la requête :", error);
            });
    };

    if (listType === "grid") {
        return (
            <Card maxW='sm' m={4}>
                <CardBody>
                    <Flex>
                        <Heading size='md' mb={4}>{draw.name}</Heading>
                    </Flex>
                    <Stack spacing='3' border={"1px"} p={12} backgroundColor={"white"}>
                        <Center>
                            <Image borderRadius={8} w={32} src={pencil}></Image>
                        </Center>
                    </Stack>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <ButtonGroup>
                        <Button onClick={visualize} variant='solid' colorScheme='blue'>
                            Dessiner
                        </Button>
                        <Button onClick={deleteCanva} variant='solid' colorScheme='red'>
                            Supprimer
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        )
    } else {
        return (
            <Box w={"3/4"} p={2} overflow="hidden">
                <Flex align="center" _hover={{ bg:'gray.600', cursor: 'pointer' }} borderRadius="md" boxShadow="base" bg={"#2d3748"} p={2}>
                    <Heading fontSize="xl" fontWeight="bold" flex={1}>{draw.name}</Heading>
                    <Button onClick={visualize} colorScheme="blue" size="md" leftIcon={<Icon/>} mr={2}>Edit</Button>
                    <Button onClick={deleteCanva} colorScheme="red" size="md" leftIcon={<Icon/>}>
                        Delete
                    </Button>
                </Flex>
            </Box>
        );
    }
};

export default DrawItem;
