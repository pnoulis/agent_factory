import { TableDataTuple } from "./TableDataTuple.jsx";
import { DataTuple } from "#components/tuple/DataTuple.jsx";
import TableCell from "@mui/material/TableCell";

function BodyCell(props) {
  return (
    <TableCell align="center">
      <TableDataTuple className={props.className} style={props.style}>
        <DataTuple nok name={props.name} src={props.src} />
      </TableDataTuple>
    </TableCell>
  );
}

export { BodyCell };
