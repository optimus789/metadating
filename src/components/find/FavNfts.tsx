import { VStack, Text, HStack } from '@chakra-ui/react';
import Image from 'next/image';

interface FavNftsProps {
	nft1Img: any;
	nft2Img: any;
	nft3Img: any;
}

const FavNfts: React.FC<FavNftsProps> = ({ nft1Img, nft2Img, nft3Img }) => {
	return (
		<VStack w="full" pt={5}>
			<Text
				fontSize="xl"
				fontWeight="semibold"
				color="pink.400"
				w="full"
				lineHeight={1}
			>
				Favourite NFTs
			</Text>
			<HStack justifyContent="space-between" w="90%" pt={2}>
				<Image alt="nft-1-img" height={45} width={45} src={nft1Img} />
				<Image alt="nft-2-img" height={45} width={45} src={nft2Img} />
				<Image alt="nft-3-img" height={45} width={45} src={nft3Img} />
			</HStack>
		</VStack>
	);
};

export default FavNfts;
