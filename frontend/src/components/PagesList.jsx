import React from 'react';
import PagesItem from "./PagesItem.jsx";
import {Box} from "@chakra-ui/react";


const PagesList = ({ data, switchPage  }) => {



    return (
        <Box border='0.5px'>
            {data && data.map((page, index) => (
                <PagesItem switchPage={switchPage} id={page.id} p={2} pages={page} index={index + 1} key={page.id} />
            ))}
        </Box>
    );
};

export default PagesList;
