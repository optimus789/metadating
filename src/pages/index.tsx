import { Box, Button, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import RegisterModal from "../components/modals/RegisterModal";
import main_img from "../../public/Meta-Dating.svg";
import MetamaskNav from "../components/utils/MetamaskNav";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <RegisterModal isOpen={isOpen} onClose={onClose} />
      <VStack minH='100vh' bgColor='blackAlpha.900' justifyContent='center'>
        <HStack
          pos='absolute'
          top={0}
          left={0}
          right={0}
          justifyContent='flex-end'
        >
          <Box mt={6} mr={6}>
            <MetamaskNav />
          </Box>
        </HStack>
        <VStack spacing={8}>
          <Box
            rounded='full'
            width={{ base: 300, md: 400 }}
            height={{ base: 300, md: 400 }}
            pos='relative'
          >
            <Image
              src={main_img}
              alt='Logo'
              layout='fill'
              className='rounded-full'
            />
          </Box>
          <Button size='lg' fontSize='2xl' colorScheme='pink' onClick={onOpen}>
            Register
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default Home;
