import { FC } from "react";
import { IMaskInput as IMask } from "react-imask";
import { IMaskInputProps } from "./types";
import { TextField, TextFieldProps } from "components/common/textField";
import { Merge } from "components/common/types";

export function InputMaskCustom(props) {
  const { inputRef, onChange, MaskProps, ...other } = props;
  return (
    <IMask
      {...other}
      inputRef={inputRef}
      onAccept={(value, mask) => {
        onChange({
          target: {
            name: props.name,
            value: mask.unmaskedValue,
          },
        });
      }}
      {...MaskProps}
    />
  );
}

interface extendedProps {
  MaskProps: IMaskInputProps;
}

export type AllInputMaskProps = Merge<TextFieldProps, extendedProps>;

const MyInputMaskCustom: FC<AllInputMaskProps> = ({ MaskProps, ...others }) => {
  return (
    <TextField
      {...others}
      InputProps={{
        inputComponent: InputMaskCustom,
        inputProps: { MaskProps: MaskProps },
      }}
    />
  );
};

export default MyInputMaskCustom;
