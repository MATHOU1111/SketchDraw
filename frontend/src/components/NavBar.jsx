import React from 'react';
import {Flex, useColorMode, useColorModeValue, Button, Image} from '@chakra-ui/react';
import {SunIcon, MoonIcon} from '@chakra-ui/icons';
import {useNavigate, Link} from "react-router-dom";


import github from './../assets/github.svg';
import linkedin from './../assets/linkedin.svg';

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const navigate = useNavigate();

    return (
        <Flex as="nav" align="center" boxShadow='base' justify="space-between" wrap="wrap" padding="1.1rem"
              bg={useColorModeValue('gray.500', 'gray.900')} color={useColorModeValue('gray.600', 'white')}>
            <Flex>
                <Flex m={4}>
                    <a href="https://github.com/MATHOU1111">
                        <Image src={github}/>
                    </a>
                </Flex>
                <Flex m={4}>
                    <a href="https://linkedin.com/in/mathisdumage">
                        <Image src={linkedin}/>
                    </a>
                </Flex>
            </Flex>
            <Flex marginRight="8">
                <Button as={Link} to="/" marginRight="2">
                    Accueil
                </Button>
                <Button onClick={toggleColorMode} mr="8">
                    {colorMode === 'dark' ? (
                        <SunIcon boxSize={4}/>
                    ) : (
                        <MoonIcon boxSize={4}/>
                    )}
                </Button>
            </Flex>
        </Flex>
    );
};


export default Navbar;