import Imask from "imask";

/**
 * The props accepted by react-imask, based
 * on the implementation of imask, with  some additions
 */
export type IMaskInputProps = Partial<
  Pick<
    Imask.AnyMaskedOptions,
    //@ts-ignore
    | "mask"
    | "value"
    | "prepare"
    | "validate"
    | "commit"
    | "overwrite"
    | "placeholderChar"
    | "lazy"
    | "definitions"
    | "blocks"
    | "pattern"
    | "format"
    | "parse"
    | "autofix"
    | "radix"
    | "thousandsSeparator"
    | "mapToRadix"
    | "scale"
    | "signed"
    | "normalizeZeros"
    | "padFractionalZeros"
    | "min"
    | "max"
    | "dispatch"
  >
> & {
  unmask?: boolean;
  onAccept?: <T>(...args: T[]) => void;
  onComplete?: <T>(...args: T[]) => void;
};
