import { useState, FC } from "react";
import { FormViewEdit } from "./formViewEdit";
import { FormNewExistsIfNotCreate } from "./formNewExistIfNotCreate";

export const SimpleCRUD: FC<{
  isDataChangedRef: any;
  dataAlwaysExists: any;
  closeDialog?: any;
}> = ({ isDataChangedRef, closeDialog, dataAlwaysExists }) => {
  const [dataExist, setDataExist] = useState(Boolean(dataAlwaysExists));

  return dataExist ? (
    <FormViewEdit
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
    />
  ) : (
    <FormNewExistsIfNotCreate
      isDataChangedRef={isDataChangedRef}
      successAction={() => setDataExist(true)}
    />
  );
};
