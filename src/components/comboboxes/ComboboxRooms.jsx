import styled from "styled-components";
import { SelectOnlyCombobox as Combobox } from "react_utils/comboboxes";

function ComboboxRooms({
  style,
  value,
  className,
  rooms = [],
  onSelect,
  ...props
}) {
  value ||= undefined;
  return (
    <Combobox.Provider
      options={rooms}
      labelledBy="rooms-label"
      name="rooms"
      onSelect={onSelect}
    >
      <Trigger
        placeholder="by room"
        style={style}
        className={className}
        value={value}
        {...props}
      />
      <ListOptions renderOption={(props) => <Option {...props} />} />
    </Combobox.Provider>
  );
}

const Trigger = styled(Combobox.Trigger)`
  all: unset;
  display: block;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  background-color: var(--grey-light);
  border-radius: var(--br-md);
  font-size: var(--tx-sm);
  font-weight: 550;
  color: white;
  &::placeholder {
    font-size: var(--tx-sm);
    color: black;
    opacity: 1;
  }

  &:hover {
    opacity: 0.8;
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
  font-size: var(--tx-sm);
  gap: 15px;
  scrollbar-gutter: stable both-edges;
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

export { ComboboxRooms };
