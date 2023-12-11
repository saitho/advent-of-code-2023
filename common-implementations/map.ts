import {Coord} from "./coordinates.ts";

export class CharMap {
    protected map = new Map<number, Map<number, string>>()

    public toCoords(filter: (char: string) => boolean = null): Coord[] {
        const coords: Coord[] = []
        let counter = 1

        this.map.forEach((value, y) => {
            let countX = 0
            value.forEach((value1, x) => {
                if (!filter || filter(value1)) {
                    coords.push({x: countX, y, label: (counter++).toString()})
                }
                countX++
            })
        })
        return coords
    }

    public getMap() {
        return this.map
    }
    public getChar(x: number, y: number): string|undefined {
        return this.map.get(y)?.get(x)
    }
    public setChar(char: string, x: number, y: number): void {
        if (!this.map.has(y)) {
            this.map.set(y, new Map<number, string>())
        }
        this.map.get(y)?.set(x, char)
    }
    public findChar(char: string): {x: number; y: number;}[] {
        const positions: {x: number; y: number;}[] = []
        this.map.forEach((value, y) => {
            value.forEach((value1, x) => {
                if (value1 === char) {
                    positions.push({x, y})
                }
            })
        })
        return positions
    }

    public countY(): number {
        return this.map.size
    }

    /**
     * Loop map by column on y axis. `value` array is characters per column (i.e. index = x axis)
     * @param callbackFn
     */
    public forY(callbackFn: (value: string[], x: number) => void) {
        const yMap = new Map<number, string[]>()
        this.map.forEach((value, x) => {
            value.forEach((value1, key) => {
                const array = yMap.get(key) || []
                array.push(value1)
                yMap.set(key, array)
            })
        })
        yMap.forEach(callbackFn)
    }

    /**
     * Loop map by row on x axis. `value` array is characters per row (i.e. index = y axis)
     * @param callbackFn
     */
    public forX(callbackFn: (value: string[], y: number) => void) {
        this.map.forEach((value, key) => {
            callbackFn([...value.values()], key)
        })
    }

    public indexesX(filter: (value: string[], x: number) => boolean = null): number[] {
        const indexes: number[] = []
        this.forX((values, index) => {
            if (filter !== null && !filter(values, index)) {
                return
            }
            indexes.push(index)
        })
        return indexes
    }

    public indexesY(filter: (value: string[], index: number) => boolean = null): number[] {
        const indexes: number[] = []
        this.forY((values, index) => {
            if (filter !== null && !filter(values, index)) {
                return
            }
            indexes.push(index)
        })
        return indexes
    }
}

export function toCharMap(input: string[]) {
    const map = new CharMap()
    for (let y = 0; y < input.length; y++) {
        const split = input[y].split('')
        const subMap = new Map<number, string>()
        for (let x = 0; x < split.length; x++) {
            subMap.set(x, split[x])
        }
        map.getMap().set(y, subMap)
    }
    return map
}