import { getHolidays } from "./holidaysService";
import { nowInColombia, fromUTC, toUTC } from "../utils/dateUtils"


/**
 * Add business days to a date, skipping weekends and holidays. 
 * @param date - Start date.
 * @param days - Number of business days.
 * @returns Date advanced by given business days.
 */
export async function getBusinessDateByDays(date: Date, days: number): Promise<Date> {
    let newDate: Date = new Date(date);
    const holidays: Date[] = await getHolidays();

    // console.log("hora byDays");
    // console.log(newDate);


    //If start date is not business date then, set the start time to be a whole work day
    //8 hours
    if (isWeekend(newDate) && newDate.getHours() > 17) {
        newDate.setHours(17, 0, 0, 0);
    }

    //if lunch time then minutes are set to 0 
    if (newDate.getHours() == 12) {
        newDate.setMinutes(0, 0, 0);
    }

    //Adds days to the current date, skipping weekends and holidays
    while (days > 0) {
        newDate.setDate(newDate.getDate() + (newDate.getDay() === 6 ? 2 : 1));

        if (!isWeekend(newDate) && !isHoliday(newDate, holidays)) {
            days -= 1
        };
    }


    // console.log("date return");
    // console.log(fromUTC(newDate.toISOString()));
    return newDate;
}

/**
 * Add business hours to a date, respecting work hours (08–17) and lunch break at 12:00,  
 * @param date - Start date.
 * @param hours - Number of business hours.
 * @returns Date advanced by given business hours.
 */
export async function getBusinessDateByHour(date: Date, hours: number): Promise<Date> {
    let newDate: Date = new Date(date);
    let currentHour: number = newDate.getHours();
    const maxHour: number = 16;

    console.log("hora byHours (entrada)", {
        iso: newDate.toISOString(),
        hours: newDate.getHours(),
        tzOffset: newDate.getTimezoneOffset(),
        maxHour,
        currentHour
    });

    //validates if current hour + hours is business time if not, calculates new hours and continue the process 
    if (currentHour + hours > maxHour || (currentHour + hours == maxHour && newDate.getMinutes() > 0)) {
        // console.log("entra en not bussines hours");

        newDate = await getBusinessDateByDays(newDate, 1);
        newDate.setHours(8, 0, 0, 0);

        if (maxHour - currentHour > 0) {
            // console.log("entra en mayor a 0");
            
            hours = (hours - (maxHour + 1 - currentHour));
        }

        newDate = await getBusinessDateByHour(newDate, hours);
    } else {
        // if yes then adds the time to the current time validating business days and lunch time.
        if (isWeekend(newDate)) {
            newDate = await getBusinessDateByDays(newDate, 1);
            newDate.setHours(8, 0, 0, 0);
        }

        newDate.setHours(newDate.getHours() + hours);

        if (newDate.getHours() >= 12 && date.getHours() < 12) {
            newDate.setHours(newDate.getHours() + 1);
        }
    }

    console.log("date return");
    console.log(fromUTC(newDate.toISOString()));

    return newDate;
}

/**
 * Check if a date falls on a weekend (Saturday or Sunday).
 * @param date - Date to check.
 * @returns true if weekend, false otherwise.
 */
function isWeekend(date: Date): boolean {
    return [6, 0].includes(date.getDay());
}

/**
 * Check if a date is a holiday from the given list.
 * Comparison ignores time-of-day.
 * @param date - Date to check.
 * @param holidays - List of holiday dates.
 * @returns true if holiday, false otherwise.
 */
function isHoliday(date: Date, holidays: Date[]): boolean {
    return holidays.some(h =>
        h.getFullYear() === date.getFullYear() &&
        h.getMonth() === date.getMonth() &&
        h.getDate() === date.getDate()
    );
}