import { Suspense } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { useStyles } from "./style";

export const MyStepper = ({
  activeStep,
  filteredFieldGroups,
  formRenderConfig,
  defaultGroupName,
  fieldGroups,
  steps,
  handlePrev,
  handleNext,
  handleSubmit,
  fieldGroupsActiveStatus,
  isLastActiveStep,
  setActiveStep,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.form}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {filteredFieldGroups.map((field) => {
          return (
            <Step key={field.name}>
              <StepLabel>{field.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box width={1} display="flex" justifyContent="flex-start">
        <Typography component="h4" className={classes.subTitle}>
          {typeof formRenderConfig.groups === "object"
            ? formRenderConfig.groups[fieldGroups.current[activeStep]]
            : defaultGroupName}
        </Typography>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>

      <Box width={1} display="flex" justifyContent="flex-end">
        {activeStep === 0 ? null : (
          <Button
            type="button"
            onClick={handlePrev}
            className={classes.backBtn}
          >
            {formRenderConfig?.labels?.prev ?? "Back"}
          </Button>
        )}
        {!isLastActiveStep(activeStep, fieldGroupsActiveStatus) ? (
          <Button type="button" className={classes.submit} onClick={handleNext}>
            {formRenderConfig?.labels?.next ?? "Next"}
          </Button>
        ) : (
          <Button
            type="button"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {formRenderConfig?.labels?.complete ?? "Submit"}
          </Button>
        )}
      </Box>
    </div>
  );
};
