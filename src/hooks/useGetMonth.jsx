export function useGetMonth(monthInInt) {
    let month = "";
    let months = [
        'Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ]
    for (let i = 0; i < months.length; i++) {
        if (i === monthInInt) {
            month += months[i];
        }
    }
    return month;
}