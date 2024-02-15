import { Table } from "./Table.jsx";

function TableCashiers({ cashiers }) {
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
    />
  );
}

export { TableCashiers };
