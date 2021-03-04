import { GridMetaDataType, GridColumnType } from "components/dataTableStatic";

//Listing Grid
export const gridMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "File Name",
      componentType: "default",
      accessor: "fileName",
      sequence: 1,
      alignment: "left",
      width: 300,
      maxWidth: 300,
      minWidth: 100,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
    },
    {
      columnName: "Uploaded Date",
      componentType: "date",
      accessor: "uploadDate",
      sequence: 2,
      alignment: "left",
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      columnName: "Verification",
      componentType: "default",
      accessor: "status",
      sequence: 3,
      alignment: "left",
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      columnName: "Financial Year",
      componentType: "default",
      accessor: "finYear",
      sequence: 4,
      alignment: "left",
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      columnName: "Document Type",
      componentType: "default",
      accessor: "docType",
      sequence: 5,
      alignment: "left",
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      columnName: "Remarks",
      componentType: "default",
      accessor: "remarks",
      sequence: 6,
      alignment: "left",
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "ITR Statement",
    rowIdColumn: "docUUID",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: false,
    disableGlobalFilter: false,
    disableGroupBy: false,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
    enablePagination: true,
  },
};

//upload Grid Additional fields
export const columnsMetaData: GridColumnType[] = [
  {
    columnName: "Financial Year",
    componentType: "editableNumberFormat",
    accessor: "finYear",
    sequence: 5,
    alignment: "left",
    //@ts-ignore
    FormatProps: {
      format: "####",
      placeholder: "YYYY",
      mask: ["Y", "Y", "Y", "Y"],
    },
    schemaValidation: {
      type: "string",
      rules: [{ name: "required", params: ["required"] }],
    },
  },
  {
    columnName: "Document Type",
    componentType: "editableSelect",
    accessor: "docTypeID",
    sequence: 6,
    alignment: "left",
    options: "getITRDocType",
    schemaValidation: {
      type: "string",
      rules: [{ name: "required", params: ["required"] }],
    },
  },
  {
    columnName: "Password",
    componentType: "editableTextField",
    accessor: "password",
    sequence: 7,
    alignment: "left",
    isPassword: true,
  },
  {
    columnName: "Remarks",
    componentType: "editableTextField",
    accessor: "remarks",
    sequence: 8,
    alignment: "left",
    isVisible: false,
  },
];

//edit grid
export const gridEditMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "File Name",
      componentType: "default",
      accessor: "fileName",
      sequence: 1,
      alignment: "left",
      width: 300,
      maxWidth: 300,
      minWidth: 100,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
    },
    {
      columnName: "Financial Year",
      componentType: "editableNumberFormat",
      accessor: "finYear",
      sequence: 5,
      alignment: "left",
      //@ts-ignore
      FormatProps: {
        format: "####",
        placeholder: "YYYY",
        mask: ["Y", "Y", "Y", "Y"],
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["required"] }],
      },
    },
    {
      columnName: "Document Type",
      componentType: "editableSelect",
      accessor: "docTypeID",
      sequence: 5,
      alignment: "left",
      options: "getBankDocType",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["required"] }],
      },
    },
    {
      columnName: "Password",
      componentType: "editableTextField",
      accessor: "password",
      sequence: 6,
      alignment: "left",
      isPassword: true,
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "ITR Document Update",
    rowIdColumn: "docUUID",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: true,
    disableGlobalFilter: true,
    disableGroupBy: true,
    containerHeight: {
      min: "30vh",
      max: "30vh",
    },
    hideFooter: true,
    hideHeader: true,
    disableLoader: true,
    enablePagination: false,
  },
};
