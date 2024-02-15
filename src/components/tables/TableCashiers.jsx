import { Pagination } from "./Pagination.jsx";
import { useTable } from "./useTable.jsx";
// import { Table } from "./Table.jsx";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { ContextTable } from "/src/contexts/ContextTable.jsx";
import MUITable from "@mui/material/Table";
import { BodyRow } from "./BodyRow.jsx";
import { HeaderRow } from "./HeaderRow.jsx";

const cashiers = [
  {
    id: 169,
    username: "DEFAULT_CASHIER",
    email: "default_cashier@gmail.com",
    role: null,
  },

  {
    id: 170,
    username: "def1",
    email: "default_cashier@gmail.com",
    role: null,
  },
  {
    id: 172,
    username: "def2",
    email: "default_cashier@gmail.com",
    role: null,
  },
  {
    id: 173,
    username: "def3",
    email: "default_cashier@gmail.com",
    role: null,
  },
];

function TableCashiers() {
  const ctx = useTable({
    data: cashiers,
    rowsPerPage: 10,
    orderBy: "index",
    fields: {
      id: null,
      username: null,
      email: null,
      role: null,
    },
  });

  return (
    <>
      <ContextTable ctx={ctx}>
        <MUITable>
          <TableHead>
            <HeaderRow />
          </TableHead>
          <TableBody>
            {(ctx.rowsPerPage > 0
              ? ctx.sortedData?.slice(
                  ctx.page * ctx.rowsPerPage,
                  ctx.page * ctx.rowsPerPage + ctx.rowsPerPage,
                )
              : ctx.sortedData
            )?.map((row, i) => (
              <BodyRow
                key={i}
                data={row}
                fields={ctx.fields}
                isSelected={row.selected}
                handleRowSelect={ctx.handleRowSelect}
              />
            ))}
          </TableBody>
        </MUITable>
        <Pagination />
      </ContextTable>
    </>
  );
}

export { TableCashiers };
