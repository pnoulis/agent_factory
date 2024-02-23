// mui
import MuiTableRow from "@mui/material/TableRow";
import MuiTableCell from "@mui/material/TableCell";
import MuiCheckbox from "@mui/material/Checkbox";

// -
import { useContextTable } from "/src/contexts/ContextTable.jsx";
import { HeaderCell } from "./HeaderCell.jsx";

function HeaderRow({ showCheckbox, showIndex }) {
  const ctx = useContextTable();
  return (
    <MuiTableRow>
      {showCheckbox && (
        <MuiTableCell padding="checkbox">
          <MuiCheckbox
            indeterminate={
              ctx.rowSelectedCount > 0 && ctx.rowSelectedCount < ctx.rowCount
            }
            checked={ctx.rowCount > 0 && ctx.rowSelectedCount === ctx.rowCount}
            onChange={ctx.handleRowSelectAll}
          />
        </MuiTableCell>
      )}
      {showIndex && (
        <HeaderCell
          name="No"
          order={ctx.order}
          orderBy="index"
          active={ctx.orderBy === "index"}
          onSort={ctx.handleChangeOrderBy}
        />
      )}
      {Object.keys(ctx.fields).map((k, i) => (
        <HeaderCell
          key={i}
          name={k}
          label={ctx.fields[k]?.label}
          order={ctx.order}
          active={ctx.orderBy === k}
          onSort={ctx.handleChangeOrderBy}
        />
      ))}
    </MuiTableRow>
  );
}

export { HeaderRow };
