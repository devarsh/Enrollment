import { Fragment, useContext, useEffect, useState } from "react";
import { DOCCRUDContext } from "./context";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export const Download = ({ docData, closeDialog, maxDownloadLimit = 3 }) => {
  const { generateDocumentDownloadURL } = useContext(DOCCRUDContext);
  const [error, setError] = useState("");
  const closeMe = () => {
    setError("");
    closeDialog();
  };
  useEffect(() => {
    if (docData.length > Number(maxDownloadLimit)) {
      setError(`Cannot download more than ${maxDownloadLimit} files at a time`);
      return;
    }
    if (docData.length === 1) {
      const url = generateDocumentDownloadURL.fn(
        generateDocumentDownloadURL.args
      )(docData.map((one) => one.id));
      downloadFile(url, docData[0].name);
    } else if (docData.length > 1) {
      const url = generateDocumentDownloadURL.fn(
        generateDocumentDownloadURL.args
      )(docData.map((one) => one.id));
      downloadFile(url, `download-${new Date().getUTCMilliseconds()}`);
    }
    closeDialog();
  }, [maxDownloadLimit, docData, closeDialog, generateDocumentDownloadURL]);
  return Boolean(error) ? (
    <Fragment>
      <DialogTitle>{error}</DialogTitle>
      <DialogActions>
        <Button onClick={closeMe}>Ok</Button>
      </DialogActions>
    </Fragment>
  ) : null;
};

const downloadFile = (url: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = String(url);
  a.download = fileName;
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(String(url));
      a.removeEventListener("click", clickHandler);
    }, 150);
  };
  a.target = "_blank";
  a.addEventListener("click", clickHandler, false);
  a.click();
};
