import {debugToFile, extractNumbers, loadMaps, seedToLocation} from "./lib/maps.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

const seeds = extractNumbers(input.shift().split(': ')[1])
input.shift() // empty line
loadMaps(input)

debugToFile(seeds)

// Note: .sort()[0] without SORTING FUNCTION does NOT always return the smallest value!!!!
// WRONG: console.log(seeds.map(s => seedToLocation(s)).sort()[0])"
// Docs: "If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value."
console.log(Math.min(...seeds.map(seedToLocation)))
