const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 *
 * @param dmy_string    string (dd/MM/yyyy)
 * @returns {string}    string (yyyy-MM-dd)
 */
export const transformDateString = (dmy_string) => dmy_string.slice(6) + '-' + dmy_string.slice(3, 5) + '-' + dmy_string.slice(0, 2) ;


/**
 *
 * @param dateString      dateString (dd/MM/yyyy)
 *
 * @returns dayName/monthName   string
 */
export const getDayName = (dateString) => days[new Date(transformDateString(dateString)).getDay()];

export const getMonthName = (dateString) => months[new Date(transformDateString(dateString)).getMonth()];


/**
 *
 * @param date1     Object.Date()
 * @param date2     Object.Date()
 */
export const isFirstDateLarge = (date1, date2) => {
    const d1 = [date1.toISOString().slice(0, 4), date1.toISOString().slice(5, 7), date1.toISOString().slice(8, 10)];
    const d2 = [date2.toISOString().slice(0, 4), date2.toISOString().slice(5, 7), date2.toISOString().slice(8, 10)];
    if (d1[0] > d2[0]) return true;
    if (d1[0] === d2[0] && d1[1] > d2[1]) return true;
    return d1[0] === d2[0] && d1[1] === d2[1] && d1[2] > d2[2];
}

export const twoDatesEqual = (date1, date2) => date1.toISOString().slice(0, 10) === date2.toISOString().slice(0, 10);


/**
 *
 * @param timeString    'hh:mm' + 'am'/'pm'
 */
export const isTodayTimePassed = (timeString) => {
    let time;

    if (timeString.slice(timeString.length - 2, timeString.length) === 'am') time = [parseInt(timeString.split(':')[0]), parseInt(timeString.split(':')[1].slice(0, 3))];
    if (timeString.slice(timeString.length - 2, timeString.length) === 'pm') {
        if (parseInt(timeString.split(':')[0]) === 12) time = [12, parseInt(timeString.split(':')[1].slice(0, 3))];
        else time = [parseInt(timeString.split(':')[0])+12, parseInt(timeString.split(':')[1].slice(0, 3))];
    }

    if (time[0] < new Date().getHours()) return true;
    return time[0] === new Date().getHours() && time[1] < new Date().getMinutes();
}