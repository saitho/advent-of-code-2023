// Highest to lowest
const cardValues = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const handRanks = {
    FIVE_OF_A_KIND: 6,
    FOUR_OF_A_KIND: 5,
    FULL_HOUSE: 4,
    THREE_OF_A_KIND: 3,
    TWO_PAIR: 2,
    ONE_PAIR: 1,
    HIGH_CARD: 0,
}

/**
 * Sort cards from high to low
 * @param a
 * @param b
 */
function cardValueSort(a: string, b: string) {
    if (cardValues.indexOf(a) === cardValues.indexOf(b)) {
        return 0
    }
    return cardValues.indexOf(a) > cardValues.indexOf(b) ? 1 : -1
}

export function getHighestCardFromList(cards: string[]): string {
    return cards.sort(cardValueSort)[0]
}

export class Hand {
    cards: string[];
    bet: number;

    constructor(bet: number, cards: string[]) {
        this.bet = bet
        this.cards = cards
    }

    getGroupedCards(): Map<string, number> {
        const countCards = new Map<string, number>()

        for (const card of this.cards) {
            if (!countCards.has(card)) {
                countCards.set(card, 0)
            }
            countCards.set(card, countCards.get(card)+1)
        }
        return countCards
    }

    getRank(): number
    {
        const groups = this.getGroupedCards()
        const entries = [...groups.values()]
        if (groups.size === 1) {
            // Five of a kind, where all five cards have the same label: AAAAA
            return handRanks.FIVE_OF_A_KIND
        }
        if (groups.size === 2 && Math.max(...entries) === 4) {
            // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
            return handRanks.FOUR_OF_A_KIND
        }
        if (groups.size === 2 && Math.max(...entries) === 3 && Math.min(...entries) === 2) {
            // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
            return handRanks.FULL_HOUSE
        }
        if (groups.size === 3 && Math.max(...entries) === 3) {
            // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
            return handRanks.THREE_OF_A_KIND
        }
        const entriesWithout1 = entries.filter(n => n !== 1)
        if (groups.size === 3 && entriesWithout1.length === 2 && Math.max(...entriesWithout1) === 2 && Math.min(...entriesWithout1) === 2) {
            // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
            return handRanks.TWO_PAIR
        }
        if (groups.size === 4 && entriesWithout1.length === 1 && Math.max(...entriesWithout1) === 2 && Math.min(...entriesWithout1) === 2) {
            // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
            return handRanks.ONE_PAIR
        }
        return handRanks.HIGH_CARD
    }
}