import React from 'react';
import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDeleteRequest } from "../utils/hooks/useDeleteRequest.js";


const DrawItem = ({ draw, onPageAdded }) => {
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
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{draw.name} - {draw.id}</Heading>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button onClick={visualize} variant='solid' colorScheme='blue'>
                        Visualiser
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
