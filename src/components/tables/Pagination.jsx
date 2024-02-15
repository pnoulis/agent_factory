import styled from "styled-components";
import MUIPagination from "@mui/material/TablePagination";
import { useContextTable } from "/src/contexts/ContextTable";

function Pagination({ className, style }) {
  const ctx = useContextTable();
  return (
    <Div
      className={className}
      style={style}
      component="div"
      showFirstButton
      showLastButton
      count={ctx.rowCount}
      rows={ctx.data}
      page={ctx.page}
      rowsPerPage={ctx.rowsPerPage}
      onPageChange={ctx.handlePageChange}
      onRowsPerPageChange={ctx.handleRowsPerPageChange}
    />
  );
}

const Div = styled(MUIPagination)`
  font-family: Saira !important;
  .MuiTablePagination-spacer {
    display: none;
  }

  .MuiTablePagination-selectLabel {
    line-height: 1;
    font-family: Saira;
    font-size: var(--tx-md);
    font-weight: 450;
  }

  .MuiInputBase-root {
    box-sizing: content-box;
    margin: 0;
    margin-right: 15px;
    top: 1px;
  }

  .MuiInputBase-root > .MuiTablePagination-select {
    all: unset !important;
    font-family: Saira !important;
    font-size: var(--tx-md) !important;
    font-weight: 450 !important;
    width: 100% !important;
    text-align: center !important;
    cursor: pointer !important;
    width: 80px !important;
    // padding: 0 30px 0 20px !important;
  }
  .MuiSvgIcon-root {
    display: inline;
    right: 5px;
  }

  .MuiTablePagination-displayedRows {
    font-family: Saira;
    font-size: var(--tx-md);
    font-weight: 450;
  }

  .MuiPaper-root > * {
    font-family: Saira !important;
  }
`;

export { Pagination };
