import styled, { css } from "styled-components";
import { SelectOnlyCombobox as Combobox } from "react_utils/comboboxes";

function ComboboxSelectStandard({
  options,
  className,
  style,
  label,
  name,
  onSelect,
  value,
  ...props
}) {
  value ||= undefined;
  return (
    <Combobox.Provider
      options={options}
      labelledBy={`${name}-label`}
      name={name}
      onSelect={onSelect}
    >
      <Wrapper className={className} style={style} {...props}>
        <Combobox.Trigger value={value} placeholder="" />
        <label htmlFor={`${name}-trigger`}>{label}</label>
      </Wrapper>
      <ListOptions renderOption={(props) => <Option {...props} />} />
    </Combobox.Provider>
  );
}

const Wrapper = styled("div")`
  // defaults
  all: unset;
  display: block;
  box-sizing: border-box;
  cursor: pointer;

  // content
  // dimensions
  width: 100%;
  min-height: 60px;
  height: max-content;
  // appearance
  // dynamic
  pointer-events: none;
  // position
  position: relative;
  text-align: center;
  text-transform: uppercase;

  input {
    pointer-events: auto;
    width: 100%;
    // height: 100%;
    height: 55px;
    padding: 0 6px;
    border-radius: var(--br-sm);
    border: 1px solid var(--black-base);
    font-size: var(--tx-nl);
    text-align: center;
    letter-spacing: 1.5px;
    outline: none;
    color: black;
    background-color: var(--grey-light);
    border-color: white !important;
    border-radius: var(--br-nl);
  }

  label {
    padding: 0 5px;
    border-radius: var(--br-sm);
    letter-spacing: 1.5px;
    font-size: var(--tx-md);
    position: absolute;
    top: 50%;
    width: max-content;
    transform: translate(20px, -50%);
    transition-property: top, font-size;
    transition-duration: 0.3s;
    color: var(--black-subtle);
    pointer-events: none;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .optional {
    position: absolute;
    font-size: var(--tx-md);
    border-radius: var(--br-sm);
    pointer-events: none;
    letter-spacing: 1.5px;
    top: 50%;
    right: 10px;
    padding: 0 5px;
    transform: translate(0, -50%);
    color: var(--info-base);
  }

  &:not(:focus-within) input::placeholder {
    opacity: 0;
  }

  &:focus-within input::placeholder {
    opacity: 0.3;
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label,
  input[aria-expanded="true"] ~ label {
    top: 0px;
    transition-property: top;
    transition-duration: 0.3s;
    font-size: 0.8em;
    background-color: var(--grey-light);
    left: 0;
    transform: translate(1px, -50%);
  }

  input:focus ~ .optional,
  input:not(:placeholder-shown) ~ .optional {
    top: 0px;
    transition-property: top;
    transition-duration: 0.3s;
    font-size: 0.8em;
    right: 1px;
    background-color: var(--grey-light);
  }

  input:disabled ~ label {
    color: black;
  }

  &.error input {
    border: 2px solid var(--error-base);
  }

  &.error label,
  &.error .optional {
    color: var(--error-base);
  }

  &.success input {
    border: 2px solid var(--success-base);
  }

  &.success label {
    color: var(--success-strong);
  }
`;

const ListOptions = styled(Combobox.Listbox)`
  margin-top: 15px;
  border-radius: var(--br-lg);
  outline: none;
  overflow-y: auto;
  overflow-x: none;
  display: flex;
  flex-flow: column nowrap;
  box-shadow: var(--sd-2);
  text-transform: capitalize;
  height: max-content;
  max-height: 300px;
  font-size: var(--tx-nl);
  gap: 15px;
  scrollbar-width: none;
  text-align: center;
  background-color: var(--grey-light);
  z-index: 1000;
`;

const Option = styled(Combobox.Option)`
  padding: 2px 15px;
  cursor: pointer;
  background-color: ${({ active, selected }) =>
    selected && active
      ? "var(--primary-light)"
      : selected
        ? "var(--primary-base)"
        : active
          ? "var(--grey-base)"
          : "transparent"};
`;

export { ComboboxSelectStandard };
