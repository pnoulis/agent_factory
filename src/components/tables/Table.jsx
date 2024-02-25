// mui
import MuiTable from "@mui/material/Table";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableBody from "@mui/material/TableBody";

// -
import styled from "styled-components";
import { useTable } from "./useTable.jsx";
import { HeaderRow } from "./HeaderRow.jsx";
import { BodyRow } from "./BodyRow.jsx";
import { Pagination } from "./Pagination.jsx";
import { ContextTable } from "/src/contexts/ContextTable.jsx";
import { sort, getComparator } from "/src/misc/sort.js";
import { mergec } from "/src/misc/misc.js";
import { Overflow } from "#components/Overflow.jsx";

function Table({
  ctx,
  data,
  fields,
  orderBy = "index",
  showCheckbox,
  showIndex,
  className,
  style,
  onSelectionChange,
  onRowClick,
  ...props
}) {
  ctx ??= useTable({
    data,
    fields,
    orderBy,
    rowsPerPage: 25,
    sort,
    getComparator,
    onSelectionChange,
  });

  return (
    <ContextTable ctx={ctx}>
      <Wrapper
        className={mergec(className, "table-wrapper")}
        style={style}
        {...props}
      >
        <Overflow className="overflow">
          <MuiTable stickyHeader>
            <MuiTableHead>
              <HeaderRow showCheckbox={showCheckbox} showIndex={showIndex} />
            </MuiTableHead>
            <MuiTableBody>
              {(ctx.rowsPerPage > 0
                ? ctx.data.slice(
                    ctx.page * ctx.rowsPerPage,
                    ctx.page * ctx.rowsPerPage + ctx.rowsPerPage,
                  )
                : ctx.data
              )?.map((row, i) => (
                <BodyRow
                  key={i}
                  data={row}
                  fields={ctx.fields}
                  isSelected={row.selected}
                  handleRowSelect={onSelectionChange}
                  handleRowClick={onRowClick}
                  showCheckbox={showCheckbox}
                  showIndex={showIndex}
                />
              ))}
            </MuiTableBody>
          </MuiTable>
        </Overflow>
        <Pagination className="table-pagination" />
      </Wrapper>
    </ContextTable>
  );
}

const Wrapper = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: auto;
  background-color: white;
  flex-flow: column nowrap;
  box-shadow: var(--sd-9);
  border-radius: var(--br-xl);
  padding: 5px 5px 0 5px;
  overflow: none;

  .overflow {
    max-height: 92%;
  }

  .table-pagination {
    margin-top: auto;
    overflow: hidden;
  }
`;

export { Table };
