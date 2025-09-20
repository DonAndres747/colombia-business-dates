import { DateTime } from "luxon";

const CO_TZ = "America/Bogota";

/**
 * Retrieves the actual datetime from Colombia as Date.
 */
export function nowInColombia(): Date {
  return DateTime.now().setZone(CO_TZ).toJSDate();
}

/**
 * Converts a date from Colombian time to UTC.
 */
export function toUTC(date: Date): Date {
  return DateTime.fromJSDate(date, { zone: CO_TZ }).toUTC().toJSDate();
}

/**
 * Convert an ISO UTC string to Colombian Date.  
 */
export function fromUTC(isoString: string): Date {
  return DateTime.fromISO(isoString, { zone: "utc" }).setZone(CO_TZ).toJSDate();
}

/**
 * Retrieves Colombian hour from date.
 */
export function getColombiaHour(date: Date): number {
  return DateTime.fromJSDate(date, { zone: "utc" }).setZone(CO_TZ).hour;
}

/**
 * Sets and return Colombian hour and minutos from a given date.
 */
export function setColombiaTime(date: Date, timeConfig: { hour?: number, minute?: number, second?: number, millisecond?: number }): Date {
  let colombianDate = DateTime.fromJSDate(date, { zone: "utc" }).setZone(CO_TZ);

  colombianDate = colombianDate.set({
    hour: timeConfig.hour,
    minute: timeConfig.minute,
    second: timeConfig.second,
    millisecond: timeConfig.millisecond
  });

  return colombianDate.toJSDate();
}


/**
 * Check if a date falls on a weekend (Saturday or Sunday). 
 */
export function isWeekend(date: Date): boolean {
  return [6, 0].includes(date.getDay());
}

/**
 * Check if a date is a holiday from the given list.
 * Comparison ignores time-of-day. 
 */
export function isHoliday(date: Date, holidays: Date[]): boolean {
  return holidays.some(h =>
    h.getFullYear() === date.getFullYear() &&
    h.getMonth() === date.getMonth() &&
    h.getDate() === date.getDate()
  );
}
