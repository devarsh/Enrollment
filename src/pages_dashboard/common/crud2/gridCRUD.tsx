import { useContext, useRef, useState, Fragment, useEffect, FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { FormNew } from "./formNew";
import { FormViewEdit } from "./formViewEdit";
import { DeleteAction } from "./delete";
import { MyGridWrapper } from "./gridWrapper";
import { CRUDContext } from "./context";
import { DocumentGridCRUD } from "../documents/documentsTab";
const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "Add",
    actionLabel: "Add Detail",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const GridCRUD: FC<{
  isDataChangedRef: any;
  showDocuments?: boolean;
}> = ({ isDataChangedRef, showDocuments }) => {
  let allActions = useRef<any>(null);
  if (allActions.current === null) {
    allActions.current = [...actions];
    if (Boolean(showDocuments)) {
      allActions.current.push({
        actionName: "Document",
        actionLabel: "Document Details",
        multiple: false,
        rowDoubleClick: false,
      });
    }
  }
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const isMyDataChangedRef = useRef(false);
  const { context } = useContext(CRUDContext);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (isMyDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      gridRef.current?.refetch?.();
      isMyDataChangedRef.current = false;
    }
  };
  return (
    <Fragment>
      <MyGridWrapper
        ref={gridRef}
        key="grid"
        actions={allActions.current}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xl"
        PaperProps={
          currentAction === "Delete"
            ? {}
            : { style: { width: "100%", height: "100%" } }
        }
      >
        {(currentAction?.name ?? "") === "Add" ? (
          <FormNew
            successAction={closeMyDialog}
            cancelAction={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "View" ? (
          <FormViewEdit
            isDataChangedRef={isMyDataChangedRef}
            closeDialog={closeMyDialog}
            serialNo={currentAction?.rows[0]?.id}
          />
        ) : (currentAction?.name ?? "") === "Delete" ? (
          <DeleteAction
            serialNo={currentAction?.rows.map((one) => one.id)}
            closeDialog={closeMyDialog}
            isDataChangedRef={isMyDataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "Document" ? (
          <DocumentGridCRUD
            refID={context?.refID}
            productType={context?.productType}
            moduleType={context?.moduleType}
            serialNo={currentAction?.rows[0]?.id}
            onClose={closeMyDialog}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </Fragment>
  );
};

const InvalidAction = ({ closeDialog }) => {
  useEffect(() => {
    closeDialog();
  }, [closeDialog]);
  return null;
};
