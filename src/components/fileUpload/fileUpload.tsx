import {
  useState,
  useCallback,
  Fragment,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Alert from "@material-ui/lab/Alert";
import Grid from "components/dataTableStatic";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ActionTypes } from "components/dataTable";
import { GridColumnType } from "components/dataTableStatic";
import metaData from "./metaData";
import failedFilesMetaData from "./failedFilesMetaData";
import { UploadTarget } from "./uploadTarget";
import {
  transformFileObject,
  cleanFileObj,
  transformMetaDataByMutating,
  extractColumnsFromAdditionalMetaData,
  validateFilesAndAddToList,
  convertToFormData,
} from "./utils";
import { FileObjectType } from "./type";
import { PDFViewer, ImageViewer, NoPreview } from "./preView";

const actions: ActionTypes[] = [
  {
    actionName: "Delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "View",
    actionLabel: "View File",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const FileUploadControl = ({
  additionalColumns,
  editableFileName,
  onClose,
  onUpload,
  dataChangedRef,
  allowedExtensions = ["pdf"],
  maxAllowedSize = 1024 * 1024 * 3,
  gridProps,
}: {
  additionalColumns?: GridColumnType[];
  editableFileName?: boolean;
  onClose?: any;
  onUpload?: any;
  dataChangedRef?: any;
  allowedExtensions?: string | string[];
  maxAllowedSize?: number;
  gridProps?: any;
}) => {
  /*eslint-disable  react-hooks/exhaustive-deps*/
  const transformedFilesMetaData = useMemo(
    () =>
      transformMetaDataByMutating(
        metaData,
        additionalColumns,
        editableFileName
      ),
    []
  );
  const additionalFieldsObj = useMemo(
    () => extractColumnsFromAdditionalMetaData(additionalColumns),
    []
  );
  const customTransformFileObj = useCallback(
    (currentObj) => {
      return transformFileObject(additionalFieldsObj)(currentObj);
    },
    [additionalFieldsObj]
  );
  const [files, setFiles] = useState<FileObjectType[]>([]);
  const [error, setError] = useState("");
  const [failedFiles, setFailedFailes] = useState<FileObjectType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(Infinity);
  const gridRef = useRef<any>(null);
  const validateFilesAndAddToListCB = useCallback(
    async (newFiles: File[], existingFiles: FileObjectType[] | undefined) => {
      let {
        filteredNewFilesObj,
        failedFiles,
      } = await validateFilesAndAddToList(
        customTransformFileObj,
        maxAllowedSize,
        allowedExtensions
      )(newFiles, existingFiles);
      setFiles((old) => [...old, ...filteredNewFilesObj]);
      if (failedFiles.length > 0) {
        setFailedFailes(failedFiles);
        setOpenDialog(true);
      }
    },
    [
      setFiles,
      setFailedFailes,
      setOpenDialog,
      customTransformFileObj,
      maxAllowedSize,
      allowedExtensions,
    ]
  );
  useEffect(() => {
    if (action?.name === "Delete") {
      const toDeleteObjs = action?.rows?.map?.((one) => one.id);
      const newFiles = files.filter((one) => toDeleteObjs.indexOf(one.id) < 0);
      setFiles(newFiles);
      setAction(null);
    }
  }, [action]);

  const uploadDocuments = useCallback(
    async (onUpload) => {
      let { hasError, data } = await gridRef?.current?.validate?.();
      if (hasError === true) {
        setFiles(data);
      } else {
        let result = gridRef?.current?.cleanData?.();
        let cleanObj = cleanFileObj(result);
        let formDataObj = convertToFormData(cleanObj);
        setLoading(true);
        setError("");
        onUpload(
          formDataObj,
          (progressValue) => {
            setUploadProgress(progressValue);
          },
          ({ status, data }) => {
            if (status === "success") {
              dataChangedRef.current = true;
              onClose();
            } else {
              setError("unknown error occured");
            }
            setLoading(false);
          }
        );
      }
    },
    [setLoading, setError, setFiles]
  );

  return (
    <Fragment>
      {loading ? (
        <LinearProgress
          variant={
            uploadProgress === Infinity ? "indeterminate" : "determinate"
          }
          value={uploadProgress}
        />
      ) : null}
      <Card>
        <CardHeader
          title="File Upload"
          action={
            <CardActions>
              <div style={{ flexGrow: 2 }} />
              {typeof onUpload === "function" ? (
                <Button
                  disabled={loading || files.length <= 0}
                  size="small"
                  color="primary"
                  onClick={() => uploadDocuments(onUpload)}
                >
                  Upload
                </Button>
              ) : null}
              <Button
                disabled={loading || files.length <= 0}
                onClick={() => setFiles([])}
                size="small"
                color="primary"
              >
                Clear All
              </Button>
              {typeof onClose === "function" ? (
                <Button
                  disabled={loading}
                  onClick={() => onClose()}
                  size="small"
                  color="primary"
                >
                  Close
                </Button>
              ) : null}
            </CardActions>
          }
        />
        {Boolean(error) ? <Alert severity="error">{error}</Alert> : null}
        <CardContent>
          <UploadTarget
            existingFiles={files}
            onDrop={validateFilesAndAddToListCB}
            disabled={loading}
          />
          <Collapse in={files.length > 0}>
            <Grid
              finalMetaData={transformedFilesMetaData}
              data={files}
              setData={setFiles}
              actions={actions}
              setAction={setAction}
              loading={loading}
              ref={gridRef}
              gridProps={gridProps}
            />
          </Collapse>
        </CardContent>
      </Card>
      <Dialog open={openDialog} maxWidth="lg">
        <DialogTitle>Failed To Add Following Files For Upload</DialogTitle>
        <DialogContent>
          <Grid
            finalMetaData={failedFilesMetaData}
            data={failedFiles}
            setData={(any) => null}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setFailedFailes([]);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(action)}
        maxWidth="lg"
        onClose={() => setAction(null)}
        PaperProps={{
          style: { width: "100%", height: "100%" },
        }}
      >
        {action?.rows[0]?.data?._mimeType?.includes("pdf") ? (
          <PDFViewer
            blob={action?.rows[0]?.data?.blob}
            fileName={action?.rows[0]?.data?.name}
          />
        ) : action?.rows[0]?.data?._mimeType?.includes("image") ? (
          <ImageViewer
            blob={action?.rows[0]?.data?.blob}
            fileName={action?.rows[0]?.data?.name}
          />
        ) : (
          <NoPreview fileName={action?.rows[0]?.data?.name} />
        )}
      </Dialog>
    </Fragment>
  );
};
