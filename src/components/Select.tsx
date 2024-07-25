import { ChakraStylesConfig, Select as ChSelect } from "chakra-react-select";
import { forwardRef } from "@chakra-ui/react";

export type SelectProps = Parameters<typeof ChSelect>[0];
export interface Option extends Record<any, any> {
  id?: number | string;
  name?: string;
}

const chakraStyles: ChakraStylesConfig = {
  indicatorSeparator: () => ({
    display: "none",
  }),
  multiValue: (provided) => ({
    ...provided,
    color: "white",
    bg: "gray.650",
    flexShrink: 0,
    h: "33px",
    fontSize: "md",
    mr: 2,
    borderRadius: "4px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    bg: "none",
    color: "gray.500",
    px: 0,
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "md",
  }),
  control: (provided) => ({
    ...provided,
    // minHeight: '50px',

    ">div": {
      px: 2,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6D6D6D",
  }),
  menu: (provided) => ({
    ...provided,
    shadow: "md",
  }),
};

const Select = forwardRef<SelectProps, "div">((props, ref) => (
  <ChSelect
    size="lg"
    chakraStyles={chakraStyles}
    ref={ref}
    menuPosition="fixed"
    selectedOptionColor="orange"
    {...props}
  />
));

export default Select;
