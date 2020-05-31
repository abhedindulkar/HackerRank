'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the candies function below.
function candies(n, arr) {
    let total_candles = 0;
    //  let previous_candle_count;
    //  let previous_candles;
    //  let previous_student_rating;
    let candyArray = [];
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            total_candles++;
            candyArray.push(1);
            //   previous_candle_count=1;
            console.log(total_candles)
        } else {
            if (arr[i] > arr[i - 1]) {

                candyArray[i] = candyArray[i - 1] + 1
                total_candles = total_candles + candyArray[i];
                //    previous_candles=count_candles;
                //    previous_student_rating=arr[i];
                console.log(total_candles)
            } else {
                total_candles++;
                //    previous_candle_count=1;
                candyArray[i] = 1;
                console.log(total_candles)
            }
        }
    }
    console.log("after first loop"+candyArray)
    for (let i = n - 1; i >= 0; i--) {
        if (arr[i] > arr[i + 1] && candyArray[i] <= candyArray[i + 1]){
            let temp=candyArray[i]; 
            candyArray[i] = candyArray[i + 1] + 1;
            total_candles=total_candles+(candyArray[i]-temp);
        }
    }
    console.log("after second loop"+candyArray);
    console.log(arr)
    return total_candles;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    const result = candies(n, arr);

    ws.write(result + '\n');

    ws.end();
}
