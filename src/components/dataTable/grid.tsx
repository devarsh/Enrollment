import { useState, useEffect, useRef } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
  useRowSelect,
  useFilters,
  useColumnOrder,
  useAsyncDebounce,
} from "react-table";

import Paper from "@material-ui/core/Paper";
import { TableHeaderToolbar } from "./tableHeaderToolbar";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import { StickyTableHead } from "./stickyTableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { MyTableRow } from "./focusableTableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { TablePaginationActions } from "./tablePaginationToolbar";
import { TableHeaderFilterToolbar } from "./tableHeaderFilterToolbar";
import { TableActionToolbar, ActionContextMenu } from "./tableActionToolbar";

import LinearProgress from "@material-ui/core/LinearProgress";
import { LinearProgressBarSpacer } from "./linerProgressBarSpacer";

import { CustomBackdrop } from "./backdrop";
import { useCheckboxColumn } from "./components";
import { HeaderCellWrapper } from "./headerCellWrapper";
import { RowCellWrapper } from "./rowCellWrapper";
import { filterAction } from "./utils";

export const DataGrid = ({
  label,
  dense,
  localFilterManager,
  globalFiltersState,
  columns,
  defaultColumn,
  data,
  onFetchData,
  loading,
  getRowId,
  totalRecords: controlledTotalRecords,
  pageCount: controlledPageCount,
  pageSizes,
  defaultPageSize,
  defaultHiddenColumns,
  allowColumnReordering,
  allowColumnHiding,
  allowKeyboardNavigation,
  allowGlobalFilter,
  globalFilterMeta,
  setGridAction,
  multipleActions,
  singleActions,
  doubleClickAction,
  alwaysAvailableAction,
  gridRefresh,
  setGridRefresh,
}) => {
  //@ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    selectedFlatRows,
    gotoPage,
    setPageSize,
    state: tableState,
    setAllFilters,
    setSortBy,
    columns: availableColumns,
  } = useTable(
    {
      columns,
      defaultColumn,
      data,
      getRowId,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        hiddenColumns: defaultHiddenColumns,
      },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
      manualSortBy: true,
      autoResetSortBy: false,
      manualFilters: true,
      autoResetFilters: false,
      localFilterManager,
      globalFiltersState,
      allowColumnReordering: allowColumnReordering,
    },
    useColumnOrder,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    useCheckboxColumn
  );

  singleActions = filterAction(singleActions, selectedFlatRows);
  multipleActions = filterAction(multipleActions, selectedFlatRows);

  const { pageIndex, pageSize, sortBy, filters } = tableState;
  const onFetchDataDebounced = useAsyncDebounce(onFetchData, 500);

  const tbodyRef = useRef(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [contextMenuRow, setContextMenuRow] = useState<null | any>(null);
  const [contextMenuSelectedRowId, setContextMenuSelectedRowId] = useState<
    string | null
  >(null);
  const handleContextMenuClose = () => {
    setContextMenuRow(null);
    setContextMenuPosition(null);
    setContextMenuSelectedRowId(null);
  };
  const handleContextMenuOpen = (row) => (e) => {
    e.preventDefault();
    setContextMenuRow(row);
    setContextMenuSelectedRowId(row?.id);
    setContextMenuPosition(
      contextMenuPosition === null
        ? { mouseX: e.clientX - 2, mouseY: e.clientY - 4 }
        : null
    );
  };
  const handleRowDoubleClickAction = (row) => (e) => {
    e.preventDefault();
    let result = filterAction(doubleClickAction, [row], true);
    if (result === undefined) {
      return;
    }
    setGridAction({
      name: doubleClickAction.actionName,
      rows: [
        {
          data: row?.original,
          id: row?.id,
        },
      ],
    });
  };

  const handleKeyDown = (event, row) => {
    event.stopPropagation();
    //@ts-ignore
    const currentRow = tbodyRef.current?.children.namedItem(row.id);
    //@ts-ignore
    let rowToFocus;
    switch (event.keyCode) {
      case 38:
        rowToFocus = currentRow?.previousElementSibling;
        if (rowToFocus !== null) {
          rowToFocus?.focus();
          event.preventDefault();
          //@ts-ignore
          if (rowToFocus.offsetTop > tbodyRef.current?.offsetHeight) {
            console.log("need to scroll here");
          }
        }
        break;
      case 40:
        rowToFocus = currentRow?.nextElementSibling;
        if (rowToFocus !== null) {
          rowToFocus?.focus();
          event.preventDefault();
        }
        break;
      case 32:
        row.toggleRowSelected();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters });
  }, [onFetchDataDebounced, pageIndex, pageSize, sortBy, filters]);

  //remove dependencies other than gridRefresh if it causes issues -not checked code
  useEffect(() => {
    if (gridRefresh === true) {
      onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters });
      setGridRefresh(false);
    }
  }, [
    gridRefresh,
    setGridRefresh,
    onFetchDataDebounced,
    pageIndex,
    pageSize,
    sortBy,
    filters,
  ]);

  const handleChangePage = (_, newPage) => {
    gotoPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    setAllFilters([]);
    setSortBy([]);
    gotoPage(0);
    localFilterManager.clearFilterState();
  }, [
    globalFiltersState, //this is important do not remove
    setAllFilters,
    setSortBy,
    gotoPage,
    localFilterManager.clearFilterState,
  ]);

  return (
    <Paper
      style={{
        width: "100%",
      }}
    >
      <TableHeaderToolbar
        label={label}
        dense={dense}
        visibleColumns={availableColumns}
        defaultHiddenColumns={defaultHiddenColumns}
        allowColumnHiding={allowColumnHiding}
        setGridRefresh={setGridRefresh}
        alwaysAvailableAction={alwaysAvailableAction}
        setGridAction={setGridAction}
        selectedFlatRows={selectedFlatRows}
      />
      <TableActionToolbar
        dense={dense}
        selectedFlatRows={selectedFlatRows}
        multipleActions={multipleActions}
        singleActions={singleActions}
        alwaysAvailableAction={alwaysAvailableAction}
        setGridAction={setGridAction}
      />
      <ActionContextMenu
        selectedFlatRows={selectedFlatRows}
        contextMenuRow={contextMenuRow}
        multipleActions={multipleActions}
        singleActions={singleActions}
        setGridAction={setGridAction}
        mouseX={contextMenuPosition?.mouseX ?? null}
        mouseY={contextMenuPosition?.mouseY ?? null}
        handleClose={handleContextMenuClose}
      />
      {allowGlobalFilter ? (
        <TableHeaderFilterToolbar dense={dense} filters={globalFilterMeta} />
      ) : null}
      {loading ? <LinearProgress /> : <LinearProgressBarSpacer />}
      <TableContainer
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "auto",
          maxHeight: "calc(100vh - 35*8px)",
          minHeight: "40vh",
        }}
      >
        <Table
          component="div"
          {...getTableProps()}
          size={dense ? "small" : "medium"}
        >
          {/*@ts-ignore*/}
          <StickyTableHead component="div">
            {headerGroups.map((headerGroup) => {
              return (
                <TableRow
                  component="div"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => {
                    return (
                      <HeaderCellWrapper
                        column={column}
                        key={column.getHeaderProps().key}
                      >
                        {column.render("Header")}
                      </HeaderCellWrapper>
                    );
                  })}
                </TableRow>
              );
            })}
          </StickyTableHead>
          <TableBody
            component="div"
            ref={tbodyRef}
            {...getTableBodyProps([
              {
                style: {
                  display: "block",
                },
              },
            ])}
          >
            {page.length <= 0 && loading === false ? (
              <div
                style={{
                  height: "calc(100vh - 35*8px)",
                  width: "100%",
                  display: "flex",

                  alignItems: "center",
                }}
              >
                No data found
              </div>
            ) : null}
            {page.map((row, index) => {
              prepareRow(row);
              const rightClickHandler = handleContextMenuOpen(row);
              const thisRowDblClickHandler = handleRowDoubleClickAction(row);
              return (
                <MyTableRow
                  {...row.getRowProps()}
                  id={row.id}
                  tabIndex={0}
                  component="div"
                  selected={
                    row.isSelected || contextMenuSelectedRowId === row.id
                  }
                  onKeyDown={
                    allowKeyboardNavigation
                      ? (e) => handleKeyDown(e, row)
                      : undefined
                  }
                  onContextMenu={rightClickHandler}
                  onDoubleClick={
                    Boolean(doubleClickAction)
                      ? thisRowDblClickHandler
                      : undefined
                  }
                >
                  {row.cells.map((cell) => {
                    return (
                      <RowCellWrapper
                        key={cell.getCellProps().key}
                        cell={cell}
                        index={index}
                      >
                        {cell.render("Cell", { index: index })}
                      </RowCellWrapper>
                    );
                  })}
                </MyTableRow>
              );
            })}
          </TableBody>
        </Table>
        <CustomBackdrop open={loading} />
      </TableContainer>
      <TablePagination
        style={{ display: "flex" }}
        variant="body"
        component="div"
        rowsPerPageOptions={pageSizes}
        colSpan={3}
        count={controlledTotalRecords}
        rowsPerPage={Number(pageSize)}
        page={Number(pageIndex)}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
};
