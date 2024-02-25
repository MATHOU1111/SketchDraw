import React from 'react';
import PagesItem from "./PagesItem.jsx";
import {Box} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const PagesList = ({ data, switchPage  }) => {
    const navigate = useNavigate();


    return (
        <Box border='0.5px'>
            {data && data.map((page, index) => (
                <PagesItem switchPage={switchPage} id={page.id} p={2} pages={page} index={index + 1} key={page.id} />
            ))}
        </Box>
    );
};

export default PagesList;
