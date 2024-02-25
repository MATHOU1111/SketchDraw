import React from 'react';
import {Card, CardHeader} from "@chakra-ui/react";



const PagesItem = ({pages, index, switchPage, id }) => {

    const  switchPagelol = (idCanvas) =>{
        switchPage(idCanvas)
    }

    return (
        <>
            <Card onClick={() => switchPage(id)} maxW='sm' m={4}>
                <CardHeader>
                    {index} - {pages.name}
                </CardHeader>
            </Card>
        </>

    );
};


export default PagesItem;
