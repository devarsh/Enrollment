import FormWrapper, { MetaDataType } from "../index";
import metaData from "./meta";

const TestForm = () => {
  return (
    <FormWrapper
      key={`testForm`}
      metaData={metaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        console.log(values);
        endSubmit(true);
      }}
      displayMode="edit"
    />
  );
};

export default TestForm;
