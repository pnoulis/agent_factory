import * as React from "react";
import { useForm, FormProvider } from "react_utils/inputs";
import styled from "styled-components";

function Form({ id, fields, onSubmit, className, style, children }) {
  const [form, setForm] = useForm({ submitting: false, fields });

  React.useEffect(() => {
    if (!form.submitting) return;
    onSubmit?.(form.fields, setForm);
  }, [form.submitting]);

  return (
    <FormProvider value={{ ...form, id, setForm }}>
      <StyledForm
        id={id}
        className={className}
        style={style}
        onSubmit={(e) => {
          e.preventDefault();
          setForm("setSubmit", true);
        }}
      >
        {children}
      </StyledForm>
    </FormProvider>
  );
}

const StyledForm = styled("form")`
  z-index: 2;
  display: flex;
  width: 330px;
  flex-flow: column nowrap;
  font-family: Saira;
  font-weight: 500;
  row-gap: 40px;
`;

export { Form };
