import { ContextTable } from "/src/contexts/ContextTable.jsx";
import MUITable from "@mui/material/Table";

function Table({ ctx, children }) {
  return (
    <ContextTable ctx={ctx}>
      <MUITable>{children}</MUITable>
    </ContextTable>
  );
}

export { Table };
