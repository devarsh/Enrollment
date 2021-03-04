import { InitialValuesType } from "packages/form";

import {
  MetaDataType,
  GroupWiseRenderedFieldsType,
  FormRenderConfigType,
} from "../types";

export interface ViewFormWrapperProps {
  metaData: MetaDataType;
  formDisplayValues: InitialValuesType;
  hidden?: boolean;
  isSubmitting?: boolean;
  onAccept?: Function;
  onReject?: Function;
}

export interface FormProps {
  fields: GroupWiseRenderedFieldsType;
  formRenderConfig: FormRenderConfigType;
  classes?: any;
}
