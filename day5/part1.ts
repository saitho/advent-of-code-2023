import {debugToFile, extractNumbers, loadMaps, seedToLocation} from "./lib/maps.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

const seeds = extractNumbers(input.shift().split(': ')[1])
input.shift() // empty line
const maps = loadMaps(input)

debugToFile(seeds)

console.log(seeds.map(s => seedToLocation(s)).sort())
