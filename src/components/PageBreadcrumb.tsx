import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react";

interface BreadcrumbItem {
  pathname: string;
  label: string;
}

interface PageBreadcrumbProps extends BreadcrumbProps {
  rootItem?: BreadcrumbItem;
  items?: BreadcrumbItem[];
}

const HOME_ITEM: BreadcrumbItem = {
  pathname: "/",
  label: "Home",
};

const DEFAULT_ITEMS: BreadcrumbItem[] = [
  {
    pathname: "#",
    label: "Nested Page",
  },
];

function PageBreadcrumb({
  rootItem = HOME_ITEM,
  items = DEFAULT_ITEMS,
  ...props
}: PageBreadcrumbProps) {
  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" mb={1} />}
      {...props}
    >
      {[rootItem || HOME_ITEM, ...items]
        .filter((item) => item.label)
        .map((item) => (
          <BreadcrumbItem key={item.pathname}>
            <BreadcrumbLink color="#040404" fontSize="sm">
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
    </Breadcrumb>
  );
}

export default PageBreadcrumb;
