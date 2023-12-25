import {CharMap, toCharMap} from "../common-implementations/map.ts";
import {getWeights, tiltMap} from "./lib.ts";

const {readInputFile} = require("../common");

const input = readInputFile()
const map = toCharMap(input)
const tiltedMap = tiltMap(map)

console.log(getWeights(tiltedMap).reduce((sum, curr) => sum+curr))
