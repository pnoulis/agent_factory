import styled, { css } from "styled-components";
import { SearchableCombobox as Combobox } from "react_utils/comboboxes";
import { StandardPlayerInfoCard } from "../player/StandardPlayerInfoCard.jsx";

const getLabels = (players) => {
  const labels = [];
  for (let i = 0; i < players.length; i++) {
    labels.push(players[i].username);
  }
  return labels;
};

function ComboboxSelectPlayer({ labelledBy, players, onSelect }) {
  return (
    <Combobox.Provider
      initialOpen
      asTable
      onSelect={onSelect}
      name="select-player"
      options={players}
      getLabels={getLabels}
    >
      <Trigger autoFocus placeholder="username" />
      <ListOptions
        renderOnEmpty={OnEmpty}
        renderOption={({ option, ...props }) => {
          return (
            <Option {...props}>
              <StandardPlayerInfoCard ctx={option} />
            </Option>
          );
        }}
      />
    </Combobox.Provider>
  );
}

const Trigger = styled(Combobox.Trigger)`
  all: unset;
  display: block;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  width: 100%;
  padding: 0 10px;
  min-height: 55px;
  text-align: center;
  text-transform: uppercase;
  background-color: var(--grey-light);
  border-radius: var(--br-md);
  font-weight: 550;
  color: black;
  &::placeholder {
    font-size: var(--tx-md);
    font-weight: 500;
    opacity: 0.6 !important;
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
  height: max-content;
  max-height: 600px;
  width: 700px;
  font-size: var(--tx-nl);
  gap: 15px;
  scrollbar-gutter: stable both-edges;
  text-align: center;
  background-color: var(--grey-light);
  border-radius: var(--br-lg);
  padding: 0 15px;

  li:first-child {
    margin-top: 15px;
  }
  li:last-child {
    margin-bottom: 15px;
  }
`;

const Option = styled(Combobox.Option)`
  cursor: pointer;
  border-radius: var(--br-lg);
  .player-info-card {
    background-color: inherit;
  }

  .wristband-info-card {
    background-color: var(--grey-light);
  }

  background-color: white;

  ${({ active, selected }) =>
    (active || selected) &&
    css`
      background-color: var(--secondary-light);
      .player-info-card .value.state {
        color: black;
      }
    `}
`;

function OnEmpty(props) {
  return (
    <StyledOnEmpty className={props.className} style={props.style}>
      No available players found!
    </StyledOnEmpty>
  );
}

const StyledOnEmpty = styled("li")`
  border-radius: var(--br-md);
  background-color: var(--grey-light);
  font-size: var(--tx-lg);
  span {
    margin-left: 8px;
    color: var(--primary-medium);
  }
`;

export { ComboboxSelectPlayer };
