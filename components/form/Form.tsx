import React, { useState } from "react";
import styled from "@emotion/styled";
import Paragraph from "@/packages/typography/paragraph/Paragraph";
import { InputValidate } from "@/packages/form/InputValidate";
import { useForm, Controller } from "react-hook-form";
import form from "@/pages/api/form";

export interface IFormTest {}
const mockInputRules = {
  required: "Это поле обязательное",
  validate: (value: string) => {
    return value.trim().length || "Поле не должно быть пустым";
  },
};

const StyledForm = styled.form``;

export const FromTest: React.VFC<IFormTest> = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const [fileData, setFileData] = useState({
    fullName: "",
  });

  const [form, setFrom] = useState({ firstName: "", lastNmae: "" });
  const handleChange = (value: number | string | boolean, key: string) => {
    setFrom((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <StyledForm>
        <Paragraph size={16}>Test form</Paragraph>
        <InputValidate
          name="firstName"
          label="Name"
          rules={mockInputRules}
          control={control}
          value={form.firstName}
          onChange={(value) => value && handleChange(value, "firstName")}
        />
      </StyledForm>
    </>
  );
};
