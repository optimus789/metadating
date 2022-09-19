import { Box, HStack, Text, VStack, chakra, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { user } from "../../utils/types";
import Description from "./Description";
import FavNfts from "./FavNfts";

type UserCardProps = user;

const UserCard: React.FC<UserCardProps> = (user) => {
  //in real app you will get this info from api after doing the call
  const [requestSent, setRequestSent] = useState(false);

  const handleUserCardClick = () => {
    setRequestSent(true);
    console.log(`user ${user.name} clicked`);
  };

  return (
    <VStack w={300} px={6} py={5} bgColor='gray.700' rounded='xl'>
      <HStack w='full' justifyContent='space-between'>
        <Box
          rounded='full'
          borderColor='pink.400'
          borderWidth={2}
          width={20}
          height={20}
          pos='relative'
        >
          <Image
            src={user.profilePic}
            alt='User img'
            layout='fill'
            className='rounded-full'
          />
        </Box>
        <VStack justifyContent='space-between' pr={8} spacing={1}>
          <Text fontSize='2xl' color='pink.400'>
            {user.name}
          </Text>
          <Text color='white'>
            Age: <chakra.span color='cyan.400'>{user.age}</chakra.span>
          </Text>
          <Text color='white'>
            Sex:{" "}
            <chakra.span color={user.sex === "male" ? "cyan.400" : "pink.400"}>
              {user.sex}
            </chakra.span>
          </Text>
        </VStack>
      </HStack>
      <HStack w='full' justifyContent='space-between'>
        <Text color='white'>
          Country: <chakra.span color='cyan.400'>{user.country}</chakra.span>
        </Text>
        <Text color='white'>
          City: <chakra.span color='cyan.400'>{user.city}</chakra.span>
        </Text>
      </HStack>
      <Description description={user.description} />
      <FavNfts
        nft1Img={user.nft1Img}
        nft2Img={user.nft2Img}
        nft3Img={user.nft3Img}
      />
      <Box pt={5}>
        <Button
          colorScheme='green'
          onClick={handleUserCardClick}
          disabled={requestSent}
        >
          {requestSent ? "Request sent" : "Send Request"}
        </Button>
      </Box>
    </VStack>
  );
};

export default UserCard;
