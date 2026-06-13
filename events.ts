import type { Event } from "@/yarnadelphia.types.ts";
import { subDays } from "date-fns/subDays";

const events: Event[] = [{
  key: "6-14-2026_pip",
  name: "Pride on Passyunk",
  eventLink: "https://prideonpassyunk.com#LBsZnGpWZNlNQmvN",
  date: {
    start: new Date("06/14/2026 1:00 PM"),
    end: new Date("06/14/2026 5:00 PM"),
  },
}];

const shouldAlertEvent = (event: Event) => {
  const now = new Date();

  return event.date.end > now &&
    subDays(event.date.start, 7) <= now;
};

export { events, shouldAlertEvent };
