import { Fragment, FC, useEffect, useRef } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Close from "@material-ui/icons/Close";
import { downloadFile } from "./utils";

export const PDFViewer: FC<{ blob: File; fileName: string; onClose?: any }> = ({
  blob,
  fileName,
  onClose,
}) => {
  const urlObj = useRef(
    typeof blob === "object" && Boolean(blob) ? URL.createObjectURL(blob) : null
  );
  useEffect(() => {
    let toRemoveURL = urlObj.current ?? "";
    return () => {
      URL.revokeObjectURL(toRemoveURL);
    };
  }, []);
  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileName}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton
          color="primary"
          onClick={() => downloadFile(blob, fileName)}
        >
          <GetAppRoundedIcon />
        </IconButton>
        {typeof onClose === "function" ? (
          <IconButton color="primary" onClick={onClose}>
            <Close />
          </IconButton>
        ) : null}
      </DialogActions>
      <DialogContent>
        <iframe
          title="Document Preview"
          src={`${urlObj.current}`}
          style={{ height: "100%", width: "100%" }}
          aria-label="PDF Preview"
        />
      </DialogContent>
    </Fragment>
  );
};

export const ImageViewer: FC<{
  blob: File;
  fileName: string;
  onClose?: any;
}> = ({ blob, fileName, onClose }) => {
  const urlObj = useRef(
    typeof blob === "object" && Boolean(blob) ? URL.createObjectURL(blob) : ""
  );
  useEffect(() => {
    let toRemoveURL = urlObj.current;
    return () => URL.revokeObjectURL(toRemoveURL);
  }, []);
  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileName}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton
          color="primary"
          onClick={() => downloadFile(blob, fileName)}
        >
          <GetAppRoundedIcon />
        </IconButton>
        {typeof onClose === "function" ? (
          <IconButton color="primary" onClick={onClose}>
            <Close />
          </IconButton>
        ) : null}
      </DialogActions>
      <DialogContent>
        <img width="60%" src={urlObj.current} alt="Preview of document" />
      </DialogContent>
    </Fragment>
  );
};

export const NoPreview: FC<{
  fileName: string;
  onClose?: any;
  message?: string;
}> = ({ onClose, fileName, message }) => (
  <Fragment>
    <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
      <Typography variant="h6" color="textSecondary">
        File:
      </Typography>
      <Typography variant="h6">{fileName}</Typography>
      <div style={{ flexGrow: 1 }}></div>
      {typeof onClose === "function" ? (
        <IconButton color="primary" onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </DialogActions>
    <DialogContent>{message}</DialogContent>
  </Fragment>
);
