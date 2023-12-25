import {hash} from "./lib.ts";

const {readInputFile} = require("../common");

const input = readInputFile()[0]
const words = input.split(',')

const map = new Map<number, Map<string, number>>

function setData(index: number, label: string, value: number) {
    if (!map.has(index)) {
        map.set(index, new Map())
    }
    map.get(index)!.set(label, value)
}
function removeData(index: number, label: string) {
    if (!map.has(index)) {
        return
    }
    map.get(index)!.delete(label)
}

for (const word of words) {
    let label: string
    if (word.endsWith('-')) {
        label = word.slice(0, -1)
        removeData(hash(label), label)
    } else if (word.includes('=')) {
        const chunks = word.split('=')
        label = chunks[0]
        setData(hash(label), chunks[0], chunks[1])
    }
}

let sum = 0
map.forEach((value, box) => {
    value.forEach((strength, lense, map) => {
        let slot = [...map.keys()].indexOf(lense)
        sum += (box+1) * (slot+1) * strength
    })
})
console.log(sum)
