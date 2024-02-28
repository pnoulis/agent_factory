import styled from "styled-components";
import { SelectOnlyCombobox as Combobox } from "react_utils/comboboxes";

function ComboboxDeviceView({ views = [], onSelect }) {
  return (
    <Combobox.Provider
      options={views}
      labelledBy="scoreboard-view-label"
      name="scoreboard-view"
      onSelect={onSelect}
    >
      <Trigger placeholder="scoreboard view" />
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
  background-color: var(--primary-base);
  border-radius: var(--br-md);
  font-weight: 550;
  color: white;
  &::placeholder {
    font-size: var(--tx-md);
    color: white;
    opacity: 1;
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
`;

export { ComboboxDeviceView };
