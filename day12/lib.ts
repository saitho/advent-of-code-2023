/**
 * distribute `items` number of items to `totalNumber` pots
 * @param totalNumber
 * @param items
 * @param currentNumber
 */
export function distribute(totalNumber: number, items: number, currentNumber = 1): Map<number, number>[] {
    const maps: Map<number, number>[] = []
    if (items <= 0) {
        const map = new Map<number, number>()
        for (let i = currentNumber; i <= totalNumber; i++) {
            map.set(i, 0)
        }
        maps.push(map)
        return maps
    }
    if (currentNumber > totalNumber) {
        return maps
    }
    for (let i = 0; i <= items; i++) {
        const map = new Map<number, number>()
        map.set(currentNumber, i)
        const sub = distribute(totalNumber, items-i, currentNumber+1)
        sub.forEach((value, index) => {
            value.forEach((value1, key) => {
                map.set(key, value1)
            })
        })
        maps.push(map)
    }
    return maps
}

export function distributeAll(totalNumber: number, items: number): Map<number, number>[] {
    const maps: Map<number, number>[] = []
    const processed: string[] = []
    for (let i = 1; i <= totalNumber; i++) {
        const sub = distribute(totalNumber, items, i)
        sub.forEach((value) => {
            const totalSum = [...value].map(r => r[1]).reduce((prev: number, curr: number) => {
                return Number(prev) + Number(curr)
            })
            if (totalSum !== items) {
                // invalid result??
                return
            }
            const resultString = [...value].filter((v) => v[1] > 0).map((value) => value[0] + ':' + value[1]).sort().join(',')
            if (processed.includes(resultString)) {
                return
            }
            processed.push(resultString)
            maps.push(value)
        })
    }
    return maps
}