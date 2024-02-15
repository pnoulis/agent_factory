import * as React from "react";

function useTable({
  data: initialData,
  rowId = "index",
  getComparator,
  sort,
  orderBy: defaultOrderBy = "",
  order: defaultOrder = "asc",
  rowsPerPage: initialRowsPerPage,
  fields,
} = {}) {
  const [order, setOrder] = React.useState(defaultOrder);
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    initialRowsPerPage ?? 10,
  );

  const data = React.useMemo(
    () =>
      initialData.map((d, i) => ({
        ...d,
        index: i + 1,
        selected: false,
      })),
    [initialData],
  );

  function handleChangeOrderBy(newOrderBy) {
    const isasc = orderBy === newOrderBy && order === "asc";
    setOrder(isasc ? "desc" : "asc");
    setOrderBy(newOrderBy);
  }

  function handlePageChange(e, newPage) {
    setPage(newPage);
  }

  function handleRowsPerPageChange(e) {
    setRowsPerPage(parseInt(e.target.value));
    setPage(0);
  }

  const sortedData = React.useMemo(
    () => sort?.(data, getComparator?.(order, orderBy)) || data,
    [order, orderBy],
  );

  function handleRowSelectAll(e) {
    for (let i = 0; i < data.length; i++) {
      data[i].selected = e.target.checked;
    }
    setSelected(e.target.checked ? data : []);
  }
  function handleRowSelect(row) {
    let selectedIndex = -1;
    for (let i = 0; i < selected.length; i++) {
      if (selected[i][rowId] === row[rowId]) {
        row.selected = false;
        selectedIndex = i;
        break;
      }
    }
    if (selectedIndex === -1) {
      row.selected = true;
      setSelected(selected.concat(row));
    } else if (selectedIndex === 0) {
      setSelected(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      setSelected(selected.slice(0, -1));
    } else {
      setSelected(
        selected
          .slice(0, selectedIndex)
          .concat(selected.slice(selectedIndex + 1)),
      );
    }
  }

  return {
    order,
    setOrder,
    orderBy,
    setOrderBy,
    fields,
    selected,
    setSelected,
    handleChangeOrderBy,
    sortedData,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    handleRowSelect,
    handleRowSelectAll,
    rowCount: data.length,
    rowSelectedCount: selected.length,
  };
}

export { useTable };
