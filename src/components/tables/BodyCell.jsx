// mui
import MuiTableCell from "@mui/material/TableCell";

// -
import { TableDataTuple } from "./TableDataTuple.jsx";
import { DataTuple } from "../tuple/DataTuple.jsx";

function BodyCell(props) {
  return (
    <MuiTableCell align="center">
      <TableDataTuple className={props.className} style={props.style}>
        <DataTuple
          nok
          name={props.name}
          src={props.src}
          value={props.gval?.(props.src)}
        />
      </TableDataTuple>
    </MuiTableCell>
  );
}

export { BodyCell };
