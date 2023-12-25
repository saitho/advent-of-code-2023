import {CharMap} from "../common-implementations/map.ts";

export function findDigSpots(map: CharMap) {
    const dugSpots = new Map<number, number[]>()
    for (const coords of map.findChar('#')) {
        if (!dugSpots.has(coords.y)) {
            dugSpots.set(coords.y, [])
        }
        dugSpots.get(coords.y)?.push(coords.x)
    }
    return dugSpots
}

export function extractPairs(array: number[], gap: number) {
    let lastNumber = null
    const pairs = []
    let alreadyConnected: number[] = []
    for (let number of array) {
        if (alreadyConnected.includes(number-1)) {
            alreadyConnected.push(number)
            lastNumber = number
            continue
        }
        if (lastNumber !== null && number-gap > lastNumber) {
            if (alreadyConnected.includes(lastNumber)) {
                lastNumber = number
                continue
            }
            if (array.includes(number+1) && array.includes(lastNumber-1)) {
                // connection to single pairs e.g. ## and # or # and ## but not ## and ##
                lastNumber = number
                continue
            }
            pairs.push([lastNumber, number])
            alreadyConnected.push(lastNumber)
            alreadyConnected.push(number)
            lastNumber = null
            continue
        }
        lastNumber = number
    }
    return pairs
}