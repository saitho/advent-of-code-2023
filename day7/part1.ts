import {getHighestCardFromList, Hand} from "./lib/card.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

// Highest to lowest
export const cardValues = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const hands: Hand[] = []
for (const line of input) {
    const lineSplit = line.split(' ')
    hands.push(new Hand(Number(lineSplit[1]), lineSplit[0].split('')))
}

let sum = 0
for (const i in hands.sort((a, b) => {
    if (a.getRank() === b.getRank()) {
        // Compare hand
        for (let i = 0; i < a.cards.length; i++) {
            if (a.cards[i] === b.cards[i]) {
                continue
            }
            return getHighestCardFromList([a.cards[i], b.cards[i]], cardValues) === a.cards[i] ? -1 : 1
        }
        return 0
    }
    return a.getRank() > b.getRank() ? -1 : 1;
}).reverse()) {
    const hand = hands[i]
    sum += hand.bet * (Number(i)+1)
    console.log(hand.cards.join('') + ' - Rank ' + hand.getRank() + ' - ' + hand.bet + ' * ' + (Number(i)+1))
}
console.log(sum)