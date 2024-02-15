import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { useContextTable } from "/src/contexts/ContextTable.jsx";
import { HeaderCell } from "./HeaderCell.jsx";

function HeaderRow() {
  const ctx = useContextTable();
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={
            ctx.rowSelectedCount > 0 && ctx.rowSelectedCount < ctx.rowCount
          }
          checked={ctx.rowCount > 0 && ctx.rowSelectedCount === ctx.rowCount}
          onChange={ctx.handleRowSelectAll}
        />
      </TableCell>
      <HeaderCell name="No" />
      {Object.keys(ctx.fields).map((k, i) => (
        <HeaderCell key={i} name={k} />
      ))}
    </TableRow>
  );
}

export { HeaderRow };
