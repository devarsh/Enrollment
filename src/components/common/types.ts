import { DependentValuesType } from "packages/form";

export type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } &
  B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Optional<T> = { [P in keyof T]?: T[P] };

export interface OptionsProps {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface dependentOptionsFn {
  (optionsFn?: DependentValuesType, formName?: string):
    | OptionsProps[]
    | Promise<OptionsProps[]>;
}

export interface OptionsFn {
  (): OptionsProps[] | Promise<OptionsProps[]>;
}
