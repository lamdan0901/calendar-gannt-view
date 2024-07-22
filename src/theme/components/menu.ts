import { menuAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleList = defineStyle((props) => {
  return {
    bg: mode('#fff', 'gray.700')(props),
    boxShadow: '0px 3px 6px rgba(0, 10, 30, 0.201795)',
    color: 'inherit',
    minW: '3xs',
    py: '2',
    zIndex: 1,
    borderRadius: 'md',
    borderWidth: '1px',
    borderColor: 'gray.400',
  };
});

const baseStyleItem = defineStyle((props) => {
  return {
    py: '2',
    px: '5',
    transitionProperty: 'none',
    transitionDuration: 'ultra-fast',
    transitionTimingFunction: 'ease-in',
    _focus: {
      bg: mode('orange.50', 'whiteAlpha.100')(props),
    },
    _active: {
      bg: mode('gray.200', 'whiteAlpha.200')(props),
    },
    _expanded: {
      bg: mode('gray.100', 'whiteAlpha.100')(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  };
});

const baseStyleGroupTitle = defineStyle({
  mx: 4,
  my: 2,
  fontWeight: 'semibold',
  fontSize: 'sm',
});

const baseStyleCommand = defineStyle({
  opacity: 0.6,
});

const baseStyleDivider = defineStyle({
  border: 0,
  borderBottom: '1px solid',
  borderColor: 'inherit',
  my: '2',
  opacity: 0.6,
});

const baseStyleButton = defineStyle({
  transitionProperty: 'common',
  transitionDuration: 'normal',
  color: 'red',
});

const baseStyle = definePartsStyle((props) => ({
  button: baseStyleButton,
  list: baseStyleList(props),
  item: baseStyleItem(props),
  groupTitle: baseStyleGroupTitle,
  command: baseStyleCommand,
  divider: baseStyleDivider,
}));

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
});
