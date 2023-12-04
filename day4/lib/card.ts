export class Card {
    id: number;
    myFields: number[];
    winningFields: number[];

    public getWinningNumbers(): number[]
    {
        return this.winningFields.filter((n) => this.myFields.includes(n))
    }

    public getScore(): number {
        const matching = this.getWinningNumbers().length
        return !matching ? 0 : Math.pow(2, matching-1)
    }
}

export function parseCard(card: string): Card
{
    const regex = /^Card\s+(\d+):\s+((?:\s*\d+)+)\s+\|\s+((?:\s*\d+)+)$/;
    const match = regex.exec(card)
    if (!match) {
        console.error(card)
        throw new Error('Unable to parse card')
    }
    const cardObj = new Card()
    cardObj.id = parseInt(match[1])
    cardObj.winningFields = match[2].split(' ').map((n) => parseInt(n.trim())).filter(n => !isNaN(n))
    cardObj.myFields = match[3].split(' ').map((n) => parseInt(n.trim())).filter(n => !isNaN(n))
    return cardObj
}