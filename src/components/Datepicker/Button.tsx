import { useRef, MouseEvent } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

export function CalendarButton(props: FieldButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  return (
    <ChakraButton
      colorScheme="gray"
      variant="ghost"
      color="gray.600"
      {...buttonProps}
      ref={ref}
      size="sm"
      w="8"
    >
      {props.children}
    </ChakraButton>
  );
}

interface FieldButtonProps extends AriaButtonProps<'button'> {
  cProps?: ButtonProps;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function FieldButton(props: FieldButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  return (
    <ChakraButton
      color="gray.600"
      colorScheme="gray"
      variant="ghost"
      {...buttonProps}
      {...props.cProps}
      ref={ref}
      size="sm"
      mr="2"
      w={8}
      h={8}
      _focusVisible={{ bg: 'gray.100' }}
    >
      {props.children}
    </ChakraButton>
  );
}
