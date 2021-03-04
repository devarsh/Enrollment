import { useContext, useEffect } from "react";
import { FileUploadControl } from "components/fileUpload";
import { useQuery } from "react-query";
import { DOCCRUDContext } from "./context";
import { ClearCacheContext } from "cache";
import loaderGif from "assets/images/loader.gif";
import { useSnackbar } from "notistack";

export const UploadDocumentsApiWrapper = ({
  onClose,
  editableFileName,
  dataChangedRef,
}) => {
  const {
    uploadDocuments,
    getDocumentUploadAddtionalFieldsMetaData,
    context,
  } = useContext(DOCCRUDContext);
  const removeCache = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const closeWrapper = () => {
    if (dataChangedRef.current === true) {
      enqueueSnackbar("Documents Successfully uploaded", {
        variant: "success",
      });
    }
    onClose();
  };

  useEffect(() => {
    removeCache?.addEntry([
      "getDocumentUploadAddtionalFieldsMetaData",
      context.moduleType,
      context.docCategory,
    ]);
  }, [context, removeCache]);
  const query = useQuery(
    [
      "getDocumentUploadAddtionalFieldsMetaData",
      context.moduleType,
      context.docCategory,
    ],
    () =>
      getDocumentUploadAddtionalFieldsMetaData.fn(
        getDocumentUploadAddtionalFieldsMetaData.args
      )
  );
  //@ts-ignore
  let error = `${query.error?.error_msg ?? "unknown message"}`;
  const renderResult = query.isLoading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : query.isError === true ? (
    <span>{error}</span>
  ) : (
    <FileUploadControl
      onClose={closeWrapper}
      additionalColumns={query.data}
      editableFileName={editableFileName}
      dataChangedRef={dataChangedRef}
      onUpload={uploadDocuments.fn(uploadDocuments.args)}
      gridProps={context}
    />
  );
  return renderResult;
};
