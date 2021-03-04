import { useContext, useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import GridWrapper from "components/dataTableStatic";
import { ClearCacheContext } from "cache";
import { DOCCRUDContext } from "./context";
import loaderGif from "assets/images/loader.gif";
import { useSnackbar } from "notistack";

interface DeleteFormDataType {
  data?: any;
}

const updateDocumentDataFnWrapper = (updateDocuments) => async ({
  data,
}: DeleteFormDataType) => {
  return updateDocuments(data);
};

export const UpdateDocumentData = ({
  row: { data, id },
  closeDialog,
  dataChangedRef,
}) => {
  const [gridData, setGridData] = useState(Array.isArray(data) ? data : [data]);
  const { updateDocument, getDocumentEditGridMetaData, context } = useContext(
    DOCCRUDContext
  );
  const removeCache = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const gridRef = useRef<any>(null);
  useEffect(() => {
    removeCache?.addEntry([
      "getDocumentEditGridMetaData",
      context.moduleType,
      context.docCategory,
    ]);
  }, [removeCache, context]);
  const query = useQuery(
    ["getDocumentEditGridMetaData", context.moduleType, context.docCategory],
    () => getDocumentEditGridMetaData.fn(getDocumentEditGridMetaData.args)
  );

  const mutation = useMutation(
    updateDocumentDataFnWrapper(updateDocument.fn(updateDocument.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        dataChangedRef.current = true;
        enqueueSnackbar("Document changes successful", { variant: "success" });
        closeDialog();
      },
    }
  );

  const sendDataForUpdate = async () => {
    let { hasError, data } = await gridRef?.current?.validate?.();
    if (hasError === true) {
      setGridData(data);
    } else {
      let result = gridRef?.current?.cleanData?.();
      await mutation.mutate({ data: result });
    }
  };
  //@ts-ignore
  let error = `${query.error?.error_msg ?? "unknown message"}`;

  const renderResult = query.isLoading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : query.isError === true ? (
    <span>{error}</span>
  ) : (
    <>
      {mutation.isError ? (
        <Alert severity="error">
          {mutation?.error?.error_msg ?? "Unknown Error occured"}
        </Alert>
      ) : null}
      {mutation.isLoading ? <LinearProgress variant={"indeterminate"} /> : null}
      <DialogTitle id="alert-dialog-title">Update Documents</DialogTitle>
      <DialogContent>
        <GridWrapper
          key={`listingDocumentsForUpdate`}
          data={gridData ?? []}
          finalMetaData={query.data}
          setData={setGridData}
          gridProps={context}
          ref={gridRef}
          loading={mutation.isLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDialog}
          color="primary"
          disabled={mutation.isLoading}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={sendDataForUpdate}
          disabled={mutation.isLoading}
        >
          Update
        </Button>
      </DialogActions>
    </>
  );
  return renderResult;
};
