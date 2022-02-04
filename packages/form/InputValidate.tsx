import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/packages/form/Input";
export interface IInput {
  control: any;
  rules?: IRules;
  label?: string;
  description?: string;
  isDisabled?: boolean;

  value?: string | number;
  onChange?: (arg: string) => void;
  onBlur?: () => void;
  onError?: (msg: string) => void;
  name: string;
  mask?: string;
}

interface IRules {
  required?: string;
  validate?: (value: string) => any;
}

export const InputValidate: React.VFC<IInput> = (props): JSX.Element => {
  const { control, name, value, rules, onChange, onBlur, onError, mask } =
    props;

  const { formState } = useForm({ mode: "onBlur" });

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState, formState }) => {
          return (
            <Input
              {...props}
              mask={mask}
              value={value}
              onChange={(value) => {
                field.onChange(value);
                onChange && onChange(value);
              }}
              onBlur={onBlur}
              error={fieldState.error?.message}
            />
          );
        }}
      />
    </>
  );
};
