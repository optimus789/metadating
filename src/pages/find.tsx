import {
	Box,
	Heading,
	Text,
	VStack,
	chakra,
	Grid,
	GridItem,
	Button,
	HStack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import Searchbar from '../components/find/Searchbar';
import UserCard from '../components/find/UserCard';
import MetamaskNav from '../components/utils/MetamaskNav';
import { user } from '../utils/types';

const FindPage: NextPage = () => {
	const [users, setUsers] = useState<user[] | null>(null);
	const [value, setValue] = useState('');
	const [sex, setSex] = useState<'male' | 'female' | undefined>(undefined);
	const [country, setCountry] = useState('');

	const resetFilter = () => {
		setValue('');
		setSex(undefined);
		setCountry('');
		setUsers(null);
	};

	return (
		<VStack minH="100vh" bgColor="blackAlpha.900" pt={15} spacing={7}>
			<HStack
				pos="absolute"
				top={0}
				left={0}
				right={0}
				justifyContent="flex-end"
			>
				<Box mt={6} mr={6}>
					<MetamaskNav />
				</Box>
			</HStack>
			<Heading color="cyan.400">Find User</Heading>
			<Box>
				<Searchbar
					setUsers={setUsers}
					value={value}
					setValue={setValue}
					setSex={setSex}
					sex={sex}
					country={country}
					setCountry={setCountry}
				/>
			</Box>
			{users && users.length === 0 && (
				<VStack pt={10}>
					<Text color="white" fontSize="2xl" fontWeight="semibold">
						There is no user that matches your filters.
					</Text>
					<Button variant="link" colorScheme="red" onClick={resetFilter}>
						Reset input
					</Button>
				</VStack>
			)}
			{users && users.length > 0 && (
				<VStack pt={10}>
					<Text color="white" w="full">
						Users found:{' '}
						<chakra.span color="cyan.400">{users.length}</chakra.span>
					</Text>
					<Grid
						templateColumns={{
							base: '1fr',
							lg: 'repeat(2, 1fr)',
							xl: 'repeat(3, 1fr)',
						}}
						templateRows={{
							base: '6fr',
							lg: 'repeat(3, 1fr)',
							xl: 'repeat(2, 1fr)',
						}}
						gap={5}
						pb={5}
					>
						{users.map((user, index) => {
							return (
								<GridItem key={index}>
									<UserCard {...user} />
								</GridItem>
							);
						})}
					</Grid>
				</VStack>
			)}
		</VStack>
	);
};

export default FindPage;
