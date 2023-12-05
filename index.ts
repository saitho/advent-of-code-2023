import {execSync} from "child_process";
import * as fs from "fs";

const bunBin = process.argv[0]
const args = process.argv.slice(2)

const testFileName = args[0] || 'sample'
const day = process.env.DAY || null
const part = args[1] || 1
if (!day || !parseInt(day)) {
    console.error('Missing day number via DAY environment')
    process.exit(1)
}

const dayPath = `${__dirname}/day${day}`

const testFile = process.env.TESTFILE || testFileName + '.txt'

console.info(`Running day ${day}, part ${part} with ${testFile} data...\n`)
let filePath = `${dayPath}/part${part}.ts`
if (!fs.existsSync(filePath)) {
    filePath = `${dayPath}/part${part}.js`
}
const out = execSync(bunBin + ` ${filePath} ${dayPath}/${testFile}`)
console.log(out.toString())
console.info(`Execution finished.`)