const {readInputFile} = require("../common");

const input = readInputFile()

function makeSequence(input: number[]): number[]
{
    let sequence: number[] = []
    for (let i = 1; i < input.length; i++) {
        sequence.push(input[i]-input[i-1])
    }
    return sequence
}

const arrangements: number[][][] = []
for (const line of input) {
    const values = line.split(' ').map(v => Number(v))
    let arrangement: number[][] = [values]
    let sequence = []
    let source = values
    do {
        sequence = makeSequence(source)
        arrangement.push(sequence)
        source = sequence
    } while (sequence.filter(s => s !== 0).length)
    arrangements.push(arrangement)
}

// Extrapolate
for (const arrangement of arrangements) {
    let previousIncrease = 0;
    for (const sequence of arrangement.reverse()) {
        previousIncrease += sequence[sequence.length-1]
        sequence.push(previousIncrease)
    }
}

console.log(arrangements.map(a => a.map(b => b[b.length-1]).pop()).reduce((sum, value) => sum+value))