const {readInputFile} = require("../common");
const data = readInputFile()

let sum = 0
for (let t of data) {
    let first = -1;
    let last = -1;
    for (const number of t.toString().split('')) {
        if (!isNaN(parseInt(number))) {
            if (first === -1) {
                first = number
            } else {
                last = number
            }
        }
    }
    if (last === -1) {
        sum += Number(first+first);
    } else {
        sum += Number(first+last);
    }
}

console.log('---');
console.log(sum);
