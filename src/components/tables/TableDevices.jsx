import { Table } from "./Table.jsx";

function TableDevices({ devices, onSelectionChange }) {
  return (
    <Table
      showIndex
      showCheckbox
      data={devices}
      fields={{
        id: null,
        type: null,
        room: null,
      }}
      onSelectionChange={onSelectionChange}
    />
  );
}

export { TableDevices };
