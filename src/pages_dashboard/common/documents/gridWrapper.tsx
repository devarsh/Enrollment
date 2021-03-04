import {
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import GridWrapper from "components/dataTableStatic";
import { useQueries } from "react-query";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import { ActionTypes, GridMetaDataType } from "components/dataTable";
import { DOCCRUDContext } from "./context";
import loaderGif from "assets/images/loader.gif";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
};

export const MyGridWrapper = forwardRef<any, GridWrapperType>(
  ({ actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const {
      getDocumentsGridData,
      getDocumentListingGridMetaData,
      context,
    } = useContext(DOCCRUDContext);
    const wrapperKey = useRef<any>(null);
    if (wrapperKey.current === null) {
      wrapperKey.current = cacheWrapperKeyGen(
        Object.values(getDocumentsGridData.args)
      );
    }
    useEffect(() => {
      removeCache?.addEntry([
        "getDocumentListingGridMetaData",
        context.refID,
        context.docCategory,
      ]);
      removeCache?.addEntry(["getDocumentsGridData", wrapperKey.current]);
    }, [removeCache, context]);

    useImperativeHandle(ref, () => ({
      refetch: () => result[0].refetch(),
    }));

    const result = useQueries([
      {
        queryKey: ["getDocumentsGridData", wrapperKey.current],
        queryFn: () => getDocumentsGridData.fn(getDocumentsGridData.args),
        cacheTime: 100000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
      {
        queryKey: [
          "getDocumentListingGridMetaData",
          context.refID,
          context.docCategory,
        ],
        queryFn: () =>
          getDocumentListingGridMetaData.fn(
            getDocumentListingGridMetaData.args
          ),
        cacheTime: 100000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    ]);

    const loading = result[1].isLoading || result[1].isFetching;
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
        key={`listingDocuments`}
        data={result[0].data ?? []}
        finalMetaData={result[1].data as GridMetaDataType}
        setData={() => null}
        actions={actions}
        setAction={setAction}
        loading={result[0].isFetching || result[0].isLoading}
      />
    );
    return renderResult;
  }
);
MyGridWrapper.displayName = "MyGridWrapper";

//If need to coloreize Data wrap Data in this function
// const ColorizeData = (data) => {
//   if (Array.isArray(data) && data.length > 0) {
//     data = data.map((one) => {
//       if (one.status === "Pending") {
//         return { ...one, _rowColor: "rgb(232, 244, 253)" };
//       } else if (one.status === "Rejected") {
//         return { ...one, _rowColor: "rgb(253, 236, 234)" };
//       } else if (one.status === "Verified") {
//         return { ...one, _rowColor: "rgb(237, 247, 237)" };
//       } else {
//         return one;
//       }
//     });
//   }
//   return data;
// };
