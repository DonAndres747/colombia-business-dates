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
        /* console.log("Entro en not business dates");
        console.log("antes");
        console.log(newDate); */

        newDate = setColombiaTime(newDate, { hour: 17, minute: 0, second: 0, millisecond: 0 });
        /* console.log("despues");
        console.log(newDate);  */

    }

    //if lunch time then minutes are set to 0 
    if (getColombiaHour(newDate) == 12) {
        /*       console.log("Entro en hora almuerzo por dia");
              console.log("antes");
              console.log(newDate);
       */
        newDate.setMinutes(0, 0, 0);

        /*   console.log("despues");
          console.log(newDate); */
    }

    //Adds days to the current date, skipping weekends and holidays
    while (days > 0) {
        /* console.log("iteracion");
        console.log("antes");
        console.log(newDate);
 */
        newDate.setDate(newDate.getDate() + (newDate.getDay() === 6 ? 2 : 1));
        /*      console.log("depues");
             console.log(newDate); */

        if (!isWeekend(newDate) && !isHoliday(newDate, holidays)) {
            days -= 1
        };
    }

    /*    console.log("Days return debug", {
           raw: newDate,
           iso: newDate.toISOString(),
           str: newDate.toString(),
           bogota: newDate.toLocaleString("es-CO", { timeZone: "America/Bogota" }),
       }); */

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

    console.log("hora byHours (entrada)", {
        iso: newDate.toISOString(),
        hours: getColombiaHour(newDate),
        tzOffset: newDate.getTimezoneOffset(),
        maxHour,
        currentHour
    });

    //validates if current hour + hours is business time if not, calculates new hours and conti nue the process 
    if (currentHour + hours > maxHour || (currentHour + hours == maxHour && newDate.getMinutes() > 0)) {
        console.log("entra en not bussines hours");
        console.log("antes de set hour");
        console.log(newDate);


        newDate = await getBusinessDateByDays(newDate, 1);
        newDate = setColombiaTime(newDate, { hour: 8, minute: 0, second: 0, millisecond: 0 });

        console.log("despues de set hour");
        console.log(newDate);

        if (maxHour - currentHour > 0) {
            console.log("entra en mayor a 0");

            hours = (hours - (maxHour + 1 - currentHour));
        }

        newDate = await getBusinessDateByHour(newDate, hours)

        console.log("despues de get business dates by hour");
        console.log(newDate);
    } else {
        // if yes then adds the time to the current time validating business days and lunch time.
        if (isWeekend(newDate)) {
            console.log("weekend");
            console.log("antes");
            console.log(newDate);


            newDate = await getBusinessDateByDays(newDate, 1);
            console.log("despues");
            console.log(newDate);
            newDate = setColombiaTime(newDate, { hour: 8, minute: 0, second: 0, millisecond: 0 });
            console.log("despues de sethour");
            console.log(newDate);
        }

        newDate = setColombiaTime(newDate, { hour: getColombiaHour(newDate) + hours });

        if (getColombiaHour(newDate) >= 12 && getColombiaHour(date) < 12) {
            newDate = setColombiaTime(newDate, { hour: getColombiaHour(newDate) + 1 });
        }
    }

    console.log("Hours return debug", {
        raw: newDate,
        iso: newDate.toISOString(),
        str: newDate.toString(),
        bogota: newDate.toLocaleString("es-CO", { timeZone: "America/Bogota" }),
    });

    return newDate;
} 