// PagesList.jsx
import React, {useState} from 'react';
import PagesItem from "./PagesItem.jsx";
import { Box } from "@chakra-ui/react";

const PagesList = ({ data }) => {
    const [selectedPageId, setSelectedPageId] = useState(null);

    const switchPage = (id) => {
        setSelectedPageId(id);
        console.log(data)
    };

    return (
        <Box border='0.5px'>
            {data && data.map((page, index) => (
                <PagesItem
                    switchPage={switchPage}
                    id={page.id}
                    pages={page}
                    index={index + 1}
                    key={page.id}
                    isSelected={page.id === selectedPageId} // Vérifie si la page est sélectionnée
                />
            ))}
        </Box>
    );
};

export default PagesList;
