const sum = (firstNum, secondNum) => {
    return parseFloat(firstNum) + parseFloat(secondNum);
}

const divide = (firstNum, secondNum) => {
    return parseFloat(firstNum) / parseFloat(secondNum);
}

const remainder = (firstNum, secondNum) => {
    if (secondNum === '0') {
        return parseFloat(firstNum);
    }
    return parseFloat(firstNum) % parseFloat(secondNum);
}

const highestPrime = (firstNum, secondNum) => {
    const lowerNum = parseInt(firstNum < secondNum ? firstNum : secondNum);
    const higherNum = parseInt(firstNum > secondNum ? firstNum : secondNum);
    let highestPrime = 1;
    for (let i = lowerNum; i <= higherNum; i++) {
        if (isPrime(i) && i > highestPrime) {
            highestPrime = i;
        }
    }
    if (highestPrime < 2) {
        return '-'
    } else return highestPrime;

}

const isPrime = (num) => {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

export const getAllOperations = () => {
    return [
        operation("sum", sum),
        operation("divide", divide),
        operation("remainder", remainder),
        operation("highest prime", highestPrime)
    ]
}

const operation = (funcName, func) => {
    return {
        name: funcName,
        function: func
    }
}
