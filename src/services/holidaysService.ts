import axios from "axios";

const holidayApi: string = process.env.HOLIDAY_API || '';
let cachedYear: number | null = null;
let cachedHolidays: Date[] = [];

export const getHolidays = async (): Promise<Date[]> => {
    const currentYear: number = new Date().getFullYear();

    if (currentYear == cachedYear) {
        return cachedHolidays;
    }

    const response = await axios.get<string[]>(holidayApi);
    cachedYear = currentYear;
    
    cachedHolidays = response.data.map((dateStr) => {
        const date = new Date(dateStr);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });

    return cachedHolidays;
};
