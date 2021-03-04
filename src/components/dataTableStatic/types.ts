import { ActionTypes } from "components/dataTable/types";
import { CellComponentType } from "components/tableCellComponents";

export interface GridColumnType {
  columnName: string;
  accessor: string;
  sequence: number;
  componentType: CellComponentType;
  Cell?: any;
  alignment?: string;
  TableCellProps?: any;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  sortDescFirst?: boolean;
  dateFormat?: string;
  isVisible?: boolean;
  validation?: any;
  schemaValidation?: YupSchemaMetaDataType;
  options?: any;
  isPassword?: boolean;
  disableCachingOptions?: boolean;
}

export interface GridConfigType {
  dense?: boolean;
  gridLabel: string;
  rowIdColumn: string;
  defaultColumnConfig: {
    width?: number;
    maxWidth?: number;
    minWidth?: number;
  };
  disableSorting?: boolean;
  allowColumnReordering?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  containerHeight?: {
    min: string;
    max: string;
  };
  pageSizes?: number[];
  defaultPageSize?: number;
  disableRowSelect?: boolean;
  enablePagination?: boolean;
  disableGlobalFilter?: boolean;
  disableGroupBy?: boolean;
  disableLoader?: boolean;
}

export interface GridMetaDataType {
  columns: GridColumnType[];
  hiddenColumns?: string[];
  gridConfig: GridConfigType;
  actions?: ActionTypes[];
  setAction?: any;
}

export interface GridWrapperPropTypes {
  finalMetaData: GridMetaDataType;
  data: any;
  setData: any;
  actions?: ActionTypes[];
  setAction?: any;
  loading?: any;
  gridProps?: any;
}

export interface YupSchemaMetaDataType {
  type: "string" | "number" | "boolean" | "date";
  rules?: YupRulesType[];
}

interface YupRulesType {
  name: string;
  params: any[];
}
