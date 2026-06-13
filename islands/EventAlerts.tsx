import { Alert } from "@/components/Alert.tsx";
import { TbMap2 } from "@preact-icons/tb";
import { format } from "date-fns/format";
import { useEventsContext } from "@/islands/context/EventsContext.tsx";
import { IS_BROWSER } from "fresh/runtime";

const EventAlerts = () => {
  const { dismissEvent, currentEvents } = useEventsContext();

  // Prevent flashing on page reload when alert is dismissed
  if (!IS_BROWSER) {
    return null;
  }

  return currentEvents.map((e) => {
    return (
      <Alert
        onDismissClick={() => dismissEvent(e)}
        message={
          <div>
            <div class="flex flex-row font-bold items-center text-lg lg:text-base justify-center lg:justify-start">
              {"Vending at"}
              <a
                target="_blank"
                class="link link-info ml-1"
                rel="null"
                href={e.eventLink}
              >
                {e.name}
              </a>
              {e.mapLink && (
                <a
                  href={e.mapLink}
                  class="link link-info ml-1"
                  target="_blank"
                  rel="null"
                >
                  <TbMap2 />
                </a>
              )}
            </div>
            <div class="lg:text-sm">
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
