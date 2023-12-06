import {getCombinations} from "./lib/combinations.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

const time = input[0].split(': ')[1].trim().split(/\s+/).map(n => Number(n.trim()))
const distance = input[1].split(': ')[1].trim().split(/\s+/).map(n => Number(n.trim()))

let result = 1;
for (let i = 0; i < time.length; i++) {
    result *= getCombinations(time[i], distance[i]).length
}
console.log(result)
