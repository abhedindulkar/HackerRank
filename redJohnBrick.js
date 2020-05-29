//https://www.hackerrank.com/challenges/red-john-is-back/problem

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the redJohn function below.
function redJohnMemoised() {
    let redJohnPrimeList = {};
    let redJohnFactorialList = {};
    return function redJohn(input) {
        console.log("head " + input);
        function configuration_number(n) {
            let configurations = 0;

            if (n < 4) {
                return 1
            } else {
                // let numberOfHorizonatalBricks;
                function factorial_list() {
                    let list = {}
                    let answer = 1;
                    return function fact(number) {
                        if (number < 2) {
                            return 1
                        } else if (redJohnFactorialList[number]) {
                            return redJohnFactorialList[number];
                        } else {
                            return redJohnFactorialList[number] = number * fact(number - 1)
                        }
                        // list[number] = answer;
                        // return answer;
                    }
                }
                let numberOfBlocks = Math.floor(n / 4);

                let factorial = factorial_list();
                for (let i = 0; i <= numberOfBlocks; i++) {
                    let factans = factorial(n - (3 * i)) / factorial(n - (4 * i));
                    factans = factans / factorial(i);

                    configurations += factans;
                }
                console.log("factorial Done")
                return configurations;

            }
        }
        let answer = configuration_number(input);
        console.log(answer);
        function primeCount(number) {
            if (number === 1) {
                return 0;
            } else if (number === 2) {
                return 1;
            }
            function isPrimeList() {
                let primeList = {};
                return function (n) {
                    if (redJohnPrimeList[n] === 1) {
                        return 1;
                    } else if (redJohnPrimeList[n] === 0) {
                        return 0
                    }
                    for (let i = 2; i < n; i++) {
                        if (n % i === 0) {
                            redJohnPrimeList[n] == 0
                            return 0
                        }
                    }
                    redJohnPrimeList[n] = 1
                    return 1
                }

            }
            let isPrime = isPrimeList()
            let numberOfPrime = 1;
            for (let i = 3; i <= number; i++) {
                if (isPrime(i) === 1) {
                    numberOfPrime++;
                }
            }
            return numberOfPrime;
        }
        console.log("prime Count done");
        return primeCount(answer)
    }

}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);
   let result_memoised=redJohnMemoised()
    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        let result = result_memoised(n);

        ws.write(result + "\n");
    }

    ws.end();
}
