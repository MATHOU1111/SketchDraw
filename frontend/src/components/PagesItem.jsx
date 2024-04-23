// PagesItem.jsx
import React from 'react';
import {Button, Card, CardHeader} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";

const PagesItem = ({ pages, index, id, isSelected, switchPage, deletePage }) => {
    const navigate = useNavigate();

    const switchPageHandler = (id) => {
        switchPage(id);
        navigate(`?page=${id}`);
    };


    return (
        <a style={{ cursor: 'pointer' }}>
            <Card
                _hover={{ bg: "grey", color: "black" }}
                onClick={() => switchPageHandler(id)}
                maxW='sm' m={4}
                border={isSelected ? '1px solid grey' : 'none'} // Ajout du style de contour
            >
                <CardHeader>
                    {index} - {pages.name}
                    <Button
                        ml="10"
                        color="red.300"
                        bg="none"
                        _hover={{ bg: '#ebedf0' }}
                        onClick={() => deletePage(id)}
                    >
                        <DeleteIcon m="2" />
                    </Button>
                </CardHeader>
            </Card>
        </a>
    );
};

export default PagesItem;
