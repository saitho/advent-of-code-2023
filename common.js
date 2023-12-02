function readInputFile() {
    if (process.argv.length < 2) {
        console.error('missing file name')
        process.exit(1)
    }
    return require('fs').readFileSync(process.argv[2]).toString().split('\n');
}

module.exports = {readInputFile}