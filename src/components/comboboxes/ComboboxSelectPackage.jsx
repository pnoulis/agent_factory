import styled from "styled-components";
import { SelectOnlyCombobox as Combobox } from "react_utils/comboboxes";

function ComboboxSelectPackage({ pkg, onSelect, labelledBy }) {
  pkg ||= {};

  return (
    <Combobox.Provider
      options={pkg.catalogue.map(({ label }) => label)}
      labelledBy={labelledBy}
      name={`select-${pkg.type}-package`}
      onSelect={(label) =>
        onSelect?.(pkg.catalogue.find((p) => p.label === label))
      }
    >
      <Trigger placeholder={pkg.catalogue[0].label} />
      <ListOptions renderOption={(props) => <Option {...props} />} />
    </Combobox.Provider>
  );
}

const Trigger = styled(Combobox.Trigger)`
  all: unset;
  display: block;
  box-sizing: border-box;
  cursor: pointer;
  width: min-content;
  padding: 0 10px;
  min-height: 50px;
  text-align: center;
  text-transform: uppercase;
  background-color: var(--grey-light);
  border-radius: var(--br-md);
  color: black;
  &::placeholder {
    font-size: var(--tx-nl);
    opacity: 0.7;
  }
  z-index: 10;
`;

const ListOptions = styled(Combobox.Listbox)`
  z-index: 10;
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
  color: ${({ selected }) => selected && "white"};
`;

export { ComboboxSelectPackage };
