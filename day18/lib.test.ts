import {expect, test} from "bun:test";
import {extractPairs} from "./lib.ts";

test("extractPairs", () => {
    // .#...####.....#####.......
    expect(extractPairs([1, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19], 1)).toEqual([[1,5]])

    // .######......#.....#...#.
    expect(extractPairs([1,2,3,4,5,6,13,20,24], 1)).toEqual([[6,13], [20, 24]])

    // .######....................######...#..
    expect(extractPairs([1,2,3,4,5,6,27,28,29,30,31,32,36], 1)).toEqual([[32,36]])
});