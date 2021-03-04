import { SelectRenderOnly } from "components/common/select/render";
import { useState, useEffect } from "react";

export const EditableSelect = ({
  value: initialValue,
  row: { index, original },
  column: { id, options, validation, _optionsKey, disableCachingOptions },
  updateGridData,
  gridProps,
}) => {
  const externalTouched = Boolean(original?._touched?.[id]);
  const externalError = original?._error?.[id] ?? "";
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setLoading(true);
    validation(value).then((result) => {
      setLoading(false);
      updateGridData(index, id, value, true, result);
    });
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, externalError]);

  return (
    <SelectRenderOnly
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      size="small"
      fullWidth
      touched={externalTouched}
      error={externalError}
      handleChange={onChange}
      handleBlur={onBlur}
      options={options}
      loading={loading}
      disabled={loading}
      _optionsKey={_optionsKey}
      optionsProps={gridProps}
      disableCaching={disableCachingOptions}
    />
  );
};
