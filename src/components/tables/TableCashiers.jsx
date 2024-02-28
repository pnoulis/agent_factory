import { Table } from "./Table.jsx";

function TableCashiers({ cashiers, onSelectionChange }) {
  return (
    <Table
      showIndex
      showCheckbox
      data={cashiers}
      fields={{
        id: null,
        username: null,
        email: null,
        role: null,
      }}
      onSelectionChange={onSelectionChange}
    />
  );
}

export { TableCashiers };
