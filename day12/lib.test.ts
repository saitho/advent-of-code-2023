import {expect, test} from "bun:test";
import {distribute, distributeAll} from "./lib.ts";

test("distribute", () => {
    //expect(
    //    distributeAll(2, 2)
    //        .map(m => [...m])
    //).toEqual([
    //    [[1, 0], [2, 2]],
    //    [[1, 1], [2, 1]],
    //    [[1, 2], [2, 0]],
    //]);

    expect(
        distributeAll(3, 1)
            .map(m => [...m])
    ).toEqual( [
        [[1, 0], [2, 1], [3, 0]],
        [[1, 1], [2, 0], [3, 0]],
        [[2, 0], [3, 1]]
    ]);
});