/* eslint-disable react/display-name */
import { useRef } from 'react';
import {
  DateFieldState,
  DateSegment as IDateSegment,
  useDateFieldState,
  useTimeFieldState,
} from 'react-stately';
import {
  useDateField,
  useDateSegment,
  useTimeField,
  useLocale,
} from 'react-aria';
import { createCalendar } from '@internationalized/date';
import { Box, FormLabel, forwardRef } from '@chakra-ui/react';
import { BoxProps } from '@chakra-ui/layout';
import { LOCALE } from '@/constants/common';

interface DateFieldProps extends Record<any, any> {
  placeholder?: string;
  disabled?: boolean;
}

export function DateField({ placeholder, disabled, ...props }: DateFieldProps) {
  const state = useDateFieldState({
    ...props,
    locale: LOCALE,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps } = useDateField(props, state, ref);

  const placeholderStyle =
    !state.value && placeholder
      ? {
          _before: {
            content: `'${placeholder}'`,
            position: 'absolute',
            left: 0,
            bg: 'white',
            color: '#6D6D6D',
            w: 'full',
            pointerEvents: 'none',
            // zIndex: 1,
            opacity: disabled ? 0.7 : 1,
            top: disabled ? '-12px' : 'unset',
          },
        }
      : {};

  return (
    <Box
      {...fieldProps}
      ref={ref}
      display="flex"
      flex={1}
      position="relative"
      {...placeholderStyle}
      _focusWithin={{ _before: { content: 'none' } }}
    >
      {disabled ? (
        <Box w={'85px'}></Box>
      ) : (
        state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))
      )}
    </Box>
  );
}

export function TimeField(props: any) {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <Box mt={2} flex={props.flex}>
      <FormLabel {...labelProps}>{props.label}</FormLabel>
      <StyledField {...fieldProps} ref={ref} display="inline-flex" pr={2}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </StyledField>
    </Box>
  );
}

export const StyledField = forwardRef<BoxProps, 'div'>(
  ({ children, ...otherProps }, ref) => {
    return (
      <Box
        position="relative"
        background="white"
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pr="1"
        pl="4"
        py=".4rem"
        h="50px"
        _hover={{
          borderColor: 'gray.400',
        }}
        _focusWithin={{
          borderColor: 'orange.500',
          boxShadow: '0 0 0 1px #FA7A13',
        }}
        {...otherProps}
        ref={ref}
        _invalid={{
          borderColor: 'red.500',
          boxShadow: '0 0 0 1px #C80000',
        }}
      >
        {children}
      </Box>
    );
  },
);

function DateSegment({
  segment,
  state,
}: {
  segment: IDateSegment;
  state: DateFieldState;
}) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <Box
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        fontVariantNumeric: 'tabular-nums',
        boxSizing: 'content-box',
      }}
      pr="1px"
      textAlign="end"
      outline="none"
      rounded="sm"
      color={
        segment.isPlaceholder
          ? '#6D6D6D'
          : !segment.isEditable
          ? '#6D6D6D'
          : 'black'
      }
      _focus={{
        background: 'orange.500',
        color: 'white',
      }}
      _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
    >
      {segment.text}
    </Box>
  );
}
