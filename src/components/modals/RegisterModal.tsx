import {
	Button,
	Divider,
	Flex,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { WidgetProps } from '@worldcoin/id';
import { useMetaMask } from 'metamask-react';
import dynamic from 'next/dynamic';
import { EncodedURL } from 'nft.storage/dist/src/lib/interface';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	registerInput,
	registerSchema,
} from '../../utils/schemas/register.schema';
import NFTInput from '../register-form/NFTInput';
import ProfilePicInput from '../register-form/ProfilePicInput';
import RegisterInput from '../register-form/RegisterInput';
import RegisterTextarea from '../register-form/RegisterTextarea';
import SexInput from '../register-form/SexInput';
import {
	createMetadatOnIpfs,
	getImagesMetadata,
	mintNFTs,
	verifyWorldId,
} from '../utils/utils';

interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
	const { account } = useMetaMask();
	const [isActive, setIsActive] = useState(false);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setError,
	} = useForm<registerInput>({
		resolver: zodResolver(registerSchema),
	});
	const WorldIDWidget = dynamic<WidgetProps>(
		() => import('@worldcoin/id').then((mod) => mod.WorldIDWidget),
		{ ssr: false }
	);
	const actionId: string = String(process.env.NEXT_PUBLIC_WORLDID_ACTION_ID);

	const onSubmit = handleSubmit(async (values: registerInput) => {
		if (!values.profilePic) {
			setError('profilePic', { message: 'Profile picture is required' });
		}
		console.log(`Values:`, values);
		console.log('account', account);
		const favNftsTokenId = [
			values['favNFT1-tokenID'],
			values['favNFT2-tokenID'],
			values['favNFT3-tokenID'],
		];
		const favNftsContractAddr = [
			values['favNFT1-contractAddress'],
			values['favNFT2-contractAddress'],
			values['favNFT3-contractAddress'],
		];
		const imagesMetadata: string[] | boolean = await getImagesMetadata(
			favNftsTokenId,
			favNftsContractAddr
		);
		if (!imagesMetadata) return;

		const metadataUri: EncodedURL | boolean = await createMetadatOnIpfs(values, imagesMetadata);
		console.log('Final Metadata URI', metadataUri);

		const nftMinted = await mintNFTs(metadataUri, account);
		console.log('NFT Minted', nftMinted);
		if(nftMinted){
			alert('NFT Minted Successfully');
			onClose();
			
		}

	});

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={false}
			size={{ base: 'sm', md: 'md', lg: '3xl' }}
		>
			<ModalOverlay />
			<ModalContent bgColor="gray.800">
				<ModalHeader color="white">Register your account</ModalHeader>
				<ModalCloseButton color="white" />
				<ModalBody>
					<form id="register-form" onSubmit={onSubmit}>
						<VStack w="full" spacing={5}>
							<Stack
								direction={{ base: 'column', md: 'column', lg: 'row' }}
								w="full"
								justifyContent={{
									base: 'center',
									md: 'center',
									lg: 'space-between',
								}}
								alignItems="center"
							>
								<RegisterInput
									label="Name"
									register={register}
									registerName="name"
									placeholder="Enter your name..."
									errors={errors}
								/>
								<RegisterInput
									label="Age"
									type="number"
									register={register}
									registerName="age"
									placeholder="Enter your age..."
									errors={errors}
									min={1}
								/>
								<SexInput
									register={register}
									registerName="sex"
									errors={errors}
								/>
							</Stack>
							<Stack
								direction={{ base: 'column', md: 'column', lg: 'row' }}
								w="full"
								justifyContent={{
									base: 'center',
									md: 'center',
									lg: 'space-between',
								}}
							>
								<RegisterInput
									label="Country"
									register={register}
									registerName="country"
									placeholder="Enter your country..."
									errors={errors}
									customWidth={340}
								/>
								<RegisterInput
									label="City"
									register={register}
									registerName="city"
									placeholder="Enter your city..."
									errors={errors}
									customWidth={340}
								/>
							</Stack>
							<RegisterTextarea
								label="Description"
								register={register}
								registerName="description"
								errors={errors}
								placeholder="Tell us about yourself..."
							/>
							<Flex w="full" justifyContent="flex-start">
								<ProfilePicInput
									errors={errors}
									label="Profile picture"
									control={control}
									registerName="profilePic"
									placeholder="Choose your profile picture..."
								/>
							</Flex>
							<VStack w="full" spacing={3}>
								<Text
									w="full"
									fontSize="xl"
									fontWeight="semibold"
									color="white"
								>
									Your favourite NFTs
								</Text>
								<NFTInput register={register} errors={errors} nftNumber={1} />
								<Divider color="purple.600" />
								<NFTInput register={register} errors={errors} nftNumber={2} />
								<Divider />
								<NFTInput register={register} errors={errors} nftNumber={3} />
							</VStack>
						</VStack>
					</form>
				</ModalBody>
				<ModalFooter>
					<VStack w="full" justifyContent="center">
						<WorldIDWidget
							actionId={actionId} // obtain this from developer.worldcoin.org
							signal={`register_${account}`}
							enableTelemetry
							onSuccess={async (res) => {
								console.log(res);
								let verifyStatus: Boolean = false;
								if (res) {
									verifyStatus = await verifyWorldId(
										res.proof,
										res.nullifier_hash,
										res.merkle_root,
										`register_${account}`,
										actionId
									);
								}
								if (verifyStatus) {
									setIsActive(!isActive);
								}
								// const verifyStatus = await verifyWorldId();
							}}
							onError={(error) => console.error(error)}
						/>
						<Button
							disabled={!isActive}
							colorScheme="pink"
							form="register-form"
							type="submit"
						>
							Submit
						</Button>
					</VStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default RegisterModal;
