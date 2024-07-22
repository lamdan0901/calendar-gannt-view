import { Container } from "@chakra-ui/layout";
import { ChakraProvider, Heading, HStack, Stack } from "@chakra-ui/react";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import PageHeading from "@/components/PageHeading";
import { GanttView } from "@/calendar/GanttView";
import Calendar from "@/calendar/CalendarView";
import { useState } from "react";
import theme from "@/theme";
import "@/constants/dayjs";
import "./App.css";

enum ViewType {
  Calendar,
  Gantt,
}

const CalendarPage = () => {
  const [view, setView] = useState(ViewType.Calendar);

  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Stack spacing={6} py={4}>
          <PageBreadcrumb
            items={[{ pathname: "/#calendar", label: "Calendar" }]}
          />
          <HStack alignItems={"center"}>
            <PageHeading
              onClick={() => setView(ViewType.Calendar)}
              styles={{
                title: {
                  cursor: "pointer",
                  color: view === ViewType.Calendar ? "#FA7A13" : undefined,
                },
              }}
              title={"Calendar View"}
            />
            <Heading as="h1">/</Heading>
            <PageHeading
              onClick={() => setView(ViewType.Gantt)}
              styles={{
                title: {
                  cursor: "pointer",
                  color: view === ViewType.Gantt ? "#FA7A13" : undefined,
                },
              }}
              title={"Gantt View"}
            />
          </HStack>
        </Stack>
      </Container>

      <Calendar isCurrentView={view === ViewType.Calendar} />
      <GanttView isCurrentView={view === ViewType.Gantt} />
    </ChakraProvider>
  );
};

export default CalendarPage;
