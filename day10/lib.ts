class CharMap {
    protected map = new Map<number, Map<number, string>>()
    public getMap() {
        return this.map
    }
    public getChar(x: number, y: number): string|undefined {
        return this.map.get(y)?.get(x)
    }
    public setChar(char: string, x: number, y: number): void {
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