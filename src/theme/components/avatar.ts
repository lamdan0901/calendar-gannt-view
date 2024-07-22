import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys);

export const avatarTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: {
      bg: 'orange.500',
    },
  }),
  sizes: {
    md: {
      container: {
        width: '38px',
        height: '38px',
      },
      label: {
        fontSize: '15px',
        fontWeight: 'bold',
      },
    },
    lg: {
      container: {
        width: '54',
        height: '54px',
      },
      label: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
  },
  defaultProps: {
    size: 'md',
  },
});
