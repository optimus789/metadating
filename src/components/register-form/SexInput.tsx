import {
	FormControl,
	FormLabel,
	RadioGroup,
	HStack,
	Radio,
	FormErrorMessage,
} from '@chakra-ui/react';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { registerInput } from '../../utils/schemas/register.schema';

interface SexInputProps {
	register: UseFormRegister<registerInput>;
	registerName: 'sex';
	errors: FieldErrorsImpl<registerInput>;
}

const SexInput: React.FC<SexInputProps> = ({
	register,
	registerName,
	errors,
}) => {
	const isError = errors[registerName] ? true : false;
	const errorMessage = 'Choose your sex';

	return (
		<FormControl w={150} isInvalid={isError}>
			<FormLabel ml={1} color="cyan.400">
				Sex
			</FormLabel>
			<RadioGroup color="white">
				<HStack
					w="full"
					h="40px"
					justifyContent="space-between"
					alignItems="center"
				>
					<Radio value="male" {...register(registerName)} colorScheme="pink">
						Male
					</Radio>
					<Radio value="female" {...register(registerName)} colorScheme="pink">
						Female
					</Radio>
				</HStack>
			</RadioGroup>
			{isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
		</FormControl>
	);
};

export default SexInput;
