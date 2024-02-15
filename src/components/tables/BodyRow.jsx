import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { BodyCell } from "./BodyCell.jsx";

function BodyRow({ data, fields, isSelected, handleRowSelect }) {
  return (
    <TableRow
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
      onClick={() => handleRowSelect?.(data)}
      sx={{
        "&": {
          cursor: "pointer",
        },
        "&:hover": {
          backgroundColor: "var(--secondary-light)",
        },

      }}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} />
      </TableCell>
      <BodyCell name="index" src={data} />
      {Object.keys(fields).map((k, i) => (
        <BodyCell key={i} name={k} src={data} />
      ))}
    </TableRow>
  );
}

export { BodyRow };
