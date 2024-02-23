// mui
import MuiTableRow from "@mui/material/TableRow";
import MuiTableCell from "@mui/material/TableCell";
import MuiCheckbox from "@mui/material/Checkbox";

// -
import { BodyCell } from "./BodyCell.jsx";

function BodyRow({
  data,
  fields,
  isSelected,
  handleRowSelect,
  handleRowClick,
  showCheckbox,
  showIndex,
}) {
  return (
    <MuiTableRow
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
      onClick={() => {
        handleRowClick?.(data);
        handleRowSelect?.(data);
      }}
      sx={{
        "&": {
          cursor: showCheckbox ? "pointer" : "initial",
        },
        "&:hover": {
          backgroundColor: "var(--secondary-light)",
        },
      }}
    >
      {showCheckbox && (
        <MuiTableCell padding="checkbox">
          <MuiCheckbox checked={isSelected} />
        </MuiTableCell>
      )}
      {showIndex && <BodyCell name="index" src={data} />}
      {Object.keys(fields).map((k, i) => (
        <BodyCell key={i} name={k} src={data} gval={fields[k]?.gval} />
      ))}
    </MuiTableRow>
  );
}

export { BodyRow };
