import { Fragment, useContext, useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "react-query";
import { DOCCRUDContext } from "./context";
import { useSnackbar } from "notistack";

interface VerifyFormDataType {
  docUUID?: string;
  remarks?: string;
}

const ConfirmDocumentDataFnWrapper = (verifyDocuments) => async ({
  docUUID,
  remarks,
}: VerifyFormDataType) => {
  return verifyDocuments(docUUID, remarks, "Verify");
};
const RejectDocumentDataFnWrapper = (verifyDocuments) => async ({
  docUUID,
  remarks,
}: VerifyFormDataType) => {
  return verifyDocuments(docUUID, remarks, "Rejected");
};

export const VerifyDocumentAction = ({
  dataChangedRef,
  closeDialog,
  docUUID,
}) => {
  const { verifyDocuments } = useContext(DOCCRUDContext);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const verifyMutation = useMutation(
    ConfirmDocumentDataFnWrapper(verifyDocuments.fn(verifyDocuments.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        dataChangedRef.current = true;
        enqueueSnackbar("Documents Successfully verified", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );
  const rejectMutation = useMutation(
    RejectDocumentDataFnWrapper(verifyDocuments.fn(verifyDocuments.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        dataChangedRef.current = true;
        enqueueSnackbar("Documents Successfully Rejected", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );
  const isError = rejectMutation.isError || verifyMutation.isError;
  const isLoading = rejectMutation.isLoading || verifyMutation.isLoading;
  let errorMsg = `${rejectMutation?.error?.error_msg ?? ""} ${
    verifyMutation?.error?.errorMsg ?? ""
  }`;
  errorMsg = Boolean(errorMsg.trimEnd().trimStart())
    ? errorMsg
    : "unknown error occured";

  return (
    <Fragment>
      {isLoading ? <LinearProgress variant={"indeterminate"} /> : null}
      {isError ? <Alert severity="error">{errorMsg}</Alert> : null}
      <DialogTitle id="alert-dialog-title">Document Verification</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setRemarks(e.target.value)}
          multiline={true}
          rows={4}
          rowsMax={4}
          error={Boolean(error)}
          helperText={error}
          fullWidth={true}
          label="Remarks"
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            if (Boolean(remarks)) {
              verifyMutation.mutate({ docUUID, remarks });
            } else {
              setError("This is a required field");
            }
          }}
          disabled={isLoading}
        >
          Verify
        </Button>
        <Button
          color="primary"
          onClick={() => {
            if (Boolean(remarks)) {
              rejectMutation.mutate({ docUUID, remarks });
            } else {
              setError("This is a required filed");
            }
          }}
          disabled={isLoading}
        >
          Reject
        </Button>
      </DialogActions>
    </Fragment>
  );
};
