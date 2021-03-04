import { GridMetaDataType } from "components/dataTableStatic";

const failedFilesMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "File ID",
      componentType: "default",
      accessor: "id",
      sequence: 0,
      alignment: "left",
      isVisible: false,
    },
    {
      columnName: "File Name",
      componentType: "default",
      accessor: "name",
      sequence: 1,
      alignment: "left",
      width: 400,
      maxWidth: 400,
      minWidth: 400,
    },
    {
      columnName: "Size",
      componentType: "default",
      accessor: "sizeStr",
      sequence: 2,
      alignment: "left",
      width: 100,
      maxWidth: 100,
      minWidth: 100,
    },
    {
      columnName: "Type",
      componentType: "default",
      accessor: "fileExt",
      sequence: 3,
      alignment: "left",
      width: 100,
      maxWidth: 100,
      minWidth: 100,
    },
    {
      columnName: "Reason",
      componentType: "default",
      accessor: "failedReason",
      sequence: 4,
      alignment: "left",
      width: 300,
      maxWidth: 300,
      minWidth: 300,
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Failed To Add These Files For Upload",
    rowIdColumn: "id",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableRowSelect: true,
    disableGlobalFilter: true,
    disableSorting: true,
    disableGroupBy: true,
    hideHeader: true,
  },
};

export default failedFilesMetaData;
