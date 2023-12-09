import {getHighestCardFromList, getRank, Hand, handRanks} from "./lib/card.ts";

const {readInputFile} = require("../common");

const input = readInputFile()

// Highest to lowest
export const cardValues = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

function getRankWithJoker(hand: Hand) {
    const groups = hand.getGroupedCards()
    const numberOfJokers = groups.get('J') || 0
    if (!numberOfJokers) {
        // No jokers in play, regular processing
        return getRank(hand)
    }
    // Jokers in play
    groups.delete('J')
    const entries = [...groups.values()]

    if (groups.size <= 1) { // only one other letter (e.g. JJJJA) or no (e.g. JJJJJ)
        // Five of a kind, where all five cards have the same label: JJJJJ
        return handRanks.FIVE_OF_A_KIND
    }
    if (Math.max(...entries) === 4-numberOfJokers) {
        // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
        return handRanks.FOUR_OF_A_KIND
    }
    // Full house is made of 2 of each + Joker. More than one Joker results in other ranks (e.g four of a kind or three of a kind)
    if (groups.size === 2 && Math.max(...entries) === 2 && Math.min(...entries) === 2 && numberOfJokers === 1) {
        // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
        return handRanks.FULL_HOUSE
    }
    if (groups.size === 3 && Math.max(...entries) === 3-numberOfJokers) {
        // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
        return handRanks.THREE_OF_A_KIND
    }

    // handRanks.TWO_PAIR
    // two pair not possible with jokers. e.g. 1JJTQ is upgraded to three of a kind. QQJTJ is four of a kind

    if (groups.size === 4 && Math.max(...entries) === 2-numberOfJokers && Math.min(...entries) === 2-numberOfJokers) {
        // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
        return handRanks.ONE_PAIR
    }
    return handRanks.HIGH_CARD
}

const hands: Hand[] = []
for (const line of input) {
    const lineSplit = line.split(' ')
    hands.push(new Hand(Number(lineSplit[1]), lineSplit[0].split('')))
}

let sum = 0
for (const i in hands.sort((a, b) => {
    const rankA = getRankWithJoker(a)
    const rankB = getRankWithJoker(b)
    if (rankA === rankB) {
        // Compare hand
        for (let i = 0; i < a.cards.length; i++) {
            if (a.cards[i] === b.cards[i]) {
                continue
            }
            return getHighestCardFromList([a.cards[i], b.cards[i]], cardValues) === a.cards[i] ? -1 : 1
        }
        return 0
    }
    return rankA > rankB ? -1 : 1;
}).reverse()) {
    const hand = hands[i]
    sum += hand.bet * (Number(i)+1)
    console.log(hand.cards.join('') + ' - Rank ' + getRankWithJoker(hand) + ' - ' + hand.bet + ' * ' + (Number(i)+1))
}
console.log(sum)