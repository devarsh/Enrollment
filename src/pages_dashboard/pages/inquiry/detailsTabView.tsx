import {
  useState,
  FC,
  Fragment,
  useEffect,
  useContext,
  lazy,
  Suspense,
} from "react";
import Box from "@material-ui/core/Box";
import { Tab } from "components/styledComponent/tab";
import { Tabs } from "components/styledComponent/tabs";
import { queryClient } from "cache";
import { ClearCacheContext } from "cache";
import { CRUDContextProvider, useStyles } from "pages_dashboard/common/crud2";

const LOSSDK: any = {};

const SimpleCRUD = lazy(() =>
  import("pages_dashboard/common/crud2").then((module) => ({
    default: module.SimpleCRUD,
  }))
);
const crudAPIArgs = (moduleType, productType, refID) => ({
  context: { moduleType, productType, refID },
  // call to save form data
  insertFormData: {
    fn: LOSSDK.insertFormData,
    args: { moduleType, productType, refID },
  },
  // to check if form data exist or not
  checkFormDataExist: {
    fn: LOSSDK.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  // delete record from the grid for a particular form record
  deleteFormData: {
    fn: LOSSDK.deleteFormData,
    args: { moduleType, productType, refID },
  },
  // update form data
  updateFormData: {
    fn: LOSSDK.updateFormData,
    args: { moduleType, productType, refID },
  },
  // get form data for (View and Edit)
  getFormData: {
    fn: LOSSDK.getFormData,
    args: { moduleType, productType, refID },
  },
  // get grid listing data
  getGridFormData: {
    fn: LOSSDK.getGridFormData,
    args: { moduleType, productType, refID },
  },
  // get form metaData for (new/view/edit)
  getFormMetaData: {
    fn: LOSSDK.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  // get grid metaData
  getGridFormMetaData: {
    fn: LOSSDK.getGridFormMetaData,
    args: { moduleType, productType, refID },
  },
});

const TabPanel = ({ value, index, children }) => {
  return Number(value) === Number(index) ? children : null;
};

export const DetailsTabView: FC<{
  refID: string;
  moduleType: string;
  productGridData: any;
  isDataChangedRef: any;
  handleDialogClose: any;
}> = ({
  refID,
  moduleType,
  productGridData,
  isDataChangedRef,
  handleDialogClose,
}) => {
  const removeCache = useContext(ClearCacheContext);
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (_, currentTab) => {
    setCurrentTab(currentTab);
  };
  const classes = useStyles();

  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  return (
    <Fragment>
      <Tabs value={currentTab} onChange={handleChangeTab}>
        <Tab label="Inquiry" id="0" />
        <Tab label="Questionnaire" id="1" />
        <Tab label="Customer" id="2" />
        <Tab label="Move To Lead" id="3" />
      </Tabs>
      <Suspense fallback={"loading..."}>
        <Box py={2} className={classes.tabPanel}>
          <TabPanel value={currentTab} index="0" key={0}>
            <CRUDContextProvider {...crudAPIArgs(moduleType, "main", refID)}>
              <SimpleCRUD
                isDataChangedRef={isDataChangedRef}
                dataAlwaysExists={true}
              />
            </CRUDContextProvider>
          </TabPanel>
          <TabPanel value={currentTab} index="1" key={1}>
            <CRUDContextProvider
              {...crudAPIArgs(moduleType, "question", refID)}
            >
              <SimpleCRUD
                isDataChangedRef={isDataChangedRef}
                dataAlwaysExists={false}
              />
            </CRUDContextProvider>
          </TabPanel>
        </Box>
      </Suspense>
    </Fragment>
  );
};
