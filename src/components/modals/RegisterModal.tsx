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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerInput,
  registerSchema,
} from "../../utils/schemas/register.schema";
import NFTInput from "../register-form/NFTInput";
import ProfilePicInput from "../register-form/ProfilePicInput";
import RegisterInput from "../register-form/RegisterInput";
import RegisterTextarea from "../register-form/RegisterTextarea";
import SexInput from "../register-form/SexInput";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit((values: registerInput) => {
    if (!values.profilePic) {
      setError("profilePic", { message: "Profile picture is required" });
    }
    console.log(values);
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={{ base: "sm", md: "md", lg: "3xl" }}
    >
      <ModalOverlay />
      <ModalContent bgColor='gray.800'>
        <ModalHeader color='white'>Register your account</ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody>
          <form id='register-form' onSubmit={onSubmit}>
            <VStack w='full' spacing={5}>
              <Stack
                direction={{ base: "column", md: "column", lg: "row" }}
                w='full'
                justifyContent={{
                  base: "center",
                  md: "center",
                  lg: "space-between",
                }}
                alignItems='center'
              >
                <RegisterInput
                  label='Name'
                  register={register}
                  registerName='name'
                  placeholder='Enter your name...'
                  errors={errors}
                />
                <RegisterInput
                  label='Age'
                  type='number'
                  register={register}
                  registerName='age'
                  placeholder='Enter your age...'
                  errors={errors}
                  min={1}
                />
                <SexInput
                  register={register}
                  registerName='sex'
                  errors={errors}
                />
              </Stack>
              <Stack
                direction={{ base: "column", md: "column", lg: "row" }}
                w='full'
                justifyContent={{
                  base: "center",
                  md: "center",
                  lg: "space-between",
                }}
              >
                <RegisterInput
                  label='Country'
                  register={register}
                  registerName='country'
                  placeholder='Enter your country...'
                  errors={errors}
                  customWidth={340}
                />
                <RegisterInput
                  label='City'
                  register={register}
                  registerName='city'
                  placeholder='Enter your city...'
                  errors={errors}
                  customWidth={340}
                />
              </Stack>
              <RegisterTextarea
                label='Description'
                register={register}
                registerName='description'
                errors={errors}
                placeholder='Tell us about yourself...'
              />
              <Flex w='full' justifyContent='flex-start'>
                <ProfilePicInput
                  errors={errors}
                  label='Profile picture'
                  control={control}
                  registerName='profilePic'
                  placeholder='Choose your profile picture...'
                />
              </Flex>
              <VStack w='full' spacing={3}>
                <Text
                  w='full'
                  fontSize='xl'
                  fontWeight='semibold'
                  color='white'
                >
                  Your favourite NFTs
                </Text>
                <NFTInput register={register} errors={errors} nftNumber={1} />
                <Divider color='purple.600' />
                <NFTInput register={register} errors={errors} nftNumber={2} />
                <Divider />
                <NFTInput register={register} errors={errors} nftNumber={3} />
              </VStack>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <HStack w='full' justifyContent='center'>
            <Button colorScheme='pink' form='register-form' type='submit'>
              Submit
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
