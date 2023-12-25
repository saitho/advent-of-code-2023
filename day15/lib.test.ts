import {expect, test} from "bun:test";
import {hash} from "./lib.ts";

test("hash", () => {
    expect(hash('HASH')).toEqual(52)
});