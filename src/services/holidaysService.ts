import axios from "axios";

const holidayApi: string = process.env.HOLIDAY_API || '';
let cachedYear: number | null = null;
let cachedHolidays: Date[] = [];

/**
 * Fetches holidays from the configured API.
 * Uses in-memory cache to avoid repeated requests within the same year.
 * @returns Array of holiday dates.
 */
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
