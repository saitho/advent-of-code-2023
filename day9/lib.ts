function makeSequence(input: number[]): number[]
{
    let sequence: number[] = []
    for (let i = 1; i < input.length; i++) {
        sequence.push(input[i]-input[i-1])
    }
    return sequence
}

export function findArrangements(input: string[]) {
    const arrangements: number[][][] = []
    for (const line of input) {
        const values = line.split(' ').map(v => Number(v))
        let arrangement: number[][] = [values]
        let sequence = []
        let source = values
        do {
            sequence = makeSequence(source)
            arrangement.push(sequence)
            source = sequence
        } while (sequence.filter(s => s !== 0).length)
        arrangements.push(arrangement)
    }
    return arrangements
}
