import {hash} from "./lib.ts";

const {readInputFile} = require("../common");

const input = readInputFile()[0]
const words = input.split(',')

console.log(words.map(hash).reduce((sum: number, curr: number) => sum+curr))