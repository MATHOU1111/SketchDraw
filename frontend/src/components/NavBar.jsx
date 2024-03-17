import React from 'react';
import {Flex, Button, Image} from '@chakra-ui/react';
import {useNavigate, Link} from "react-router-dom";


import github from './../assets/github.svg';
import linkedin from './../assets/linkedin.svg';
import home from "./../assets/home.svg";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Flex as="nav" name="nav-bar" align="center" boxShadow='base' justify="space-between" wrap="wrap" padding="1.1rem"
              bg={'gray.900'} color={'white'}>
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
                    <Image src={home}/>
                </Button>
            </Flex>
        </Flex>
    );
};


export default Navbar;