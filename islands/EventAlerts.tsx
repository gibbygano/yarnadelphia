import { Alert } from "@/components/Alert.tsx";
import { format } from "date-fns/format";
import { useEventsContext } from "@/islands/context/EventsContext.tsx";

const EventAlerts = () => {
  const { dismissEvent, currentEvents } = useEventsContext();

  return currentEvents.map((e) => {
    return (
      <Alert
        onDismissClick={() => dismissEvent(e)}
        message={
          <div>
            <h3 class="font-bold">
              {"Vending at "}
              <a
                target="_blank"
                rel="null"
                class="link link-info"
                href={e.link}
              >
                {e.name}
              </a>
            </h3>
            <div class="text-xs">
              {`${format(e.date.start, "PPPP")} from ${
                format(e.date.start, "p")
              } - ${format(e.date.end, "p")}.`}
            </div>
          </div>
        }
      />
    );
  });
};

export default EventAlerts;
