import { useGetMonth } from "./useGetMonth";

export function useDateFormatter(date) {
    let currDate = new Date(date);
    let month = useGetMonth(currDate.getMonth());

    let formattedDate = `${date.getDate()} ${month}, ${date.getFullYear()}`;
    return formattedDate;
}