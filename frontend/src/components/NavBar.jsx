import React from 'react';
import {Button, Center} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const navHome = () => {
        navigate("/")
    }

    return (
        <Center bg="white">
                <Button onClick={navHome} style={{color:'black' , padding: "20px"}}>SKETCHDRAW</Button>
        </Center>

    );
};

export default Navbar;