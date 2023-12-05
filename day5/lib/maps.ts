import * as fs from "fs";

export function extractNumbers(input: string): number[] {
    return input.split(' ').map(n => Number(n.trim()))
}

class MapEntry {
    public sourceStart: number;
    public destinationStart: number;
    public rangeLength: number;
    constructor(destinationStart: number, sourceStart: number, rangeLength: number) {
        this.destinationStart = destinationStart
        this.sourceStart = sourceStart
        this.rangeLength = rangeLength
    }

    getDelta(): number
    {
        return this.destinationStart-this.sourceStart
    }

    isInRange(input: number): boolean
    {
        return input >= this.sourceStart && input < this.sourceStart+this.rangeLength
    }
}

const maps: {[name: string]: MapEntry[]} = {}

export function loadMaps(input: string[]) {
    let currentMapName = ''
    for (const str of input.filter(s => s !== '')) {
        if (str.endsWith(' map:')) {
            currentMapName = str.split(' ')[0]
            maps[currentMapName] = []
        } else {
            const entry = extractNumbers(str)
            let destinationRangeStart = entry[0]
            let sourceRangeStart = entry[1]
            let rangeLength = entry[2]
            maps[currentMapName].push(new MapEntry(destinationRangeStart, sourceRangeStart, rangeLength))
        }
    }
    return maps
}

export function performMapping(input: number, name :string): number {
    for (const entry of maps[name]) {
        if (entry.isInRange(input)) {
            return entry.getDelta()+input
        }
    }
    return input
}

export function seedToLocation(seedNumber: number): number
{
    const soil = performMapping(seedNumber, 'seed-to-soil')
    const fertilizer = performMapping(soil, 'soil-to-fertilizer')
    const water = performMapping(fertilizer, 'fertilizer-to-water')
    const light = performMapping(water, 'water-to-light')
    const temperature = performMapping(light, 'light-to-temperature')
    const humidity = performMapping(temperature, 'temperature-to-humidity')
    return performMapping(humidity, 'humidity-to-location')
}

export function debugToFile(seeds: number[]) {
    fs.writeFileSync('debug.txt', '')
    const write = (text: string) => {
        fs.appendFileSync('debug.txt', text + '\n')
    }
    write('seeds: ' + seeds.join(' '))
    write('')
    for (const key in maps) {
        write(key + ' map:')
        for (const m of maps[key]) {
            write(m.destinationStart + ' ' + m.sourceStart + ' ' + m.rangeLength)
        }
        write('')
    }
}