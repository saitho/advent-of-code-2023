import {CharMap} from "../common-implementations/map.ts";

export function tiltMap(map: CharMap, direction = 'north'): CharMap
{
    const maxX = map.countX()
    const maxY = map.countY()
    const newMap = new CharMap({sizeX: maxX, sizeY: maxY, char: '.'})

    // Move north -> loop map from top to bottom
    for (let currentY = 0; currentY < maxY; currentY++) {
        for (let currentX = 0; currentX < maxX; currentX++) {
            const char = map.getChar(currentX, currentY)!
            if (char !== 'O') {
                if (newMap.getChar(currentX, currentY) === '.')  {
                    newMap.setChar(char, currentX, currentY)
                }
                continue
            }
            let newPos = {x: currentX, y: currentY}
            let lastValidPosition
            do {
                lastValidPosition = {...newPos}
                newPos.y -= 1 // move north
            } while (newMap.getChar(newPos.x, newPos.y) === '.')
            newMap.setChar(char, lastValidPosition.x, lastValidPosition.y)
            if (lastValidPosition.x !== currentX || lastValidPosition.y !== currentY) {
                newMap.setChar('.', currentX, currentY)
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