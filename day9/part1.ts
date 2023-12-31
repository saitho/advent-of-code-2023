import {findArrangements} from "./lib.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

const arrangements = findArrangements(input)

// Extrapolate
for (const arrangement of arrangements) {
    let previousIncrease = 0;
    for (const sequence of arrangement.reverse()) {
        previousIncrease += sequence[sequence.length-1]
        sequence.push(previousIncrease)
    }
}

console.log(arrangements.map(a => a.map(b => b[b.length-1]).pop()).reduce((sum, value) => sum+value))