import { createContext, FC } from "react";

interface DOCCRUDProviderType {
  context: any;
  uploadDocuments: CRUDFNType;
  deleteDocuments: CRUDFNType;
  updateDocument: CRUDFNType;
  getDocumentsGridData: CRUDFNType;
  verifyDocuments: CRUDFNType;
  getDocumentListingGridMetaData: CRUDFNType;
  getDocumentUploadAddtionalFieldsMetaData: CRUDFNType;
  getDocumentEditGridMetaData: CRUDFNType;
  generateDocumentDownloadURL: CRUDFNType;
  previewDocument: CRUDFNType;
}

export const DOCCRUDContext = createContext<DOCCRUDProviderType>(
  {} as DOCCRUDProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const DOCCRUDContextProvider: FC<DOCCRUDProviderType> = ({
  children,
  uploadDocuments,
  deleteDocuments,
  updateDocument,
  verifyDocuments,
  getDocumentsGridData,
  getDocumentListingGridMetaData,
  getDocumentUploadAddtionalFieldsMetaData,
  getDocumentEditGridMetaData,
  generateDocumentDownloadURL,
  previewDocument,
  context,
}) => {
  return (
    <DOCCRUDContext.Provider
      value={{
        uploadDocuments,
        deleteDocuments,
        updateDocument,
        verifyDocuments,
        getDocumentsGridData,
        getDocumentListingGridMetaData,
        getDocumentUploadAddtionalFieldsMetaData,
        getDocumentEditGridMetaData,
        generateDocumentDownloadURL,
        previewDocument,
        context,
      }}
    >
      {children}
    </DOCCRUDContext.Provider>
  );
};
