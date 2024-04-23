import { useToast } from '@chakra-ui/react';

export function useCustomToast() {
    const toast = useToast();

    const showToast = (title, duration = 5000, isClosable = true, status) => {
        toast({
            title,
            duration,
            isClosable,
            status,
            containerStyle: {
                margin: '20px',
                color: 'white',
            }
        });
    };

    return { showToast };
}