import { FC, useContext, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { useMutation, useQuery } from "react-query";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { cacheWrapperKeyGen, ClearCacheContext } from "cache";
import loaderGif from "assets/images/loader.gif";
import { CRUDContext } from "./context";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (insertFormData) => async ({
  data,
}: InsertFormDataFnType) => {
  return insertFormData(data);
};

export const FormNew: FC<{
  isDataChangedRef: any;
  successAction: any;
  cancelAction: any;
}> = ({ isDataChangedRef, successAction, cancelAction }) => {
  const { insertFormData, getFormMetaData, context } = useContext(CRUDContext);
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(Object.values(insertFormData.args));
  }
  const mutation = useMutation(
    insertFormDataFnWrapper(insertFormData.fn(insertFormData.args)),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg);
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("Data is successfully saved with", {
          variant: "success",
        });
        if (typeof successAction === "function") {
          successAction();
        }
      },
    }
  );
  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    mutation.mutate({
      data,
      displayData,
      endSubmit,
      setFieldError,
    });
  };
  useEffect(() => {
    removeCache?.addEntry(["getFormMetaData", wrapperKey.current, "new"]);
  }, [removeCache]);
  const result = useQuery(["getFormMetaData", wrapperKey.current, "new"], () =>
    getFormMetaData.fn(getFormMetaData.args)("new")
  );
  const dataUniqueKey = result.dataUpdatedAt;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? "unknown error occured"}`;
  let newMetaData = {} as MetaDataType;
  if (result.isSuccess) {
    newMetaData = JSON.parse(JSON.stringify(result.data)) as MetaDataType;
    newMetaData = result.data as MetaDataType;
    newMetaData.form.formState = {
      ...context,
      formCode: newMetaData?.form?.name,
    };
    newMetaData.form.name = `${newMetaData.form.name}-New`;
    if (newMetaData?.form?.render?.renderType === "stepper") {
      newMetaData.form.render.renderType = "tabs";
    }
  }
  if (loading === false && isError === false) {
    // isError = !isMetaDataValid(metaData);
    if (isError === false) {
    } else {
      errorMsg = "Error loading form";
    }
  }

  const renderResult = loading ? (
    <>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof cancelAction === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={cancelAction}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : isError === true ? (
    <>
      <span>{errorMsg}</span>
      {typeof cancelAction === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={cancelAction}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : (
    <FormWrapper
      key={`${wrapperKey.current}-${dataUniqueKey}-new`}
      metaData={newMetaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Save
            </Button>
            <Button onClick={cancelAction} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
  return renderResult;
};
