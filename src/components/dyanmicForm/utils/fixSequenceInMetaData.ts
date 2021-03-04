import { MetaDataType } from "../types";
export const MoveSequenceToRender = (
  formMetaData: MetaDataType
): MetaDataType => {
  let { fields, form } = formMetaData;
  if (Array.isArray(fields)) {
    //@ts-ignore
    fields = fields.map((one) => {
      //@ts-ignore
      const { sequence, render, ...others } = one;
      return { ...others, render: { sequence, ...render } };
    });
  }
  return {
    fields,
    form,
  };
};
