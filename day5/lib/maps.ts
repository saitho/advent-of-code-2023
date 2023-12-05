import * as fs from "fs";
import {Range} from "./seeds.ts";

export function extractNumbers(input: string): number[] {
    return input.split(' ').map(n => Number(n.trim()))
}

class MapEntry extends Range {
    constructor(destinationStart: number, start: number, range: number) {
        super(start, range, destinationStart);
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
            return entry.transformValue(input)
        }
    }
    return input
}

export function sortByStart(ranges: Range[]): Range[] {
    return ranges.sort((a, b) => {
        if (a.start === b.start) {
            return 0
        }
        return a.start < b.start ? -1 : 1;
    })
}

function applyMap(r: Range, map: MapEntry[]): Range[]
{
    const ranges: Range[] = []
    let subRange = null
    for (const m of map) {
        subRange = r.getSubRange(m)
        if (subRange instanceof Range) {
            subRange.destStart = m.transformValue(subRange.start)
            break
        }
    }
    ranges.push(subRange || r)

    // Sort ranges by start, to missing ranges can be added later
    const sortedRanges = sortByStart(ranges)

    // Add missing ranges in between
    const finalRanges: Range[] = []
    let lastRangeEnd = 0;
    for (const range of sortedRanges) {
        // Range before
        if (r.start < range.start && r.start >= lastRangeEnd) {
            finalRanges.push(new Range(r.start, range.start-r.start))
        }
        finalRanges.push(range)
        lastRangeEnd = range.start+range.range

        // Range after
        const rangeEnd = r.start+r.range
        if (rangeEnd > range.start+range.range) {
            const newRangeStart = range.start+range.range+1
            finalRanges.push(new Range(newRangeStart, (rangeEnd-newRangeStart)))
        }
    }

    finalRanges.forEach((r) => {
        r.applyTransformValue()
    })

    return finalRanges
}

export function performMappingObject(input: Range[], name :string): Range[] {
    // Range object
    const map = maps[name]
    const newRanges = []
    for (const range of input) {
        const rangeSplit = applyMap(range, map)
        newRanges.push(...rangeSplit)
    }
    return newRanges
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

export function seedObjToLocation(seedObjs: Range[]): Range[]
{
    const soil = performMappingObject(seedObjs, 'seed-to-soil')
    const fertilizer = performMappingObject(soil, 'soil-to-fertilizer')
    const water = performMappingObject(fertilizer, 'fertilizer-to-water')
    const light = performMappingObject(water, 'water-to-light')
    const temperature = performMappingObject(light, 'light-to-temperature')
    const humidity = performMappingObject(temperature, 'temperature-to-humidity')
    return performMappingObject(humidity, 'humidity-to-location')
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
            write(m.destStart + ' ' + m.start + ' ' + m.range)
        }
        write('')
    }
}