import { DateTime } from "luxon";

const CO_TZ = "America/Bogota";

/**
 * Obtiene la fecha/hora actual en Colombia como Date.
 */
export function nowInColombia(): Date {
  return DateTime.now().setZone(CO_TZ).toJSDate();
}

/**
 * Convierte una fecha (Date) desde zona Colombia a UTC.
 */
export function toUTC(date: Date): Date {
  return DateTime.fromJSDate(date, { zone: CO_TZ }).toUTC().toJSDate();
}

/**
 * Convierte un string ISO en UTC a Date en zona Colombia.
 */
export function fromUTC(isoString: string): Date {
  return DateTime.fromISO(isoString, { zone: "utc" }).setZone(CO_TZ).toJSDate();
}
