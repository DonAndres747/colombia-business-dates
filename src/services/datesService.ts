import { getHolidays } from "./holidaysService";
import { getColombiaHour, isHoliday, isWeekend, setColombiaTime, } from "../utils/dateUtils"


/**
 * Add business days to a date, skipping weekends and holidays. 
 * @param date - Start date.
 * @param days - Number of business days.
 * @returns Date advanced by given business days.
 */
export async function getBusinessDateByDays(date: Date, days: number): Promise<Date> {
    let newDate: Date = new Date(date);
    const holidays: Date[] = await getHolidays();

    //If start date is not business date then, set the start time to be a whole work day
    //8 hours
    if (isWeekend(newDate) && getColombiaHour(newDate) > 17) { 
        newDate = setColombiaTime(newDate, { hour: 17, minute: 0, second: 0, millisecond: 0 });

    }

    //if lunch time then minutes are set to 0 
    if (getColombiaHour(newDate) == 12) {
        newDate.setMinutes(0, 0, 0);
    }

    //Adds days to the current date, skipping weekends and holidays
    while (days > 0) {
        newDate.setDate(newDate.getDate() + (newDate.getDay() === 6 ? 2 : 1));

        if (!isWeekend(newDate) && !isHoliday(newDate, holidays)) {
            days -= 1
        };
    }

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
    let currentHour: number = getColombiaHour(newDate);
    const maxHour: number = 16;

    //validates if current hour + hours is business time if not, calculates new hours and conti nue the process 
    if (currentHour + hours > maxHour || (currentHour + hours == maxHour && newDate.getMinutes() > 0)) {
        newDate = await getBusinessDateByDays(newDate, 1);
        newDate = setColombiaTime(newDate, { hour: 8, minute: 0, second: 0, millisecond: 0 });

        if (maxHour - currentHour > 0) {
            hours = (hours - (maxHour + 1 - currentHour));
        }

        newDate = await getBusinessDateByHour(newDate, hours);
    } else {
        // if yes then adds the time to the current time validating business days and lunch time.
        if (isWeekend(newDate)) {
            newDate = await getBusinessDateByDays(newDate, 1);
            newDate = setColombiaTime(newDate, { hour: 8, minute: 0, second: 0, millisecond: 0 });
        }

        newDate = setColombiaTime(newDate, { hour: getColombiaHour(newDate) + hours });

        if (getColombiaHour(newDate) >= 12 && getColombiaHour(date) < 12) {
            newDate = setColombiaTime(newDate, { hour: getColombiaHour(newDate) + 1 });
        }
    }

    return newDate;
} 