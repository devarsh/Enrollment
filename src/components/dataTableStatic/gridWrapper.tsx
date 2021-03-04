import {
  useMemo,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  attachAlignmentProps,
  sortColumnsBySequence,
  extractHiddenColumns,
  SplitActions,
  attachCellComponentsToMetaData,
} from "components/dataTable/utils";
import {
  attachMethodsToMetaData,
  attachYupSchemaValidator,
  attachcombinedValidationFns,
} from "./utils";
import { GridMetaDataType, GridWrapperPropTypes } from "./types";
import { DefaultHeaderColumnRenderer } from "./components";
import { DataGrid } from "./grid";

export const GridWrapper = forwardRef<any, GridWrapperPropTypes>(
  (
    { finalMetaData, data, setData, actions, setAction, loading, gridProps },
    ref
  ) => {
    const metaDataRef = useRef<any>(null);
    if (metaDataRef.current === null) {
      metaDataRef.current = transformMetaData({
        metaData: finalMetaData,
        actions,
        setAction,
      });
    }
    let dataRef = useRef(data);
    dataRef.current = data;
    let metaData = metaDataRef.current;
    /* eslint-disable react-hooks/exhaustive-deps */
    const columns = useMemo(() => metaData.columns, []);
    const columnsValidator = useMemo(() => {
      return columns.reduce((accum, one) => {
        accum[one.accessor] = one.validation;
        return accum;
      }, {});
    }, [columns]);
    const columnsObj = useMemo(() => {
      return columns.reduce((accum, one) => {
        accum[one.accessor] = "";
        return accum;
      });
    }, [columns]);
    const defaultColumn = useMemo(
      () => ({
        width: 150,
        maxWidth: 200,
        minWidth: 50,
        Header: DefaultHeaderColumnRenderer,
        ...metaData?.gridConfig?.defaultColumnConfig,
      }),
      [metaData?.gridConfig?.defaultColumnConfig]
    );
    const getRowId = useCallback(
      (row) => row[metaData?.gridConfig?.rowIdColumn],
      [metaData?.gridConfig?.rowIdColumn]
    );

    const updateGridData = useCallback(
      (rowIndex, columnID, value, touched, error) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnID]: value,
                _touched: {
                  ...old?.[rowIndex]?.["_touched"],
                  [columnID]: touched,
                },
                _error: {
                  ...old?.[rowIndex]?.["_error"],
                  [columnID]: error,
                },
              };
            }
            return row;
          })
        );
      },
      [setData]
    );

    const stripValidationFromData = useCallback(() => {
      if (Array.isArray(dataRef.current)) {
        return dataRef.current.map((one) => {
          const { _touched, _error, _rowColor, ...others } = one;
          return others;
        });
      }
      return [];
    }, []);
    const validateData = useCallback(async () => {
      let isError = false;
      let keys = Object.keys(columnsValidator);
      if (!Array.isArray(dataRef.current)) {
        return { isValid: isError, data: [] };
      }
      let validatedData = dataRef.current.map(async (one) => {
        const touched = one["_touched"] ?? {};
        const error = one["_error"] ?? {};
        for (let i = 0; i < keys.length; i++) {
          const columnTouched = touched[keys[i]];
          const columnError = error[keys[i]];
          const columnValue = one[keys[i]];
          const columnValidator = columnsValidator[keys[i]];
          if (Boolean(columnTouched)) {
            if (Boolean(columnError)) {
              isError = true;
            } else {
              continue;
            }
          } else {
            if (typeof columnValidator === "function") {
              let validationResult = await columnValidator(columnValue);
              if (Boolean(validationResult)) {
                isError = true;
              }
              touched[keys[i]] = true;
              error[keys[i]] = validationResult;
            }
          }
        }
        return { ...one, _touched: touched, _error: error };
      });
      let result = await Promise.all(validatedData);
      return { hasError: isError, data: result };
    }, []);

    useImperativeHandle(ref, () => ({
      validate: () => validateData(),
      cleanData: () => stripValidationFromData(),
      columns: columnsObj,
    }));
    if (!Array.isArray(data)) {
      return <div>Invalid data received</div>;
    }
    return (
      <DataGrid
        label={metaData.gridConfig?.gridLabel ?? "NO_NAME"}
        dense={true}
        getRowId={getRowId}
        columns={columns}
        defaultColumn={defaultColumn}
        data={data}
        loading={loading}
        allowColumnReordering={metaData.gridConfig?.allowColumnReordering}
        disableSorting={metaData?.gridConfig?.disableSorting}
        defaultHiddenColumns={metaData.hiddenColumns}
        multipleActions={metaData?.multipleActions}
        singleActions={metaData?.singleActions}
        doubleClickAction={metaData?.doubleClickAction}
        alwaysAvailableAction={metaData?.alwaysAvailableAction}
        setGridAction={metaData?.setAction}
        updateGridData={updateGridData}
        hideFooter={metaData?.gridConfig?.hideFooter}
        hideHeader={metaData?.gridConfig?.hideHeader}
        containerHeight={metaData?.gridConfig?.containerHeight}
        disableRowSelect={metaData?.gridConfig?.disableRowSelect}
        disableGlobalFilter={metaData?.gridConfig?.disableGlobalFilter}
        disableGroupBy={metaData?.gridConfig?.disableGroupBy}
        disableLoader={metaData?.gridConfig?.disableLoader}
        pageSizes={metaData?.gridConfig?.pageSizes ?? [5, 10]}
        defaultPageSize={metaData?.gridConfig?.defaultPageSize ?? 10}
        enablePagination={metaData?.gridConfig?.enablePagination ?? false}
        gridProps={gridProps}
      />
    );
  }
);

GridWrapper.displayName = "GridWrapper";

const transformMetaData = ({
  metaData: freshMetaData,
  actions,
  setAction,
}): GridMetaDataType => {
  let metaData = JSON.parse(JSON.stringify(freshMetaData)) as GridMetaDataType;
  let newMetaData = attachMethodsToMetaData(metaData as GridMetaDataType);
  let columns = newMetaData.columns as any;
  const hiddenColumns = extractHiddenColumns(columns);
  //make sure extract functions are called before attach and lastly sort
  columns = attachYupSchemaValidator(columns);
  columns = attachCellComponentsToMetaData(columns);
  columns = attachAlignmentProps(columns);
  //call this function after attaching yup schema and methods to metaData
  columns = attachcombinedValidationFns(columns);
  columns = sortColumnsBySequence(columns);
  const splittedActions = SplitActions(actions ?? null);
  return {
    hiddenColumns: hiddenColumns,
    columns: columns,
    gridConfig: metaData.gridConfig,
    setAction: setAction,
    ...splittedActions,
  };
};
