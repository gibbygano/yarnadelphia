import type { Event } from "@/yarnadelphia.types.ts";
import type { VNode } from "preact";

import { useComputed, useSignal } from "@preact/signals";
import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { events, shouldAlertEvent } from "@/events.ts";

interface EventsContextValue {
  events: Event[];
  currentEvents: Event[];
  dismissedEvents: string[];
  dismissEvent: (event: Event) => void;
}

interface EventsContextProviderProps {
  children: VNode | VNode[];
}

const EventsContext = createContext<EventsContextValue | null>(null);

const EventsContextProvider = (
  { children }: EventsContextProviderProps,
) => {
  const dismissedEventIds = useSignal<Array<string>>([]);
  const currentEvents = useComputed<Array<Event>>(() =>
    events.filter((e) =>
      shouldAlertEvent(e) &&
      !dismissedEventIds.value.find((de) => de === e.key)
    )
  );

  const dismissEvent = (event: Event) => {
    dismissedEventIds.value = [...dismissedEventIds.value, event.key];
    sessionStorage.setItem(
      "dismissed",
      JSON.stringify(dismissedEventIds.value),
    );
  };

  useEffect(() => {
    const localStorageDissmissedIds = sessionStorage.getItem("dismissed");
    if (localStorageDissmissedIds) {
      dismissedEventIds.value = JSON.parse(localStorageDissmissedIds);
    }
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        currentEvents: currentEvents.value,
        dismissedEvents: dismissedEventIds.value,
        dismissEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

const useEventsContext = (): EventsContextValue => {
  const eventsContext = useContext(EventsContext);

  if (!eventsContext) {
    throw new Error(
      "useEventsContext must be used within a EventsContextProvider",
    );
  }
  return eventsContext;
};

export { EventsContextProvider, useEventsContext };
