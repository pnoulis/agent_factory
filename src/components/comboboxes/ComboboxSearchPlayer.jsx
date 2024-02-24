import styled, { css } from "styled-components";
import { AsyncSearchableCombobox as Combobox } from "react_utils/comboboxes";
import { useRemoteData, RemoteDataStates } from "react_utils";
import { parsecmd } from "#afm/parsecmd.js";
import { StandardPlayerInfoCard } from "../player/StandardPlayerInfoCard.jsx";
import { AwaitCommand } from "../await-command/AwaitCommand.jsx";
import { Pending } from "../track-commands/Pending.jsx";
import { Rejected } from "../track-commands/Rejected.jsx";
import { Fulfilled } from "../track-commands/Fulfilled.jsx";

function ComboboxSearchPlayer({ labelledBy, onSelect }) {
  const remoteData = useRemoteData({
    getRemoteData: afm.searchPlayer,
    parseRes(cmd) {
      const { players } = cmd.res;
      const options = new Map();
      for (let i = 0; i < players.length; i++) {
        options.set(players[i].username, players[i]);
      }
      return options;
    },
  });
  return (
    <Combobox.Provider
      initialOpen
      asTable
      name="search-player"
      options={remoteData.startFetching}
      onSelect={onSelect}
      labelledBy={labelledBy}
    >
      <TriggerWrapper>
        <Trigger autoFocus placeholder="search" />
        <div className="search-player-states">
          <RemoteDataStates
            context={remoteData}
            RenderPending={<Pending size="40px" />}
            RenderSuccess={
              <Fulfilled style={{ width: "50px", height: "50px" }} />
            }
            RenderError={<Rejected style={{ width: "50px", height: "50px" }} />}
          />
        </div>
      </TriggerWrapper>
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
        color: white;
      }
      .wristband-info-card .value.state {
        color: black;
      }
    `}
`;

function OnEmpty({ className, style, inputValue }) {
  return inputValue ? (
    <StyledOnEmpty className={className} style={style}>
      No player found with the name: <span>{inputValue}</span>
    </StyledOnEmpty>
  ) : null;
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

const TriggerWrapper = styled("div")`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;

  #search-player-trigger {
    flex: 0 1 80%;
  }

  .search-player-states {
    flex: 0 0 20%;
  }
`;

export { ComboboxSearchPlayer };
