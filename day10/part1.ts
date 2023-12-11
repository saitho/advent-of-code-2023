import {toCharMap} from "./lib.ts";

const {readInputFile} = require("../common");

const input = readInputFile()
const map = toCharMap(input)

const startPoint = 'S'
const startPointLocations = map.findChar(startPoint)
if (startPointLocations.length !== 1) {
    throw new Error("Unique start point not found.")
}
const startCoord = startPointLocations[0]

type Coord = {x: number; y: number}

const validJunctionTypes = ['|', '-', 'L', 'F', 'J', '7']

function determineJunctionType(coords: Coord) {
    const invalidPoints = [undefined, '.']
    const adjacentPoints = {
        left: map.getChar(coords.x-1, coords.y),
        right: map.getChar(coords.x+1, coords.y),
        top: map.getChar(coords.x, coords.y-1),
        bottom: map.getChar(coords.x, coords.y+1),
    }
    const possibleJunctions = []
    if (!invalidPoints.includes(adjacentPoints.top) && !invalidPoints.includes(adjacentPoints.bottom)) {
        possibleJunctions.push('|')
    }
    if (!invalidPoints.includes(adjacentPoints.left) && !invalidPoints.includes(adjacentPoints.right)) {
        possibleJunctions.push('-')
    }
    if (!invalidPoints.includes(adjacentPoints.top) && !invalidPoints.includes(adjacentPoints.right)) {
        possibleJunctions.push('L')
    }
    if (!invalidPoints.includes(adjacentPoints.bottom) && !invalidPoints.includes(adjacentPoints.right)) {
        possibleJunctions.push('F')
    }
    if (!invalidPoints.includes(adjacentPoints.top) && !invalidPoints.includes(adjacentPoints.left)) {
        possibleJunctions.push('J')
    }
    if (!invalidPoints.includes(adjacentPoints.bottom) && !invalidPoints.includes(adjacentPoints.left)) {
        possibleJunctions.push('7')
    }

    for (const junction of possibleJunctions) {
        console.log('junction')
    }

    if (possibleJunctions.length > 1) {
        throw Error('more than one junction found')
    }
    return possibleJunctions.shift()
}

function isValidTransition(from: string, to: string): boolean
{
    if (to === undefined) {
        return false
    }
    return to !== '.'

    if (from === '-' || to === '-') {
        return true
    }
    if (from === '|' || to === '|') {
        return true
    }
    if (from === '-' || to === '7') {
        return true
    }
    if (from === 'L' || to === '-') {
        return true
    }
    if (from === '|' || to === 'L') {
        return true
    }
    if (from === 'J' || to === '-') {
        return true
    }
    if (from === '|' || to === 'J') {
        return true
    }
    return false
}

function getPossibleCoords(coords: Coord) {
    let currentChar = map.getChar(coords.x, coords.y)!
    if (currentChar === '.') {
        return []
    }
    if (!validJunctionTypes.includes(currentChar)) {
        const junctionType = determineJunctionType(coords)!
        console.log('Replace char "' + currentChar + '" at (' + coords.x + ',' + coords.y + ') with "' + junctionType + '"')
        currentChar = junctionType
    }
    const possibleCoords: Coord[] = []
    if (currentChar === '|') {
        // top
        possibleCoords.push({x: coords.x, y: coords.y-1})
        // bottom
        possibleCoords.push({x: coords.x, y: coords.y+1})
    } else if (currentChar === '-') {
        // left
        possibleCoords.push({x: coords.x-1, y: coords.y})
        // right
        possibleCoords.push({x: coords.x+1, y: coords.y})
    } else if (currentChar === 'J') {
        // top
        possibleCoords.push({x: coords.x, y: coords.y-1})
        // left
        possibleCoords.push({x: coords.x-1, y: coords.y})
    } else if (currentChar === 'L') {
        // top
        possibleCoords.push({x: coords.x, y: coords.y-1})
        // right
        possibleCoords.push({x: coords.x+1, y: coords.y})
    } else if (currentChar === '7') {
        // left
        possibleCoords.push({x: coords.x+1, y: coords.y})
        // bottom
        possibleCoords.push({x: coords.x, y: coords.y+1})
    } else if (currentChar === 'F') {
        // right
        possibleCoords.push({x: coords.x+1, y: coords.y})
        // bottom
        possibleCoords.push({x: coords.x, y: coords.y+1})
    }
    return possibleCoords
}

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
let traverseLog = new Map<number, any[]>()

let visitedLocations: Coord[] = []
function traverse(coords: Coord, distance: number): Coord[] {
    if (distance > 0 && (coords.x === startCoord.x && coords.y === startCoord.y)) {
        return []
    }
    //console.log('visiting ' + coords.x + ',' + coords.y)
    distance++
    const possibleCoords = getPossibleCoords(coords)
    visitedLocations.push(coords)
    let currentChar = map.getChar(coords.x, coords.y)!

    const nextTraversalCoords = []
    for (const coord of possibleCoords) {
        const char = map.getChar(coord.x, coord.y)!
        if (visitedLocations.filter((v) => v.x === coord.x && v.y === coord.y).length) {
            continue
        }
        if (char === '.') {
            continue
        }
        if (char === undefined) {
            continue
        }
        if (!isValidTransition(currentChar, char)) {
            console.log('invalid transition "' + currentChar + '" -> "' + char + '"')
            continue
        }
        if (char === startPoint) {
            continue
        }
        //console.log(`check transition "${currentChar}" -> "${char}" ([${coords.x},${coords.y}] -> [${coord.x},${coord.y}])`)
        if (!traverseLog.has(distance)) {
            traverseLog.set(distance, [])
        }
        traverseLog.get(distance)!.push({char, coord})
        nextTraversalCoords.push(coord)
    }
    return nextTraversalCoords
}

let nextTraversalCoords = [startCoord]
let distance = 0
do {
    let nextCoords = []
    for (let coord of nextTraversalCoords) {
        nextCoords.push(...traverse(coord, distance))
    }
    nextTraversalCoords = nextCoords
    distance++
} while (nextTraversalCoords.length)

// 159 too low
console.log(traverseLog.size)