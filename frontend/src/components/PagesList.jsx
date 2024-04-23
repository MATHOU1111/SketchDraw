// PagesList.jsx
import React, {useState} from 'react';
import PagesItem from "./PagesItem.jsx";
import { Box } from "@chakra-ui/react";
import { useCustomToast } from "../utils/hooks/toast.js";

const PagesList = ({ data }) => {
    const { showToast } = useCustomToast();
    const [selectedPageId, setSelectedPageId] = useState(null);

    const switchPage = (id) => {
        setSelectedPageId(id);
    };

    const deletePage = (id) => {
        if(data.length === 1) {
            showToast("Impossible de supprimer la page, il doit y avoir au moins une page.", 2000, true, 'error')
        }
        else{
            const indexToRemove = data.findIndex((page) => page.id === id);
            if (indexToRemove !== -1) {
                data.splice(indexToRemove, 1);
            } else {
                showToast("Une erreur s'est produite lors de la suppression.", 2000, true, 'error')
                throw new Error(`Impossible de supprimer la page l'id donné était le suivant : ${id}`);
            }
        }
    };

    return (
        <Box border='0.5px'>
            {data && data.map((page, index) => (
                <PagesItem
                    switchPage={switchPage}
                    deletePage={deletePage}
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
