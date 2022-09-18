import { HStack, Text } from "@chakra-ui/react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { registerInput } from "../../utils/schemas/register.schema";
import RegisterInput from "./RegisterInput";

interface NFTInputProps {
  register: UseFormRegister<registerInput>;
  nftNumber: 1 | 2 | 3;
  errors: FieldErrorsImpl<registerInput>;
}

const NFTInput: React.FC<NFTInputProps> = ({ register, nftNumber, errors }) => {
  const tokenIdRegisterName: keyof registerInput = `favNFT${nftNumber}-tokenID`;
  const contractAddressRegisterName: keyof registerInput = `favNFT${nftNumber}-contractAddress`;

  return (
    <HStack w='full' justifyContent='space-between'>
      <Text color='cyan.400' fontWeight='semibold'>
        {nftNumber}
      </Text>
      <RegisterInput
        errors={errors}
        register={register}
        registerName={tokenIdRegisterName}
        label='Token ID'
        placeholder='Enter token id....'
        customWidth={320}
      />
      <RegisterInput
        errors={errors}
        register={register}
        registerName={contractAddressRegisterName}
        label='Contract Address'
        placeholder='Enter contract address....'
        customWidth={320}
      />
    </HStack>
  );
};

export default NFTInput;
