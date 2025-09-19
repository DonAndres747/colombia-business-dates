import { getHolidays } from "./holidaysService";

export async function getBusinessDateByDays(date: Date, days: number): Promise<Date> {
    let newDate: Date = new Date(date);
    const holidays: Date[] = await getHolidays();
    const weekend: number[] = [6, 0];


    if (weekend.includes(newDate.getDay()) && newDate.getHours() > 17) {
        newDate.setHours(17, 0, 0, 0);
    }

    if (newDate.getHours() == 12) {
        newDate.setMinutes(0, 0, 0);
    }

    while (days > 0) {
        newDate.setDate(newDate.getDate() + 1);

        const isHoliday = holidays.some(h =>
            h.getFullYear() === newDate.getFullYear() &&
            h.getMonth() === newDate.getMonth() &&
            h.getDate() === newDate.getDate()
        );

        if (!weekend.includes(newDate.getDay()) && !isHoliday) {
            days -= 1
        };
    }

    return newDate;
}

export async function getBusinessDateByHour(date: Date, hours: number): Promise<Date> {
    let newDate: Date = new Date(date);
    let currentHour: number = newDate.getHours();
    const weekend: number[] = [6, 0];
    const maxHour: number = 16;

    if (currentHour + hours > maxHour || (currentHour + hours == maxHour && newDate.getMinutes() > 0)) {
        newDate = await getBusinessDateByDays(newDate, 1);
        newDate.setHours(8, 0, 0, 0);

        if (maxHour - currentHour > 0) {
            currentHour = (hours - (maxHour + 1 - currentHour));
            newDate = await getBusinessDateByHour(newDate, currentHour);
        } else {
            newDate = await getBusinessDateByHour(newDate, hours);
        }
    } else {

        if (weekend.includes(newDate.getDay())) {
            newDate = await getBusinessDateByDays(newDate, 1);
            newDate.setHours(8, 0, 0, 0);
        }

        newDate.setHours(newDate.getHours() + hours);

        if (newDate.getHours() >= 12 && date.getHours() < 12) {
            newDate.setHours(newDate.getHours() + 1);
        }
    }

    return newDate;
}