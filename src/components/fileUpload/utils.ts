import fileTypeDetect, { FileTypeResult } from "file-type/browser";
import { FileObjectType } from "./type";
import { GridColumnType, GridMetaDataType } from "components/dataTableStatic";

export function hashCode(str) {
  // from https://stackoverflow.com/a/8831937/151666
  var hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export function computeFileFingerprint(file) {
  return hashCode(
    [file.name, file.type, file.size, file.lastModified].join("-")
  );
}

export const computeSize = (sizeInBytes) => {
  if (Number.isInteger(Number(sizeInBytes))) {
    let sOutput = `${sizeInBytes} bytes`;
    const aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    for (
      let nMultiple = 0, nApprox = sizeInBytes / 1024;
      nApprox > 1;
      nApprox = nApprox / 1024, nMultiple++
    ) {
      sOutput = `${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`;
    }
    return sOutput;
  } else {
    return "cannot compute size";
  }
};

export const detectMimeType = async (
  fileBlob
): Promise<FileTypeResult | undefined> => {
  const mime = await fileTypeDetect.fromBlob(fileBlob);
  return mime;
};

export const isMimeTypeValid = (ext, whiteListExtension: string[] | string) =>
  whiteListExtension === "all" ||
  (Array.isArray(whiteListExtension) && whiteListExtension.indexOf(ext) > -1);

export const isDuplicate = (file: FileObjectType, fileIDs: string[]) => {
  return Array.isArray(fileIDs) && fileIDs.indexOf(file.id) > -1;
};

export function downloadFile(fileObj: File, fileName?: string) {
  const url = typeof fileObj === "object" && URL.createObjectURL(fileObj);

  const a = document.createElement("a");
  a.href = String(url);

  a.download =
    fileName ?? fileObj.name ?? `download-${new Date().getUTCMilliseconds()}`;
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(String(url));
      a.removeEventListener("click", clickHandler);
    }, 150);
  };
  a.target = "_blank";
  a.addEventListener("click", clickHandler, false);
  a.click();
}

export const transformMetaDataByMutating = (
  metaData: GridMetaDataType,
  additionalColumns?: GridColumnType[],
  editableFileName?: boolean
): GridMetaDataType => {
  const newMetaData = JSON.parse(JSON.stringify(metaData));
  if (Boolean(editableFileName)) {
    for (let i = 0; i < newMetaData.columns.length; i++) {
      if (newMetaData.columns[i].accessor === "name") {
        newMetaData.columns[i].componentType = "editableTextField";
      }
    }
  }
  if (Array.isArray(additionalColumns)) {
    newMetaData.columns = [...metaData.columns, ...additionalColumns];
  }
  return newMetaData;
};

export const extractColumnsFromAdditionalMetaData = (
  additionalColumns?: GridColumnType[]
) => {
  if (Array.isArray(additionalColumns)) {
    const extractedFields = additionalColumns.reduce((accum, one) => {
      accum[one.accessor] = "";
      return accum;
    }, {});
    return extractedFields;
  }
  return {};
};

export const validateFilesAndAddToList = (
  customTransformFileObj: any,
  maxAllowedSize: number,
  allowedExtensions: string | string[]
) => async (newFiles: File[], existingFiles: FileObjectType[] | undefined) => {
  let failedFiles: any = [];
  let result = newFiles.map((one) => customTransformFileObj(one));
  let filesObj = await Promise.all(result);
  let existingFileIds: string[] = [];
  if (Array.isArray(existingFiles)) {
    existingFileIds = existingFiles.map((one) => one.id);
  }
  let filteredNewFilesObj = filesObj.filter((one) => {
    if (one.size > maxAllowedSize) {
      failedFiles.push({
        ...one,
        failedReason: "File Size exceed maximum size",
      });
      return false;
    }
    if (!isMimeTypeValid(one.ext, allowedExtensions)) {
      failedFiles.push({
        ...one,
        failedReason: "File type is not allowed",
      });
      return false;
    }
    if (isDuplicate(one, existingFileIds)) {
      failedFiles.push({
        ...one,
        failedReason: "File already added for uploaing",
      });
      return false;
    }
    return true;
  });
  return { failedFiles, filteredNewFilesObj };
};

export const transformFileObject = (otherFieldsTemplate: any) => async (
  file: File
): Promise<FileObjectType> => {
  const mimeType = await detectMimeType(file);
  return {
    ...otherFieldsTemplate,
    id: computeFileFingerprint(file),
    blob: file,
    name: file.name.split(".").slice(0, -1).join("."),
    sizeStr: computeSize(file.size),
    size: file.size,
    mimeType: file.type,
    _mimeType: mimeType?.mime ?? "NOT_FOUND",
    ext: mimeType?.ext ?? "NOT_FOUND",
    fileExt: file.name.split(".").pop(),
  };
};

export const cleanFileObj = (filesObj: FileObjectType[]) => {
  if (!Array.isArray(filesObj)) {
    return [];
  }
  return filesObj.map((one) => {
    const {
      id,
      blob,
      name,
      sizeStr,
      size,
      mimeType,
      _mimeType,
      ext,
      fileExt,
      ...others
    } = one;
    return {
      name: `${name}.${ext}`,
      blob: blob,
      ext: ext,
      id: id,
      ...others,
    };
  });
};

export const convertToFormData = (fileArrayObj: any[]) => {
  const formData = new FormData();
  if (!Array.isArray(fileArrayObj) || fileArrayObj.length === 0) {
    return formData;
  }
  const metaData: any = {};
  for (let j = 0; j < fileArrayObj.length; j++) {
    const { blob, id, ...others } = fileArrayObj[j];
    formData.append("blob", blob, `${id}`);
    metaData[`${id}`] = others;
  }
  formData.append("metaData", JSON.stringify(metaData));
  //const keys = Object.keys(fileArrayObj[0]);
  // for (let j = 0; j < fileArrayObj.length; j++) {
  //   for (let i = 0; i < keys.length; i++) {

  //     formData.append(keys[i], fileArrayObj[j][keys[i]]);
  //   }
  // }

  return formData;
};
