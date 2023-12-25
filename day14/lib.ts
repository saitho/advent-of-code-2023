import {CharMap} from "../common-implementations/map.ts";

export function tiltMap(map: CharMap, direction = 'north'): CharMap
{
    const maxX = map.countX()
    const maxY = map.countY()
    const newMap = new CharMap({sizeX: maxX, sizeY: maxY, char: '.'})

    const placeChar = (currentX: number, currentY: number) => {
        const char = map.getChar(currentX, currentY)!
        if (char !== 'O') {
            if (newMap.getChar(currentX, currentY) === '.')  {
                newMap.setChar(char, currentX, currentY)
            }
            return
        }
        let newPos = {x: currentX, y: currentY}
        let lastValidPosition
        do {
            lastValidPosition = {...newPos}
            if (direction === 'north') {
                newPos.y -= 1
            } else if (direction === 'south') {
                newPos.y += 1
            } else if (direction === 'east') {
                newPos.x += 1
            } else if (direction === 'west') {
                newPos.x -= 1
            }
        } while (newMap.getChar(newPos.x, newPos.y) === '.')
        newMap.setChar(char, lastValidPosition.x, lastValidPosition.y)
        if (lastValidPosition.x !== currentX || lastValidPosition.y !== currentY) {
            newMap.setChar('.', currentX, currentY)
        }
    }

    if (direction === 'north') {
        // top to bottom
        for (let currentY = 0; currentY < maxY; currentY++) {
            for (let currentX = 0; currentX < maxX; currentX++) {
                placeChar(currentX, currentY)
            }
        }
    } else if (direction === 'south') {
        // bottom to top
        for (let currentY = maxY-1; currentY >= 0; currentY--) {
            for (let currentX = 0; currentX < maxX; currentX++) {
                placeChar(currentX, currentY)
            }
        }
    } else if (direction === 'west') {
        // left to right
        for (let currentX = 0; currentX < maxX; currentX++) {
            for (let currentY = 0; currentY < maxY; currentY++) {
                placeChar(currentX, currentY)
            }
        }
    } else if (direction === 'east') {
        // right to left
        for (let currentX = maxX-1; currentX >= 0; currentX--) {
            for (let currentY = 0; currentY < maxY; currentY++) {
                placeChar(currentX, currentY)
            }
        }
    }
    return newMap
}

export function getWeights(map: CharMap): number[]
{
    const maxY = map.countY()
    const coords = map.findChar('O')
    return coords.map((value) => {
        return maxY-value.y
    })
}