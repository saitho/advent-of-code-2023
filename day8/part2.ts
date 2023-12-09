const {readInputFile} = require("../common");

const input = readInputFile()

const instructions = input.shift().split('')
input.shift() // empty line
const mappings = new Map<string, {left: string; right: string}>()
for (const i of input) {
    const split = i.split('=')
    const from = split[0].trim()
    let m = /\((.*), (.*)\)/.exec(split[1].trim());
    if (m.length > 2) {
        mappings.set(from, {left: m[1], right: m[2]})
    }
}

let remainingInstructions = [...instructions]
let start = [...mappings.keys()].filter((k) => k.endsWith('A'))
let currentNodes: string[] = start
let counter = 0
do {
    const instruction = remainingInstructions.shift()
    counter++
    for (let i in currentNodes) {
        const currentNode = currentNodes[i]
        if (instruction === 'L') {
            currentNodes[i] = mappings.get(currentNode).left
        } else if (instruction === 'R') {
            currentNodes[i] = mappings.get(currentNode).right
        } else {
            throw new Error('Unknown direction "'+ instruction + '"')
        }
    }
    console.log(counter, currentNodes)
    if (!remainingInstructions.length) {
        remainingInstructions = [...instructions]
    }
} while(currentNodes.filter((k) => k.endsWith('Z')).length !== currentNodes.length);

console.log(counter)