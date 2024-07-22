import {
  Heading,
  Stack,
  Text,
  StackProps,
  HeadingProps,
  TextProps,
} from "@chakra-ui/react";

interface PageHeadingProps extends StackProps {
  title: string;
  subtitle?: string;
  description?: string;
  styles?: {
    subtitle?: HeadingProps;
    title?: HeadingProps;
    description?: TextProps;
  };
}

function PageHeading({
  title = "Page title",
  subtitle,
  description,
  styles = { subtitle: { fontWeight: 400 } },
  ...props
}: PageHeadingProps) {
  return (
    <Stack spacing={0.5} {...props}>
      {subtitle && <Heading {...styles.subtitle}>{subtitle}</Heading>}
      <Heading as="h1" {...styles.title}>
        {title}
      </Heading>
      <Text {...styles.description}>{description}</Text>
    </Stack>
  );
}

export default PageHeading;
