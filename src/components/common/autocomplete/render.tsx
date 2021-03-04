import {
  FC,
  useEffect,
  useRef,
  useState,
  Fragment,
  ComponentType,
  HTMLAttributes,
  lazy,
  Suspense,
} from "react";
import { TextFieldProps } from "@material-ui/core/TextField";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { CreateFilterOptionsConfig } from "@material-ui/lab/useAutocomplete";
import { Checkbox } from "components/styledComponent/checkbox";
import { TextField } from "components/styledComponent/textfield";
import { Merge, OptionsProps, OptionsFn } from "../types";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useOptionsFetcherSimple } from "../utils";

const ListBoxComponentVirtualized = lazy(() =>
  import("./virtualized").then((module) => ({
    default: module.ListBoxComponent,
  }))
);
//will use it if there is a neeed for advance sorter
//import matchSorter from "match-sorter";

interface AutoCompleteExtendedProps {
  label?: string;
  options: OptionsProps[] | OptionsFn;
  _optionsKey?: string;
  error: string;
  touched: boolean;
  handleBlur?: any;
  handleChange?: any;
  showCheckbox?: boolean;
  CircularProgressProps?: CircularProgressProps;
  TextFieldProps?: TextFieldProps;
  ChipProps?: ChipProps;
  CreateFilterOptionsConfig?: CreateFilterOptionsConfig<OptionsProps>;
  placeholder?: string;
  required?: boolean;
  enableVirtualized?: boolean;
  disableCaching?: boolean;
  optionsProps?: any;
}

const getOptionLabel = (option: OptionsProps) => option?.label ?? "";
const getOptionValue = (option: OptionsProps) => option?.value ?? "";

type MyAutocompleteProps = Merge<
  AutocompleteProps<OptionsProps, true, true, true>,
  AutoCompleteExtendedProps
>;

export const AutocompleteRenderOnly: FC<MyAutocompleteProps> = ({
  label,
  showCheckbox,
  CircularProgressProps,
  TextFieldProps,
  ChipProps,
  CreateFilterOptionsConfig,
  placeholder,
  required,
  enableVirtualized,
  handleBlur,
  handleChange,
  freeSolo,
  multiple,
  options,
  error,
  touched,
  disableClearable,
  value,
  _optionsKey,
  disableCaching,
  optionsProps,
  ...others
}) => {
  const isTouched = Boolean(touched);
  const isError = isTouched && Boolean(error);

  const [_options, setOptions] = useState<OptionsProps[]>([]);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date().getTime());
  const initDoneRef = useRef(false);
  const defaultValueRef = useRef<any>(null);
  const { loadingOptions } = useOptionsFetcherSimple(
    options,
    setOptions,
    _optionsKey,
    disableCaching,
    optionsProps
  );

  //to set the default value
  useEffect(() => {
    let _internalValue: any | any[] = value;
    if (
      !initDoneRef.current &&
      Boolean(_internalValue) &&
      _options.length > 1
    ) {
      if (!Array.isArray(_internalValue)) {
        console.log(_internalValue);
        _internalValue = [value];
      }
      let answers: OptionsProps[] = [];
      for (let i = 0; i < _options.length && _internalValue.length > 0; i++) {
        let foundIndex = _internalValue.findIndex((one) =>
          /* eslint-disable eqeqeq */
          one == _options[i].value ? true : false
        );
        if (foundIndex > -1) {
          answers.push(_options[i]);
          const prev = _internalValue.slice(0, foundIndex);
          const next = _internalValue.slice(foundIndex + 1);
          _internalValue = [...prev, ...next];
        }
      }
      initDoneRef.current = true;
      if (multiple) {
        defaultValueRef.current = answers;
      } else {
        defaultValueRef.current = answers[0];
      }
      setLastUpdatedTime(new Date().getTime());
    }
  }, [loadingOptions, _options, value, multiple]);

  return (
    <Suspense fallback={"loading..."}>
      <Autocomplete
        {...others}
        key={`${lastUpdatedTime}`}
        //@ts-ignore
        multiple={multiple}
        disableClearable={disableClearable}
        freeSolo={freeSolo}
        options={_options}
        getOptionLabel={getOptionLabel}
        ListboxComponent={
          Boolean(enableVirtualized)
            ? (ListBoxComponentVirtualized as ComponentType<
                HTMLAttributes<HTMLElement>
              >)
            : undefined
        }
        onChange={(_, value) => {
          if (!Array.isArray(value)) {
            value = [value];
          }
          value = value.map((one) => {
            if (typeof one === "object") {
              if (!Boolean(freeSolo)) {
                return getOptionValue(one);
              }
              return getOptionLabel(one);
            }
            return one;
          });

          if (!Boolean(multiple) && Array.isArray(value)) {
            //@ts-ignore
            handleChange(value[0]);
          } else {
            handleChange(value);
          }
        }}
        onBlur={handleBlur}
        filterOptions={
          Boolean(CreateFilterOptionsConfig) &&
          typeof CreateFilterOptionsConfig === "object"
            ? createFilterOptions(CreateFilterOptionsConfig)
            : undefined
        }
        renderTags={(value, getTagProps) => {
          return value.map((option, index) => {
            if (typeof option === "string") {
              return (
                <Chip
                  key={option}
                  variant="outlined"
                  {...ChipProps}
                  label={option}
                  {...getTagProps({ index })}
                />
              );
            }
            return (
              <Chip
                key={`${option.label}-${index}`}
                variant="outlined"
                {...ChipProps}
                label={option.label}
                {...getTagProps({ index })}
              />
            );
          });
        }}
        renderInput={(params) => (
          <TextField
            {...TextFieldProps}
            {...params}
            label={label}
            placeholder={placeholder}
            autoComplete="disabled"
            type="text"
            error={isError}
            required={required}
            helperText={isError ? error : null}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loadingOptions ? (
                    <CircularProgress
                      color="primary"
                      variant="indeterminate"
                      {...CircularProgressProps}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-user-street-address",
            }}
          />
        )}
        renderOption={(option, { selected, inputValue }) => {
          let label = getOptionLabel(option);
          const matches = match(label, inputValue);
          const parts = parse(label, matches);
          const labelJSX = parts.map((part, index) => (
            <span
              key={index}
              style={{ fontWeight: part.highlight ? 700 : 400 }}
            >
              {part.text}
            </span>
          ));
          return (
            <div style={{ whiteSpace: "pre" }}>
              {Boolean(showCheckbox) ? <Checkbox checked={selected} /> : null}
              {labelJSX}
            </div>
          );
        }}
      />
    </Suspense>
  );
};
