import {
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { registerInput } from "../../utils/schemas/register.schema";

type RegisterInputProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    register: UseFormRegister<registerInput>;
    registerName: keyof registerInput;
    label: string;
    errors: FieldErrorsImpl<registerInput>;
    customWidth?: number;
  };

const RegisterInput: React.FC<RegisterInputProps> = ({
  register,
  registerName,
  label,
  errors,
  customWidth = 250,
  ...props
}) => {
  const isError = errors[registerName] ? true : false;
  const errorMessage =
    registerName === "age"
      ? "Age is required"
      : String(errors[registerName]?.message);

  return (
    <FormControl w={customWidth} isInvalid={isError}>
      <FormLabel htmlFor={props.id} ml={1} color='cyan.400'>
        {label}
      </FormLabel>
      <Input
        {...props}
        {...register(registerName, { valueAsNumber: registerName === "age" })}
        focusBorderColor='pink.400'
        color='white'
      />
      {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default RegisterInput;
