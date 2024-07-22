// theme/index.js
import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import Button from "./components/button";
import radii from "./foundations/radius";
import colors from "./foundations/colors";
import typography from "./foundations/typography";
import shadows from "./components/shadow";

import { Text } from "./components/text";
import { sizes } from "./foundations/sizes";
import { Container } from "./components/container";
import { avatarTheme } from "./components/avatar";
import { headingTheme } from "./components/heading";
import { inputTheme } from "./components/input";
import { menuTheme } from "./components/menu";
import { tableTheme } from "./components/table";
import { badgeTheme } from "./components/badge";
import { alertTheme } from "./components/alert";
import { formLabelTheme } from "./components/form-label";
import { checkboxTheme } from "./components/checkbox";
import { modalTheme } from "./components/modal";
import { textareaTheme } from "./components/textarea";
import { skeletonTheme } from "./components/skeleton";
import { progressTheme } from "./components/progress";
import { popoverTheme } from "./components/popover";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

const overrides = {
  config: { initialColorMode: "light", cssVarPrefix: "meta-brief" },
  fonts: {
    heading: `Helvetica Neue, sans-serif`,
    body: `Helvetica Neue, sans-serif`,
  },
  styles,
  colors,
  radii,
  shadows,
  ...sizes,
  ...typography,
  components: {
    Button,
    Text,
    Container,
    Avatar: avatarTheme,
    Heading: headingTheme,
    Input: inputTheme,
    Menu: menuTheme,
    Table: tableTheme,
    Badge: badgeTheme,
    Alert: alertTheme,
    FormLabel: formLabelTheme,
    Checkbox: checkboxTheme,
    Modal: modalTheme,
    Textarea: textareaTheme,
    Skeleton: skeletonTheme,
    Progress: progressTheme,
    Popover: popoverTheme,
  },
};

export default extendTheme(
  overrides,
  withProse({
    baseStyle: {
      a: {
        textDecor: "underline",
      },
    },
  })
);
