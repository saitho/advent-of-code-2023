const {readInputFile} = require("../common");
const data = readInputFile()

const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

function findDigit(processData, cacheMatcher) {
    let cache = [];
    for (const i in processData) {
        const number = processData[i];
        if (isNaN(parseInt(number))) {
            cache.push(number)
            for (const key in numberMap) {
                if (cacheMatcher(cache, key)) {
                    return numberMap[key];
                }
            }
        } else {
            return number;
        }
    }
    return 0;
}

let sum = 0
for (const t of data) {
    let processData = t.toString().split('');
    
    const first = findDigit(processData, (cache, key) => cache.join('').endsWith(key))
    const last = findDigit(processData.reverse(), (cache, key) => [...cache].reverse().join('').startsWith(key))

    sum += Number(first*10)+Number(last);
}

console.log('---');
console.log(sum);