import {expect, test} from "bun:test";
import {tiltMap} from "./lib.ts";
import {toCharMap} from "../day10/lib.ts";

test("tiltMap", () => {
    const input = 'O....#....\n' +
        'O.OO#....#\n' +
        '.....##...\n' +
        'OO.#O....O\n' +
        '.O.....O#.\n' +
        'O.#..O.#.#\n' +
        '..O..#O..O\n' +
        '.......O..\n' +
        '#....###..\n' +
        '#OO..#....';

    const map = toCharMap(input.split("\n"))

    expect(
        tiltMap(map, 'north').print()
    ).toEqual('OOOO.#.O..\n' +
        'OO..#....#\n' +
        'OO..O##..O\n' +
        'O..#.OO...\n' +
        '........#.\n' +
        '..#....#.#\n' +
        '..O..#.O.O\n' +
        '..O.......\n' +
        '#....###..\n' +
        '#....#....'
    );

    expect(
        tiltMap(map, 'south').print()
    ).toEqual(
        '.....#....\n' +
        '....#....#\n' +
        '...O.##...\n' +
        '...#......\n' +
        'O.O....O#O\n' +
        'O.#..O.#.#\n' +
        'O....#....\n' +
        'OO....OO..\n' +
        '#OO..###..\n' +
        '#OO.O#...O'
    );

    expect(
        tiltMap(map, 'west').print()
    ).toEqual(
        'O....#....\n' +
        'OOO.#....#\n' +
        '.....##...\n' +
        'OO.#OO....\n' +
        'OO......#.\n' +
        'O.#O...#.#\n' +
        'O....#OO..\n' +
        'O.........\n' +
        '#....###..\n' +
        '#OO..#....'
    );

    expect(
        tiltMap(map, 'east').print()
    ).toEqual(
        '....O#....\n' +
        '.OOO#....#\n' +
        '.....##...\n' +
        '.OO#....OO\n' +
        '......OO#.\n' +
        '.O#...O#.#\n' +
        '....O#..OO\n' +
        '.........O\n' +
        '#....###..\n' +
        '#..OO#....'
    );
});