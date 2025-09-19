import { DateTime } from "luxon";

const CO_TZ = "America/Bogota";

/**
 * Get the current date/time in Colombia as a JS Date.
 */
export function nowInColombia(): Date {
  return DateTime.now().setZone(CO_TZ).toJSDate();
}

/**
 * Convert from UTC ISO string → Colombian Date.
 * @param isoString UTC datetime string
 */
export function fromUTC(isoString: string): Date {
  return DateTime.fromISO(isoString, { zone: "utc" })
    .setZone(CO_TZ)
    .toJSDate();
}

/**
 * Convert Colombian Date → UTC Date.
 * @param date Colombian date
 */
export function toUTC(date: Date): Date {
  return DateTime.fromJSDate(date, { zone: CO_TZ })
    .toUTC()
    .toJSDate();
}
