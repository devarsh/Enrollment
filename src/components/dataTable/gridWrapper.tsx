import { FC, useCallback } from "react";
import { GridMetaDataType, ActionTypes } from "./types";
import {
  attachCellComponentsToMetaData,
  attachFilterComponentToMetaData,
  attachAlignmentProps,
  extractHiddenColumns,
  sortColumnsBySequence,
  transformHeaderFilters,
  SplitActions,
} from "./utils";
import { GirdController } from "./gridController";
import { GridProvider } from "./context";

export const GridWrapper: FC<{
  gridCode: any;
  getGridData: any;
  getGridColumnFilterData: any;
  metaData: GridMetaDataType;
  actions?: ActionTypes[];
  setAction: any;
  gridRefresh?: boolean;
  setGridRefresh?: any;
}> = ({
  gridCode,
  getGridColumnFilterData,
  getGridData,
  metaData,
  actions,
  setAction,
  gridRefresh = false,
  setGridRefresh = () => false,
}) => {
  let finalData = transformMetaData({
    metaData,
    actions,
    setAction,
  });
  //We dont know if setGridRefresh is memozied or not
  /*eslint-disable react-hooks/exhaustive-deps*/
  setGridRefresh = useCallback(setGridRefresh, []);
  return (
    <GridProvider
      gridCode={gridCode}
      getGridData={getGridData}
      getGridColumnFilterData={getGridColumnFilterData}
    >
      <GirdController
        metaData={finalData as GridMetaDataType}
        gridRefresh={gridRefresh}
        setGridRefresh={setGridRefresh}
      />
    </GridProvider>
  );
};

const transformMetaData = ({
  metaData: freshMetaData,
  actions,
  setAction,
}): GridMetaDataType => {
  let metaData = JSON.parse(JSON.stringify(freshMetaData)) as GridMetaDataType;

  let columns = metaData.columns as any;
  //make sure extract functions are called before attach and lastly sort
  const hiddenColumns = extractHiddenColumns(columns);
  columns = attachCellComponentsToMetaData(columns);
  columns = attachFilterComponentToMetaData(columns);
  columns = attachAlignmentProps(columns);
  columns = sortColumnsBySequence(columns);
  let headerFilters = transformHeaderFilters(metaData?.headerFilters);
  const splittedActions = SplitActions(actions ?? null);
  return {
    columns: columns,
    gridConfig: metaData.gridConfig,
    hiddenColumns: hiddenColumns,
    headerFilters: headerFilters,
    setAction: setAction,
    ...splittedActions,
  };
};
