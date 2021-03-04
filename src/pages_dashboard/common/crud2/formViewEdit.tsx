import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import loaderGif from "assets/images/loader.gif";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { SubmitFnType, InitialValuesType } from "packages/form";
import { useMutation, useQueries } from "react-query";
import { queryClient } from "cache";
import { ClearCacheContext } from "cache";
import { CRUDContext } from "./context";
import { cacheWrapperKeyGen } from "cache";
import { useSnackbar } from "notistack";

interface updateFormDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  serialNo?: string;
}

const updateFormDataWrapperFn = (updateFormData) => async ({
  data,
  serialNo,
}: updateFormDataType) => {
  return updateFormData(data, serialNo);
};

export const FormViewEdit: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "view" | "edit";
  serialNo?: string; //need to find another way to pass it (its a little hardcoded)
}> = ({
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  serialNo = "1",
}) => {
  const { updateFormData, getFormData, getFormMetaData, context } = useContext(
    CRUDContext
  );
  const removeCache = useContext(ClearCacheContext);
  const [formMode, setFormMode] = useState(defaultView);
  const { enqueueSnackbar } = useSnackbar();
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(Object.values(getFormData.args));
  }
  const mutation = useMutation(
    updateFormDataWrapperFn(updateFormData.fn(updateFormData.args)),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg);
      },
      onSuccess: (data, { serialNo }) => {
        queryClient.refetchQueries([
          "getFormData",
          wrapperKey.current,
          serialNo,
        ]);
        enqueueSnackbar("Data changes successfully saved", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        moveToViewMode();
        if (typeof closeDialog === "function") {
          closeDialog();
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
      serialNo,
    });
  };

  useEffect(() => {
    removeCache?.addEntry(["getFormData", wrapperKey.current, serialNo]);
    removeCache?.addEntry(["getFormMetaData", wrapperKey.current, "view"]);
    removeCache?.addEntry(["getFormMetaData", wrapperKey.current, "edit"]);
  }, [removeCache, serialNo]);

  const result = useQueries([
    {
      queryKey: ["getFormData", wrapperKey.current, serialNo],
      queryFn: () => getFormData.fn(getFormData.args)(serialNo),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["getFormMetaData", wrapperKey.current, "view"],
      queryFn: () => getFormMetaData.fn(getFormMetaData.args)("view"),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["getFormMetaData", wrapperKey.current, "edit"],
      queryFn: () => getFormMetaData.fn(getFormMetaData.args)("edit"),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  ]);

  const dataUniqueKey = `${result[0].dataUpdatedAt}`;
  const loading =
    result[0].isLoading ||
    result[1].isLoading ||
    result[2].isLoading ||
    result[0].isFetching ||
    result[1].isFetching ||
    result[2].isFetching;
  let isError = result[0].isError || result[1].isError || result[2].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg ?? "Unknown error occured"} ${
    //@ts-ignore
    result[1].error?.error_msg ?? "Unknown error occured"
  }${
    //@ts-ignore
    result[2].error?.error_msg ?? "Unknown error occured"
  }`;

  let formEditData = result[0].data;
  if (loading === false && isError === false) {
    // isError = !isMetaDataValid(metaData);
    if (isError === false) {
    } else {
      errorMsg = "Error loading form";
    }
  }
  let editMetaData: MetaDataType = {} as MetaDataType;
  let viewMetaData: MetaDataType = {} as MetaDataType;

  if (result[1].isSuccess && result[2].isSuccess && result[0].isSuccess) {
    editMetaData = JSON.parse(JSON.stringify(result[2].data)) as MetaDataType;
    viewMetaData = JSON.parse(JSON.stringify(result[1].data)) as MetaDataType;
    editMetaData.form.formState = {
      ...context,
      serialNo,
      formCode: editMetaData.form.name,
    };
    editMetaData.form.name = `${editMetaData.form.name}-edit`;
    if (editMetaData?.form?.render?.renderType === "stepper") {
      editMetaData.form.render.renderType = "tabs";
    }
    viewMetaData.form.formState = {
      ...context,
      serialNo,
      formCode: viewMetaData.form.name,
    };
    viewMetaData.form.name = `${viewMetaData.form.name}-view`;
    if (viewMetaData?.form?.render?.renderType === "stepper") {
      viewMetaData.form.render.renderType = "tabs";
    }
  }

  const renderResult = loading ? (
    <>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : isError === true ? (
    <>
      <span>{errorMsg}</span>
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : formMode === "view" ? (
    <FormWrapper
      key={`${wrapperKey.current}-${dataUniqueKey}-${formMode}`}
      metaData={viewMetaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
      disableGroupErrorDetection={false}
      disableGroupExclude={true}
    >
      <Button onClick={moveToEditMode}>Edit</Button>
      {typeof closeDialog === "function" ? (
        <Button onClick={closeDialog}>Cancel</Button>
      ) : null}
    </FormWrapper>
  ) : formMode === "edit" ? (
    <FormWrapper
      key={`${wrapperKey.current}-${dataUniqueKey}-${formMode}`}
      metaData={editMetaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
      disableGroupErrorDetection={false}
      disableGroupExclude={true}
    >
      {({ isSubmitting, handleSubmit }) => (
        <>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            Save
          </Button>
          <Button onClick={moveToViewMode} disabled={isSubmitting}>
            Cancel
          </Button>
        </>
      )}
    </FormWrapper>
  ) : null;
  return renderResult;
};
