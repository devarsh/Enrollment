import {
  MetaDataType,
  GroupWiseRenderedFieldsType,
  RenderedFieldsType,
  RenderFunctionType,
} from "../types";
import { renderField } from "./fieldRenderer";
import { renderValue } from "./valueRenderer";

const renderByGroup = (renderMethod: RenderFunctionType) => (
  metaData: MetaDataType
) => {
  const { fields, form } = metaData;
  const defaultGroup = -1;
  let groupWiseRenderer: GroupWiseRenderedFieldsType = {};
  for (const oneField of fields) {
    let currentGroupName = defaultGroup;
    if (typeof form.render.groups === "object") {
      currentGroupName = form.render.groups.hasOwnProperty(
        `${oneField.render?.group}`
      )
        ? oneField.render?.group ?? -1
        : -1;
    }
    const element = renderMethod(
      oneField,
      form?.render,
      form?.name,
      form?.componentProps
    );
    let currentGroup: RenderedFieldsType;
    currentGroup = groupWiseRenderer[currentGroupName];
    if (currentGroup === undefined) {
      currentGroup = {
        fields: [],
        sequence: [],
        fieldNames: [],
      };
      groupWiseRenderer[currentGroupName] = currentGroup;
    }
    currentGroup.fields.push(element);
    currentGroup.sequence.push(oneField?.render?.sequence ?? 0);
    currentGroup.fieldNames.push(oneField.name);
  }
  //sort them by sequence
  if (form.render.ordering === "sequence") {
    const groups = Object.keys(groupWiseRenderer);
    for (const group of groups) {
      const currentGroup = groupWiseRenderer[group];
      //improve sorting
      for (let i = 0; i < currentGroup.sequence.length; i++) {
        for (let j = i + 1; j < currentGroup.sequence.length; j++) {
          if (currentGroup.sequence[i] > currentGroup.sequence[j]) {
            const temp = currentGroup.sequence[j];
            currentGroup.sequence[j] = currentGroup.sequence[i];
            currentGroup.sequence[i] = temp;
            const temp1 = currentGroup.fields[j];
            currentGroup.fields[j] = currentGroup.fields[i];
            currentGroup.fields[i] = temp1;
            const temp2 = currentGroup.fieldNames[j];
            currentGroup.fieldNames[j] = currentGroup.fieldNames[i];
            currentGroup.fieldNames[i] = temp2;
          }
        }
      }
    }
  }
  return groupWiseRenderer;
};

export const renderFieldsByGroup = renderByGroup(renderField);

export const renderValuesByGroup = renderByGroup(renderValue);
