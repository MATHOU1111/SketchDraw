import React from 'react';
import {Card, CardBody , Stack , Heading, Divider, Text, CardFooter, ButtonGroup, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DrawItem = ({ draw }) => {
    const navigate = useNavigate();


    const visualize = () =>{
        navigate(`editor/${draw.id}`);
    }

    if (draw.name === ""){
        draw.name = "Sans titre"
    }

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
                </ButtonGroup>
            </CardFooter>
        </Card>

    );
};

export default DrawItem;