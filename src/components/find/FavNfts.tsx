import { VStack, Text, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

interface FavNftsProps {
	nft1Img: any;
	nft2Img: any;
	nft3Img: any;
	size?: number;
	textFontSize?: string;
}
const FavNfts: React.FC<FavNftsProps> = ({
	nft1Img,
	nft2Img,
	nft3Img,
	size = 70,
	textFontSize = 'xl',
}) => {
	return (
		<VStack w="full" pt={5}>
			<Text
				fontSize={textFontSize}
				fontWeight="semibold"
				color="pink.400"
				w="full"
				lineHeight={1}
			>
				Favourite NFTs
			</Text>
			<HStack justifyContent="space-between" w="90%" pt={2}>
				<Link key={nft1Img} href={nft1Img}>
					<a target="_blank">
						<Image alt="nft-1-img" height={size} width={size} src={nft1Img} />
					</a>
				</Link>
				<Link key={nft2Img} href={nft2Img}>
					<a target="_blank">
						<Image alt="nft-2-img" height={size} width={size} src={nft2Img} />
					</a>
				</Link>
				<Link key={nft3Img} href={nft3Img}>
					<a target="_blank">
						<Image alt="nft-3-img" height={size} width={size} src={nft3Img} />
					</a>
				</Link>
			</HStack>
		</VStack>
	);
};

export default FavNfts;
