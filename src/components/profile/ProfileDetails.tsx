import { Box, Heading, HStack, VStack, Text, chakra } from '@chakra-ui/react';
import Image from 'next/image';
import { userProfile } from '../../utils/types';
import FavNfts from '../find/FavNfts';

interface ProfileDetailsProps {
	user: userProfile;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
	return (
		<VStack w="full" spacing={12}>
			<HStack w="full" justifyContent="space-between">
				<Box
					rounded="full"
					borderColor={user.sex === 'male' ? 'cyan.400' : 'pink.400'}
					borderWidth={2}
					width={44}
					height={44}
					pos="relative"
				>
					<Image
						src={user.profilePic}
						alt="User img"
						layout="fill"
						className="rounded-full"
					/>
				</Box>
				<VStack spacing={3} textAlign="right">
					<Heading
						color={user.sex === 'male' ? 'cyan.400' : 'pink.400'}
						fontSize="6xl"
						w="full"
					>
						{user.name}
					</Heading>
					<Text
						color="white"
						fontSize="2xl"
						textTransform="capitalize"
						w="full"
					>
						{user.sex}
					</Text>
					<Text color="white" fontSize="xl" w="full">
						Age: <chakra.span color="cyan.400">{user.age}</chakra.span>
					</Text>
				</VStack>
			</HStack>
			<HStack w="100%" justifyContent="space-between">
				<Text color="white" fontSize="xl">
					Country: <chakra.span color="cyan.400">{user.country}</chakra.span>
				</Text>
				<Text color="white" fontSize="xl">
					City: <chakra.span color="cyan.400">{user.city}</chakra.span>
				</Text>
			</HStack>
			<VStack w="100%" spacing={2}>
				<Text color="pink.400" fontSize="2xl" w="full" fontWeight="semibold">
					About me
				</Text>
				<Text color="white" w="full" fontSize="xl">
					{user.description}
				</Text>
			</VStack>
			<FavNfts
				nft1Img={user.nft1Img}
				nft2Img={user.nft2Img}
				nft3Img={user.nft3Img}
				size={135}
				textFontSize="2xl"
			/>
		</VStack>
	);
};

export default ProfileDetails;
