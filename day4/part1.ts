import {parseCard} from "./lib/card.ts";
const {readInputFile} = require("../common");

const cards = readInputFile().map(parseCard)

cards.map(c => console.log(`Card: ${c.id}, Score: ${c.getScore()}`))

console.log('Sum: ' + cards.map(c => c.getScore()).reduce((sum, curr) => sum + curr))