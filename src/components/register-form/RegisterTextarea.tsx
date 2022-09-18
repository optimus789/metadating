import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { TextareaHTMLAttributes } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { registerInput } from "../../utils/schemas/register.schema";

type RegisterTextareaProps = TextareaHTMLAttributes<HTMLInputElement> &
  TextareaProps & {
    register: UseFormRegister<registerInput>;
    registerName: "description";
    label: string;
    errors: FieldErrorsImpl<registerInput>;
  };

const RegisterTextarea: React.FC<RegisterTextareaProps> = ({
  register,
  registerName,
  label,
  errors,
  ...props
}) => {
  const isError = errors[registerName] ? true : false;
  const errorMessage = errors[registerName]?.message;

  return (
    <FormControl w='full' isInvalid={isError}>
      <FormLabel htmlFor={props.id} ml={1} color='cyan.400'>
        {label}
      </FormLabel>
      <Textarea
        {...props}
        {...register(registerName)}
        focusBorderColor='pink.400'
        resize='none'
        color='white'
      />
      {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default RegisterTextarea;
