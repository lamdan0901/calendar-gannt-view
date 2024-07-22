import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleOverlay = defineStyle({
  bg: 'blackAlpha.800',
  zIndex: 'modal',
});

const baseStyleHeader = defineStyle({
  px: '35px',
  pt: '8',
  pb: '4',
  fontSize: 'lg',
  fontWeight: 'bold',
});

const baseStyleCloseButton = defineStyle({
  position: 'absolute',
  top: '4',
  insetEnd: '4',
});

const baseStyleFooter = defineStyle({
  px: '35px',
  pt: '4',
  pb: '8',
});

const baseStyle = definePartsStyle((props) => ({
  overlay: baseStyleOverlay,
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  footer: baseStyleFooter,
  body: { px: '35px' },
}));

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
  if (value === 'full') {
    return definePartsStyle({
      dialog: {
        maxW: '100vw',
        minH: '$100vh',
        my: '0',
        borderRadius: '0',
      },
    });
  }
  return definePartsStyle({
    dialog: { maxW: value },
  });
}

const sizes = {
  xs: getSize('xs'),
  sm: getSize('sm'),
  md: getSize('md'),
  lg: getSize('lg'),
  xl: getSize('xl'),
  '2xl': getSize('739px'),
  '3xl': getSize('3xl'),
  '4xl': getSize('4xl'),
  '5xl': getSize('5xl'),
  '6xl': getSize('6xl'),
  full: getSize('full'),
};

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: { size: '2xl' },
});
