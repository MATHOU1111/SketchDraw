
import { useGetRequest } from "../utils/hooks/useGetRequest.js";
import DrawItem from "./DrawItem.jsx";
import {Flex, Grid} from '@chakra-ui/react';

const DrawList = ({listType}) => {
    const { data: canvasList, loadingGet, errorGet } = useGetRequest("http://localhost:3000/canvas");


    // Loading state
    if (loadingGet) {
        return <div>Loading...</div>;
    }

    // Error state
    if (errorGet) {
        return <div>Error: {errorGet.message}</div>;
    }

    if (listType === "grid") {
        return (
            <Grid templateColumns='repeat(4, 2fr)'>
                {canvasList && canvasList.map(draw => (
                    <DrawItem listType={listType} draw={draw} key={draw.id}/>
                ))}
            </Grid>
        );
    }else {
        return (
            <Flex direction="column">
                {canvasList && canvasList.map(draw => (
                    <DrawItem listType={listType} draw={draw} key={draw.id}/>
                ))}
            </Flex>
        );
    }
};

export default DrawList;
