import type { Event } from "@/yarnadelphia.types.ts";
import { subDays } from "date-fns/subDays";

const events: Event[] = [
  {
    key: "6-14-2026_pip",
    name: "Pride on Passyunk",
    eventLink: "https://prideonpassyunk.com#LBsZnGpWZNlNQmvN",
    date: {
      start: new Date("06/14/2026 1:00 PM"),
      end: new Date("06/14/2026 5:00 PM"),
    },
  },
  {
    key: "8-7-2026-ffop",
    name: "First Friday On Percy Street",
    eventLink: "https://www.instagram.com/nicethingsphila/p/DbrnEackXVt/",
    date: {
      start: new Date("08/07/2026 4:00 PM"),
      end: new Date("08/07/2026 8:00 PM"),
    },
  },
  {
    key: "8-13-2026-pp",
    name: "Passyunk Passeggiata",
    eventLink:
      "https://www.visiteastpassyunk.com/events/passeggiata-d7ws3-5bkap-7xs4s",
    mapLink: "https://maps.app.goo.gl/K2uYohhhoydiuTbm9",
    date: {
      start: new Date("08/13/2026 5:00 PM"),
      end: new Date("08/13/2026 8:00 PM"),
    },
  },
  {
    key: "9-12-2026-gpsf",
    name: "GPS Fest",
    eventLink: "https://www.gpsfest.com",
    mapLink:
      "https://www.mapquest.com/us/pennsylvania/lemon-hill-park-441662049",
    date: {
      start: new Date("09/12/2026 12:00 PM"),
      end: new Date("09/12/2026 7:00 PM"),
    },
  },
];

const shouldAlertEvent = (event: Event) => {
  const now = new Date();

  return event.date.end > now && subDays(event.date.start, 7) <= now;
};

export { events, shouldAlertEvent };
