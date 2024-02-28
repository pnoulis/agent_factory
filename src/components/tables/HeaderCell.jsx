// mui
import MuiTableCell from "@mui/material/TableCell";

// -
import * as React from "react";
import styled from "styled-components";
import { Svg } from "react_utils/svgs";
import IconArrow from "/assets/icons/filter-pointer.svg?react";
import { TableDataTuple } from "./TableDataTuple.jsx";
import { DataTuple } from "#components/tuple/DataTuple.jsx";

/*
  Sorting direction (order)

  Any list of data may either be sorted in ascending or descending order through
  a sorting function.

  Ascending order: 0-9, A-Z..., (by default represented by an upwards facing arrow)
  Descending order: 9-0, Z-A... (by default represented by a downwards facing arrow)

  By default this table is sorted in ascending order.

  The TableSortLabel is the GUI interface by which a user may select a new order
  and a new sorting function.

  When a user clicks at the TableSortLabel a registered handler is invoked. It's
  task is to provide the Table with a new *order function id* and a new *order
  direction*. If the TableSortTable is clicked for the fist time, it becomes
  active, sorting in ascending order. Any subsequent click on the same
  TableSortLabel will toggle the *sorting order* not the *order function id*.
  All other TableSortLabels are toggled inactive.

  The handler initiates the process of recalculating a new sorted list after
  which all child components are re-rendered. At this point the TableSortLabel
  calculates the direction of the image representing the sorting order (usually
  an arrow).

  Ascending order arrow: faces upwards
  Descending order arrow: faces downwards.
 */

function HeaderCell({
  active,
  order,
  orderBy,
  onSort,
  className,
  style,
  name,
  label,
}) {
  return (
    <MuiTableCell
      align="center"
      style={{
        lineHeight: "1",
        fontWeight: "400",
      }}
    >
      <StyledSortButton
        type="button"
        style={style}
        className={className}
        onClick={() => onSort?.(orderBy || name)}
      >
        <TableDataTuple>
          <DataTuple nov name={name} label={label} />
        </TableDataTuple>
        {active ? (
          <StyledSortButtonIcon order={active ? order : "asc"}>
            <Svg>
              <IconArrow />
            </Svg>
          </StyledSortButtonIcon>
        ) : (
          <StyledSortButtonStub />
        )}
      </StyledSortButton>
    </MuiTableCell>
  );
}

const StyledSortButton = styled("button")`
  font-family: Saira;
  margin: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: var(--tx-xs);
  text-transform: uppercase;
  height: 100%;
  width: 100%;
  color: var(--primary-base);
  font-weight: 600;
`;

const StyledSortButtonIcon = styled("span")`
  flex: 0 0 15px;
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  transform: rotate(${({ order }) => (order === "asc" ? "0" : "180")}deg);
  svg {
    fill: #d3aa72;
  }
`;

const StyledSortButtonStub = styled("span")`
  flex: 0 0 15px;
  box-sizing: border-box;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: #d3aa72;
`;

export { HeaderCell };
