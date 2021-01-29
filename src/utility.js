export function addCommasToNumber(num) {
    // If typeof num is number, convert to string
    if (typeof num === 'number')
        num = num.toString();
    // If num is string and string contains number and more than 3 digits
    if (typeof num === 'string' &&
        !isNaN(parseInt(num, 10)) &&
        num.length > 3
    ) {
        // Add comma after every 3rd index from end
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else // Else return the num as is
        return num;
}