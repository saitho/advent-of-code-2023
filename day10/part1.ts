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
    if (!invalidPoints.includes(adjacentPoints.top) && !invalidPoints.includes(adjacentPoints.bottom)) {
        return '|'
    } else if (!invalidPoints.includes(adjacentPoints.left) && !invalidPoints.includes(adjacentPoints.right)) {
        return '-'
    } else if (!invalidPoints.includes(adjacentPoints.top) && !invalidPoints.includes(adjacentPoints.right)) {
        return 'L'
    } else if (!invalidPoints.includes(adjacentPoints.bottom) && !invalidPoints.includes(adjacentPoints.right)) {
        return 'F'
    } else if (!invalidPoints.includes(adjacentPoints.top) && !invalidPoints.includes(adjacentPoints.left)) {
        return 'J'
    } else if (!invalidPoints.includes(adjacentPoints.bottom) && !invalidPoints.includes(adjacentPoints.left)) {
        return '7'
    }
    return ''
}

function isValidTransition(from: string, to: string): boolean
{
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
        const junctionType = determineJunctionType(coords)
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
        // left
        possibleCoords.push({x: coords.x+1, y: coords.y})
    } else if (currentChar === '7') {
        // bottom
        possibleCoords.push({x: coords.x, y: coords.y+1})
        // left
        possibleCoords.push({x: coords.x+1, y: coords.y})
    } else if (currentChar === 'F') {
        // bottom
        possibleCoords.push({x: coords.x, y: coords.y+1})
        // right
        possibleCoords.push({x: coords.x+1, y: coords.y})
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
function traverse(coords: Coord, distance: number, visitedLocations: Coord[]) {
    if (distance > 0 && (coords.x === startCoord.x && coords.y === startCoord.y)) {
        return
    }
    // .includes() does not work on objects
    if (visitedLocations.filter((v) => v.x === coords.x && v.y === coords.y).length) {
        return
    }
    if (!traverseLog.has(distance+1)) {
        traverseLog.set(distance+1, [])
    }
    const possibleCoords = getPossibleCoords(coords)
    visitedLocations.push(coords)
    let currentChar = map.getChar(coords.x, coords.y)!

    for (const coord of possibleCoords) {
        const char = map.getChar(coord.x, coord.y)!
        if (!isValidTransition(currentChar, char)) {
            continue
        }
        if (char === startPoint || char === undefined || char === '.') {
            continue
        }
        traverseLog.get(distance+1)!.push(char)
        traverse(coord, distance+1, visitedLocations)
    }
}

traverse(startCoord, 0, [])