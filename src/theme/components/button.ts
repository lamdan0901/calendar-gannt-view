import { defineStyleConfig, defineStyle } from '@chakra-ui/styled-system';

export default defineStyleConfig({
  defaultProps: {
    colorScheme: 'orange',
  },
  sizes: defineStyle({
    xs: {
      w: '26px',
      h: '26px',
    },
    md: {
      fontSize: '15px',
      borderRadius: 'base',
    },
    lg: {
      fontSize: '16px',
      borderRadius: 'base',
      h: '50px',
    },
  }),
  variants: {
    outline: defineStyle((props) => {
      const { colorScheme: c } = props;

      return {
        borderColor: 'gray.200',
        bg: 'white',
        color: `${c}.500`,
        _active: { bg: 'white' },
      };
    }),
    solid: defineStyle((props) => {
      const { colorScheme: c } = props;

      if (c === 'black') {
        return {
          bg: 'gray.650',
          _hover: {
            bg: 'gray.700',
          },
          _active: {
            bg: 'gray.800',
          },
        };
      }

      return {};
    }),
    menu: {
      color: 'gray.700',
      borderWidth: '1px',
      borderColor: 'gray.400',
      bg: 'white',
      fontWeight: 'normal',
      justifyContent: 'space-between',
      _hover: {
        bg: 'gray.50',
        borderColor: 'gray.600',
      },
      span: {
        textAlign: 'start',
      },
    },
  },
});
