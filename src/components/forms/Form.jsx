import * as React from "react";
import { useForm, FormProvider } from "react_utils/inputs";
import styled from "styled-components";

function Form({
  id,
  fields,
  ctx,
  submitting,
  onSubmit,
  onChange,
  className,
  style,
  children,
}) {
  const [form, setForm] = ctx ?? useForm({ submitting, fields });

  React.useEffect(() => {
    if (!form.submitting) return;
    onSubmit?.({ ...form, setForm }, (err) => {
      debug(err.code);
      if (err.code === ERR_CODES.EVALIDATION) {
        setForm("setErrors", err.cause.validationErrors);
      } else {
        throw err;
      }
    })?.finally(() => {
      setForm("setSubmit", false);
    });
  }, [form.submitting]);

  React.useEffect(() => {
    onChange?.({ ...form, setForm });
  }, [form.fields]);

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
  width: 100%;
  flex-flow: column nowrap;
  font-family: Saira;
  font-weight: 500;
  row-gap: 40px;
`;

export { Form };
