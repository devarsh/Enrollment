import { Suspense, Fragment } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Container from "@material-ui/core/Container";

export const MyTabs = ({
  activeStep,
  filteredFieldGroups,
  steps,
  setActiveStep,
  formRenderConfig,
  defaultGroupName,
  fieldGroups,
  handlePrev,
  handleNext,
  handleSubmit,
  fieldGroupsActiveStatus,
  isLastActiveStep,
}) => {
  return (
    <Fragment>
      <Container maxWidth="lg" style={{ background: "white" }}>
        <Tabs
          value={Number(activeStep)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {filteredFieldGroups.map((field) => {
            return (
              <Tab
                value={Number(field.index)}
                key={field.name}
                label={field.name}
                onClick={() => setActiveStep(Number(field.index))}
                style={field.hasError ? { color: "red" } : {}}
              />
            );
          })}
        </Tabs>
        <div style={{ height: "65vh", overflowY: "auto", overflowX: "hidden" }}>
          <br />
          <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>
        </div>
      </Container>
    </Fragment>
  );
};
