import { defineStyleConfig, defineStyle } from '@chakra-ui/styled-system';

export const Container = defineStyleConfig({
  baseStyle: defineStyle({
    maxW: 'container.lg',
  }),
});
