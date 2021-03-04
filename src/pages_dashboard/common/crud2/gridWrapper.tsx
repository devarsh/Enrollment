import {
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import GridWrapper from "components/dataTableStatic";
import { useQueries } from "react-query";
import { ClearCacheContext } from "cache";
import { ActionTypes, GridMetaDataType } from "components/dataTable";
import { CRUDContext } from "./context";
import { cacheWrapperKeyGen } from "cache";
import loaderGif from "assets/images/loader.gif";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
};

export const MyGridWrapper = forwardRef<any, GridWrapperType>(
  ({ actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const { getGridFormData, getGridFormMetaData, context } = useContext(
      CRUDContext
    );
    const wrapperKey = useRef<any>(null);
    if (wrapperKey.current === null) {
      wrapperKey.current = cacheWrapperKeyGen(
        Object.values(getGridFormData.args)
      );
    }
    const result = useQueries([
      {
        queryKey: ["getGridFormMetaData", wrapperKey.current],
        queryFn: () => getGridFormMetaData.fn(getGridFormMetaData.args)(),
        cacheTime: 100000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
      {
        queryKey: ["getStaticGridData", wrapperKey.current],
        queryFn: () => getGridFormData.fn(getGridFormData.args)(),
        cacheTime: 100000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    ]);
    useEffect(() => {
      removeCache?.addEntry(["getStaticGridData", wrapperKey.current]);
      removeCache?.addEntry(["getGridFormMetaData", wrapperKey.current]);
    }, [removeCache]);
    useImperativeHandle(ref, () => ({
      refetch: () => result[1].refetch(),
    }));
    const loading =
      result[0].isLoading ||
      result[1].isLoading ||
      result[0].isFetching ||
      result[1].isFetching;
    let isError = result[0].isError || result[1].isError;
    //@ts-ignore
    let errorMsg = `${result[0].error?.error_msg} ${result[0].error?.error_msg}`
      .trimStart()
      .trimEnd();
    errorMsg = !Boolean(errorMsg) ? "unknown error occured" : errorMsg;
    const renderResult = loading ? (
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
    ) : isError === true ? (
      <span>{errorMsg}</span>
    ) : (
      <GridWrapper
        key={`staticGridData-${wrapperKey.current}`}
        finalMetaData={result[0].data as GridMetaDataType}
        data={result[1].data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setAction}
        loading={loading}
        gridProps={context}
      />
    );
    return renderResult;
  }
);
MyGridWrapper.displayName = "MyGridWrapper";
