import { Fragment, useContext, useRef } from "react";
import { useMutation } from "react-query";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import { CRUDContext } from "./context";
import { cacheWrapperKeyGen } from "cache";

interface DeleteFormDataType {
  serialNo?: string;
}

const DeleteFormDataFnWrapper = (deleteFormData) => async ({
  serialNo,
}: DeleteFormDataType) => {
  return deleteFormData(serialNo);
};

export const DeleteAction = ({ isDataChangedRef, closeDialog, serialNo }) => {
  const { deleteFormData } = useContext(CRUDContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(Object.values(deleteFormData.args));
  }

  const mutation = useMutation(
    DeleteFormDataFnWrapper(deleteFormData.fn(deleteFormData.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        closeDialog();
      },
    }
  );

  return (
    <Fragment key={wrapperKey.current}>
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete the selected Records
      </DialogTitle>
      {mutation.isLoading ? (
        <DialogContent>Deleting...</DialogContent>
      ) : mutation?.isError ? (
        <DialogContent>
          {mutation.error?.error_msg ?? "Unknown Error occured"}
        </DialogContent>
      ) : mutation.isSuccess ? (
        <DialogContent>All Records successfully deleted</DialogContent>
      ) : null}
      {mutation.isSuccess ? (
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button
            onClick={closeDialog}
            color="primary"
            disabled={mutation.isLoading}
          >
            Disagree
          </Button>
          <Button
            onClick={() => mutation.mutate({ serialNo })}
            color="primary"
            disabled={mutation.isLoading}
          >
            Agree
          </Button>
        </DialogActions>
      )}
    </Fragment>
  );
};
