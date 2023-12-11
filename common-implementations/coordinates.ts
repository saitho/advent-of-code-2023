import {CharMap} from "./map.ts";

export type Coord = {x: number; y: number; label?: string}

export function equalCoordsFilter(a: Coord): (b: Coord) => boolean
{
    return (b: Coord) => a.x === b.x && a.y === b.y
}
export function equalCoords(a: Coord, b: Coord): boolean
{
    return equalCoordsFilter(a)(b)
}
export function getDistance(a: Coord, b: Coord): number
{
    return Math.abs(a.x-b.x)+Math.abs(a.y-b.y)
}

export function findClosestNumber(input: number, numbers: number[]): number {
    numbers = [...new Set(numbers.sort())]
    let closestNumber: number = numbers[0]
    for (const n of numbers) {
        if (Math.abs(input-n) < Math.abs(input-closestNumber)) {
            closestNumber = n
        }
    }
    return closestNumber
}

export function findDistances(coords: Coord[], startPoint: Coord): Map<Coord, number> {
    const allCoordX = coords.map(c => c.x)
    const allCoordY = coords.map(c => c.y)

    const minX = Math.min(...allCoordX)
    const maxX = Math.max(...allCoordX)
    const minY = Math.min(...allCoordY)
    const maxY = Math.max(...allCoordY)

    // reverse map needed to get the actual coord object with may also have a label
    const reverseMap = new Map<string, Coord>()
    for (const coord of coords) {
        reverseMap.set(`${coord.x},${coord.y}`, coord)
    }

    const mapCoordToNumber = new Map<Coord, number>()
    for (const possibleX of allCoordX) {
        for (let y = minY; y <= maxY; y++) {
            if (!reverseMap.has(`${possibleX},${y}`)) {
                continue
            }
            const possibleCoord = {x: possibleX, y: y}
            if (equalCoords(startPoint, possibleCoord)) {
                continue
            }
            const distance = getDistance(startPoint, possibleCoord)
            const coordObj = reverseMap.get(`${possibleX},${y}`)
            if (!mapCoordToNumber.has(coordObj) || distance < mapCoordToNumber.get(coordObj)) {
                mapCoordToNumber.set(coordObj, distance)
            }
        }
    }
    return mapCoordToNumber
}