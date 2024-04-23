
import { useEffect, useState } from "react";
import { useGetRequest } from "../utils/hooks/useGetRequest.js";
import DrawItem from "./DrawItem.jsx";
import {Flex, Grid} from '@chakra-ui/react';

const DrawList = ({listType}) => {
    const { data: canvasList, loadingGet, errorGet } = useGetRequest("http://localhost:3000/canvas");

    const [canvasListState, setCanvasListState] = useState([]);


    useEffect(() => {
        setCanvasListState(canvasList);
    }, [canvasList]);

    if (loadingGet) {
        return <div>Loading...</div>;
    }

    if (errorGet) {
        return <div>Error: {errorGet.message}</div>;
    }

    if (listType === "grid") {
        return (
            <Grid templateColumns='repeat(4, 2fr)'>
                {canvasListState && canvasListState.map(draw => (
                    <DrawItem canvasList={canvasList} listType={listType} draw={draw} key={draw.id} setCanvasListState={setCanvasListState} />
                ))}
            </Grid>
        );
    }else {
        return (
            <Flex direction="column">
                {canvasListState && canvasListState.map(draw => (
                    <DrawItem canvasList={canvasList} listType={listType} draw={draw} key={draw.id} setCanvasListState={setCanvasListState} />
                ))}
            </Flex>
        );
    }
};

export default DrawList;
