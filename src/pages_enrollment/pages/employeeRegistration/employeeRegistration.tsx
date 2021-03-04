import { Fragment } from "react";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { metaData } from "./metadata";

export const EmployeeRegistration = () => {
  return (
    <Fragment>
      <FormWrapper
        key={"employeeRegistration"}
        //@ts-ignore
        metaData={metaData as MetaDataType}
        initialValues={{}}
        onSubmitHandler={() => null}
        hidden={false}
        displayMode={"new"}
      />
    </Fragment>
  );
};
