import {findArrangements} from "./lib.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

const arrangements = findArrangements(input)

// Extrapolate
for (const arrangement of arrangements) {
    let previousIncrease = 0;
    for (const sequence of arrangement.reverse()) {
        previousIncrease = sequence[0]-previousIncrease
        sequence.unshift(previousIncrease)
    }
}

console.log(arrangements.map(a => a.map(b => b[0]).pop()).reduce((sum, value) => sum+value))