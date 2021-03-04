import { ExtendedFieldMetaDataTypeOptional } from "./types";
import sub from "date-fns/sub";

export const extendedMetaData: ExtendedFieldMetaDataTypeOptional = {
  currency: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      prefix: "₹",
      thousandsGroupStyle: "lakh",
      allowNegative: false,
      allowLeadingZeros: false,
      decimalScale: 0,
      maxLength: 13,
      isAllowed: (values) => {
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
    enableNumWords: true,
  },
  currencyWithoutWords: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      prefix: "₹",
      thousandsGroupStyle: "lakh",
      allowNegative: false,
      allowLeadingZeros: false,
      decimalScale: 0,
      maxLength: 13,
      isAllowed: (values) => {
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
    enableNumWords: false,
  },
  dob: {
    render: {
      componentType: "datePicker",
    },
    //@ts-ignore
    schemaValidation: {
      type: "date",
      rules: [
        { name: "typeError", params: ["Must be a valid date"] },
        {
          name: "max",
          params: [
            sub(new Date(), { years: 18 }),
            "minimum age must be 18 years",
          ],
        },
        {
          name: "min",
          params: [
            sub(new Date(), { years: 100 }),
            "maximum age must be 100 years",
          ],
        },
      ],
    },
  },
  phoneNumber: {
    render: {
      componentType: "numberFormat",
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["Mobile No is required"] },
        { name: "min", params: [10, "Mobile No should be 10 digit."] },
        { name: "max", params: [10, "Mobile No should be 10 digit."] },
      ],
    },
    FormatProps: {
      format: "##########",
      isAllowed: (values) => {
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
    StartAdornment: "+91",
  },
  panCard: {
    render: {
      componentType: "inputMask",
    },
    fullWidth: true,
    MaskProps: {
      mask: "aaaaa0000a",
      prepare: function (str) {
        return str.toUpperCase();
      },
      lazy: true,
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["This Field is required"] },
        {
          name: "pancard",
          params: ["Please enter valid Pan Card Number"],
        },
      ],
    },
  },
  panCardOptional: {
    render: {
      componentType: "inputMask",
    },
    MaskProps: {
      mask: "aaaaa0000a",
      prepare: function (str) {
        return str.toUpperCase();
      },
      lazy: true,
    },
  },
  aadharCard: {
    render: {
      componentType: "inputMask",
    },
    fullWidth: true,
    MaskProps: {
      mask: "0000` 0000` 0000",
      lazy: true,
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["This Field is required"] },
        {
          name: "aadhar",
          params: ["Please enter valid Aadhar Number"],
        },
      ],
    },
  },
  rateOfInt: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      suffix: "%",
      decimalScale: 2,
      fixedDecimalScale: true,
      allowNegative: false,
      allowEmptyFormatting: true,
      isAllowed: (values) => {
        //@ts-ignore
        if (values.floatValue <= 99.99) {
          return true;
        }
        return false;
      },
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "typeError", params: ["Please enter existing loan interest"] },
        { name: "required", params: ["Please enter existing loan interest"] },
      ],
    },
  },
  MonthlyEmiPayCurrency: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      prefix: "₹",
      thousandsGroupStyle: "lakh",
      allowNegative: false,
      allowLeadingZeros: false,
      decimalScale: 0,
      maxLength: 13,
      isAllowed: (values) => {
        if (values.floatValue === null) {
          return false;
        }
        return true;
      },
    },
    enableNumWords: true,
  },
  pincode: {
    render: {
      componentType: "numberFormat",
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["Residence Pincode is required"] },
        { name: "min", params: [6, "Residence Pincode should be 6 digit."] },
        { name: "max", params: [6, "Residence Pincode should be 6 digit."] },
      ],
    },
    FormatProps: {
      format: "######",
      isAllowed: (values) => {
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
  },
  futureDateNotAllowed: {
    render: {
      componentType: "datePicker",
    },
    //@ts-ignore
    schemaValidation: {
      type: "date",
      rules: [
        { name: "typeError", params: ["Must be a valid date"] },
        {
          name: "max",
          params: [new Date(), "Future Date not allowed."],
        },
      ],
    },
  },
};
