// import { DateTime } from "luxon";

// const CO_TZ = "America/Bogota";

// /**
//  * Gets colombian datetime in ISO.
//  */
// export function nowInColombia(): Date {
//   return DateTime.now().setZone(CO_TZ).toISO();
// }

// /**
//  * Convert from UTC time To Colombian time.
//  */
// export function toUTC(isoString: Date): Date {
//   return DateTime.fromISO(isoString, { zone: CO_TZ }).toUTC().toISO() ?? "";
// }

// /**
//  * Convert from UTC time To Colombian time.
//  */
// export function fromUTC(isoString: string): string {
//   return DateTime.fromISO(isoString, { zone: "utc" }).setZone(CO_TZ).toISO() ?? "";
// }
