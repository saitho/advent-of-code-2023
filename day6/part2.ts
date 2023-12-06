import {getCombinations} from "./lib/combinations.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

const time = input[0].split(': ')[1].trim().replaceAll(' ', '')
const distance = input[1].split(': ')[1].trim().replaceAll(' ', '')

console.log('Time: ' + time)
console.log('Distance: ' + distance)
console.log('Combinations: ' + getCombinations(Number(time), Number(distance)).length)
