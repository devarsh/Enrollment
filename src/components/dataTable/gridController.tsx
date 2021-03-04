import { FC, useState, useMemo, useCallback, useRef, useContext } from "react";
import { GridMetaDataType } from "./types";
import { formatSortBy, formatFilterBy, useLocalFilterState } from "./utils";
import { useRecoilValue } from "recoil";
import { filtersAtom } from "./atoms";
import { GridContext } from "./context";

import { DefaultHeaderColumnRenderer } from "./components";
import { DataGrid } from "./grid";

export const GirdController: FC<{
  metaData: GridMetaDataType;
  gridRefresh: boolean;
  setGridRefresh: any;
}> = ({ metaData, gridRefresh, setGridRefresh }) => {
  const context = useContext(GridContext);
  /* eslint-disable react-hooks/exhaustive-deps */
  const columns = useMemo(() => metaData.columns, []);
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      maxWidth: 400,
      minWidth: 50,
      Header: DefaultHeaderColumnRenderer,
    }),
    []
  );
  const getRowId = useCallback(
    (row) => row[metaData?.gridConfig?.rowIdColumn],
    [metaData?.gridConfig?.rowIdColumn]
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdCounterRef = useRef(0);
  const localFilterManager = useLocalFilterState();
  const globalFiltersState = useRecoilValue(
    filtersAtom(context?.gridCode ?? "noCode")
  );

  const fetchData = useCallback(
    ({ pageSize, pageIndex, sortBy, filters }) => {
      setLoading(true);
      const currentFetchId = ++fetchIdCounterRef.current;
      const startRow = Number(pageSize) * Number(pageIndex) + 1;
      const endRow = Number(startRow) + Number(pageSize) - 1;
      let localFilters = formatFilterBy(filters);
      let headerFilters: any[] = [];
      if (globalFiltersState !== null) {
        headerFilters = Object.values(globalFiltersState);
      }
      let combinedFilters = [...headerFilters, ...localFilters];

      context
        ?.getGridData(startRow, endRow, formatSortBy(sortBy), combinedFilters)
        .then((result) => {
          if (currentFetchId === fetchIdCounterRef.current) {
            if (result.status === "success") {
              setData(result?.data?.rows ?? []);
              setPageCount(
                Math.ceil(
                  Number(result?.data?.total_count ?? 1) / Number(pageSize)
                )
              );
              setTotalRecords(Number(result?.data?.total_count ?? 1));
              setLoading(false);
            } else {
              setLoading(false);
            }
          }
        });
    },
    [setTotalRecords, setLoading, setData, globalFiltersState, context]
  );

  return (
    <DataGrid
      label={metaData.gridConfig?.gridLabel ?? "NO_NAME"}
      globalFilterMeta={metaData?.headerFilters}
      multipleActions={metaData?.multipleActions}
      singleActions={metaData?.singleActions}
      doubleClickAction={metaData?.doubleClickAction}
      alwaysAvailableAction={metaData?.alwaysAvailableAction}
      setGridAction={metaData?.setAction}
      dense={true}
      localFilterManager={localFilterManager}
      globalFiltersState={globalFiltersState}
      getRowId={getRowId}
      columns={columns}
      defaultColumn={defaultColumn}
      defaultHiddenColumns={metaData.hiddenColumns}
      loading={loading}
      data={data}
      onFetchData={fetchData}
      gridRefresh={gridRefresh}
      setGridRefresh={setGridRefresh}
      pageCount={pageCount}
      totalRecords={totalRecords}
      pageSizes={metaData.gridConfig?.pageSize ?? 10}
      defaultPageSize={metaData.gridConfig?.defaultPageSize ?? [5, 10]}
      allowColumnReordering={
        metaData.gridConfig?.allowColumnReordering ?? false
      }
      allowColumnHiding={metaData.gridConfig?.allowColumnHiding ?? false}
      allowKeyboardNavigation={
        metaData.gridConfig?.allowKeyboardNavigation ?? false
      }
      allowGlobalFilter={metaData.gridConfig?.allowGlobalFilter ?? false}
    />
  );
};
