import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import { InputHTMLAttributes, useRef } from "react";
import { Control, FieldErrorsImpl, useController } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import { registerInput } from "../../utils/schemas/register.schema";

type ProfilePicInputProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    control: Control<registerInput>;
    registerName: "profilePic";
    label: string;
    errors: FieldErrorsImpl<registerInput>;
  };

const ProfilePicInput: React.FC<ProfilePicInputProps> = ({
  control,
  registerName,
  label,
  errors,
  ...props
}) => {
  const isError = errors[registerName] ? true : false;
  const errorMessage = String(errors[registerName]?.message);

  const {
    field: { onChange, value, ...inputProps },
  } = useController({ name: registerName, control, rules: { required: true } });

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <FormControl w={300} isInvalid={isError}>
      <FormLabel htmlFor={props.id} color='cyan.400'>
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={FiFile} color='pink.400' />
        </InputLeftElement>
        <input
          type='file'
          accept='image/*'
          {...props}
          {...inputProps}
          style={{ display: "none" }}
          ref={inputRef}
          onChange={(e) => onChange(e.target.files && e.target.files[0])}
        />
        <Input
          placeholder={props.placeholder || "Your file ..."}
          onClick={() => inputRef.current?.click()}
          readOnly={true}
          value={(value && value.name) || ""}
          focusBorderColor='pink.400'
          color='white'
        />
      </InputGroup>
      {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default ProfilePicInput;
