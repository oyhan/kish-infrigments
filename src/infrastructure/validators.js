
export function isValidNationalCode(input) {
    
    if (!/^\d{10}$/.test(input))
        return false;

    var check = +input[9];
    var sum = Array(9).fill().map((_, i) => +input[i] * (10 - i)).reduce((x, y) => x + y) % 11;
    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}

export function isValidMobileNumber(input) {
    const result = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/.test(input);
    

    return result;
}
