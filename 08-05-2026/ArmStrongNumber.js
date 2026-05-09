function Count(num) {
    let i = 0;
    while (num != 0) {
        i++;
        num = parseInt(num / 10);
    }

    return i;
}

console.log(Count(153))

function checkArmstrongNumber(num) {
    let temp = num;
    let sum = 0;
    let pow = Count(num)
    while (temp != 0) {
        let rem = temp % 10;
        sum += Math.pow(rem, pow)
        temp = parseInt(temp / 10);
    }

    return  
}

// console.log(checkArmstrongNumber(153))
// console.log(checkArmstrongNumber(370))
// console.log(checkArmstrongNumber(371))
// console.log(checkArmstrongNumber(407))

console.log(checkArmstrongNumber(1634))
console.log(checkArmstrongNumber(54748))
console.log(checkArmstrongNumber(548834))
console.log(checkArmstrongNumber(4679307774))
