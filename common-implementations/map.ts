import {Coord} from "./coordinates.ts";

export class CharMap {
    protected map = new Map<number, Map<number, string>>()

    constructor(init: undefined|{sizeX: number; sizeY: number, char?: string} = undefined) {
        if (init) {
            for (let y = 0; y < init.sizeY; y++) {
                this.map.set(y, new Map())
                for (let x = 0; x < init.sizeX; x++) {
                    this.map.get(y)?.set(x, init?.char || '')
                }
            }
        }
    }

    public toCoords(filter: ((char: string) => boolean)|undefined = undefined): Coord[] {
        const coords: Coord[] = []
        let counter = 1

        this.map.forEach((value, y) => {
            let countX = 0
            value.forEach((value1, x) => {
                if (filter !== undefined && filter(value1)) {
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

    public countX(): number {
        return Math.max(...[...this.map.values()].map(m => m.size))
    }

    public rangeX(): { from: number, to: number } {
        const allXIndexes = [...this.map.values()].map(m => [...m.keys()]).reduce((total, curr) => {
            total.push(...curr)
            return total
        })
        return {from: Math.min(...allXIndexes), to: Math.max(...allXIndexes)}
    }

    public rangeY(): { from: number, to: number } {
        return {from: Math.min(...this.map.keys()), to: Math.max(...this.map.keys())}
    }

    public fillMissingSpots(char = ''): void
    {
        let rangeX = this.rangeX()
        let rangeY = this.rangeY()

        for (let y = rangeY.from; y <= rangeY.to; y++) {
            for (let x = rangeX.from; x <= rangeX.to; x++) {
                if (this.getChar(x, y) === undefined) {
                    this.setChar(char, x, y)
                }
            }
        }
        // Order map by key
        this.map.forEach((value, key) => {
            this.map.set(key, new Map([...value.entries()].sort((a, b) => {
                return a[0] < b[0] ? -1 : 1
            })))
        })
        this.map = new Map([...this.map.entries()].sort((a, b) => {
            return a[0] < b[0] ? -1 : 1
        }))
    }

    public print(): string {
        let lines: string[] = []
        this.map.forEach((value, y) => {
            const line: string[] = []
            value.forEach((value1, x) => {
                line.push(value1)
            })
            lines.push(line.join(''))
        })

        return lines.join("\n")
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

    public indexesX(filter: ((value: string[], x: number) => boolean)|undefined = undefined): number[] {
        const indexes: number[] = []
        this.forX((values, index) => {
            if (filter !== undefined && !filter(values, index)) {
                return
            }
            indexes.push(index)
        })
        return indexes
    }

    public indexesY(filter: ((value: string[], index: number) => boolean)|undefined = undefined): number[] {
        const indexes: number[] = []
        this.forY((values, index) => {
            if (filter !== undefined && !filter(values, index)) {
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