import {
	Box,
	Button,
	FormLabel,
	HStack,
	Input,
	Radio,
	RadioGroup,
	Tooltip,
	VStack,
} from '@chakra-ui/react';
import { useMetaMask } from 'metamask-react';
import { Dispatch, SetStateAction } from 'react';
import { mockUsers } from '../../utils/mock-data';
import { user } from '../../utils/types';
import { getNFTs } from '../utils/utils';

interface SearchbarProps {
	setUsers: Dispatch<SetStateAction<user[] | null>>;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	sex: 'male' | 'female' | 'transgender' | undefined;
	setSex: Dispatch<
		SetStateAction<'male' | 'female' | 'transgender' | undefined>
	>;
	country: string;
	setCountry: Dispatch<SetStateAction<string>>;
}

const Searchbar: React.FC<SearchbarProps> = ({
	setUsers,
	value,
	setValue,
	sex,
	setSex,
	country,
	setCountry,
}) => {
	const { account } = useMetaMask();
	const handleOnClick = async () => {
		try {
			const mintedNfts: user[] | [] = await getNFTs(account);
			let users = mintedNfts.filter(
				(user) =>
					user.name.toLocaleLowerCase().includes(value) ||
					user.name.toUpperCase().includes(value) ||
					user.name.includes(value)
			);
			if (sex === 'male' || sex === 'female' || sex === 'transgender') {
				users = users.filter((user) => user.sex === sex);
			}
			if (country !== '') {
				users = users.filter(
					(user) =>
						user.country.toLocaleLowerCase().includes(country) ||
						user.country.toUpperCase().includes(country) ||
						user.country.includes(country)
				);
			}
			setUsers(users);
		} catch (error) {
			console.log(error);
		}
	};

	const { status } = useMetaMask();

	return (
		<VStack>
			<VStack>
				<VStack w="350px">
					<Input
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						focusBorderColor="pink.400"
						color="white"
						placeholder="Enter name..."
						w={{ base: 300, md: 350 }}
					/>
					<FormLabel ml={1} color="cyan.400">
						Country
					</FormLabel>
					<Input
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						focusBorderColor="pink.400"
						color="white"
						placeholder="Enter country..."
					/>
					<FormLabel ml={1} color="cyan.400">
						Sex
					</FormLabel>
					<RadioGroup
						color="white"
						value={sex}
						onChange={(e: 'male' | 'female') => setSex(e)}
					>
						<HStack
							w="full"
							h="40px"
							justifyContent="space-between"
							alignItems="center"
						>
							<Radio value="undefined" colorScheme="pink" defaultChecked>
								Any
							</Radio>
							<Radio value="male" colorScheme="pink">
								Male
							</Radio>
							<Radio value="female" colorScheme="pink">
								Female
							</Radio>
							<Radio value="transgender" colorScheme="pink">
								Transgender
							</Radio>
						</HStack>
					</RadioGroup>
				</VStack>
				<Tooltip
					label="Please connect the wallet before taking this action"
					isDisabled={status === 'connected'}
				>
					<Box>
						<Button
							colorScheme="pink"
							onClick={handleOnClick}
							disabled={status !== 'connected'}
						>
							Search
						</Button>
					</Box>
				</Tooltip>
			</VStack>
		</VStack>
	);
};

export default Searchbar;
