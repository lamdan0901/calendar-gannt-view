import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const $size = cssVar('checkbox-size');

const baseStyle = definePartsStyle((props) => ({
  control: {
    borderWidth: '1px',
    borderColor: 'gray.650',
    _checked: {
      bg: 'gray.650',
      borderColor: 'gray.650',
      _hover: {
        bg: 'gray.650',
        borderColor: 'gray.650',
      },
    },
  },
  label: {
    fontWeight: '500',
  },
}));

const sizes = {
  sm: definePartsStyle({
    control: { [$size.variable]: 'sizes.3' },
    label: { fontSize: 'sm' },
    icon: { fontSize: '3xs' },
  }),
  md: definePartsStyle({
    control: { [$size.variable]: 'sizes.4' },
    label: { fontSize: 'md' },
    icon: { fontSize: '2xs' },
  }),
  lg: definePartsStyle({
    control: { [$size.variable]: 'sizes.6', borderRadius: 'md' },
    label: { fontSize: 'md' },
    icon: {
      fontSize: '10px',
    },
  }),
};

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'lg',
  },
});
