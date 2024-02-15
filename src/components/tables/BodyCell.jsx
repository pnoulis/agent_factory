// mui
import MuiTableCell from "@mui/material/TableCell";

// -
import { TableDataTuple } from "./TableDataTuple.jsx";
import { DataTuple } from "#components/tuple/DataTuple.jsx";

function BodyCell(props) {
  return (
    <MuiTableCell align="center">
      <TableDataTuple className={props.className} style={props.style}>
        <DataTuple nok name={props.name} src={props.src} />
      </TableDataTuple>
    </MuiTableCell>
  );
}

export { BodyCell };
