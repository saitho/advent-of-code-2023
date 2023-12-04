import {Card, parseCard} from "./lib/card.ts";
const {readInputFile} = require("../common");

const cardSet = readInputFile().map(parseCard)

let processedCards = new Map<number, number>()

function processCards (cards: Card[]) {
    let newCards = []
    if (!cards.length) {
        return newCards
    }
    for (const card of cards) {
        if (!processedCards.has(card.id)) {
            processedCards.set(card.id, 0)
        }
        processedCards.set(card.id, processedCards.get(card.id)+1)
        const matching = card.getWinningNumbers().length
        const issuedCards = []
        for (let i = matching; i > 0; i--) {
            issuedCards.push(card.id+i)
        }
        newCards.push(...issuedCards)
    }
    const newCardList = newCards.map((n) => {
        return cardSet.filter(c => c.id === n)[0] || null
    }).filter(c => c !== null) as Card[]
    return processCards(newCardList)
}

processCards(cardSet)

console.log([...processedCards.values()].reduce((p, c) => p+c))