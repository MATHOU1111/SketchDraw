import React from 'react';
import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button, Badge, Image, Center, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDeleteRequest } from "../utils/hooks/useDeleteRequest.js";
import pencil from './../assets/pencil.jpg'


const DrawItem = ({ draw }) => {
    const navigate = useNavigate();
    const { deleteData } = useDeleteRequest();

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

    return (
        <Card maxW='sm' m={4}>
            <CardBody>
                <Flex>
                    <Heading size='md' mb={4}>{draw.name}</Heading>
                </Flex>
                <Stack spacing='3' border={"1px"} p={12} backgroundColor={"white"}>
                    <Center>
                        <Image borderRadius={8} w={32} src={pencil} >
                        </Image>
                    </Center>
                </Stack>
            </CardBody>
            <Divider />
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
    );
};


export default DrawItem;
