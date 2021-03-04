import { AutocompleteRenderOnly } from "components/common/autocomplete/render";
import { useState, useEffect } from "react";

export const EditableAutocomplete = ({
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

  const onChange = (value) => {
    setValue(value);
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
  }, [initialValue]);

  return (
    <AutocompleteRenderOnly
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      size="small"
      fullWidth
      error={externalError}
      touched={externalTouched}
      handleChange={onChange}
      handleBlur={onBlur}
      options={options}
      loading={loading}
      disabled={loading}
      _optionsKey={_optionsKey}
      renderInput={() => null}
      optionsProps={gridProps}
      disableCaching={disableCachingOptions}
    />
  );
};
