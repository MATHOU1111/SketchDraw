import React from 'react';
import {Card, CardHeader} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";


const PagesItem = ({pages, index, id}) => {
    const navigate = useNavigate();


    const switchPage = (id) => {
        navigate(`?page=${id}`);
        console.log(id)
    }

    return (
        <a style={{cursor: 'pointer'}}>
            <Card _hover={{ bg: "grey", color: "black" }} onClick={() => switchPage(id)} maxW='sm' m={4}>
                <CardHeader>
                    {index} - {pages.name}
                </CardHeader>
            </Card>
        </a>

    );
};


export default PagesItem;
