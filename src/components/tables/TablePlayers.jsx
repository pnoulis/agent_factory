import { Table } from "./Table.jsx";

function TablePlayers({ players, onSelectionChange }) {
  return (
    <Table
      showIndex
      showCheckbox
      showCheckbox={false}
      data={players}
      fields={{
        username: null,
        name: null,
        surname: null,
        email: null,
        state: null,
      }}
      onSelectionChange={onSelectionChange}
    />
  );
}

export { TablePlayers };
