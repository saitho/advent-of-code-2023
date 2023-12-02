const fs = require('fs');

if (process.argv.length < 2) {
    console.log('missing file name')
    process.exit(1)
}

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
function parseGames(gameString) {
    const regex = /^Game (\d+): (.*)$/;
    let m;
    if ((m = regex.exec(gameString)) === null) {
        throw new Error('Invalid game string "' + gameString + '"')
    }
    const id = m[1]
    const games = m[2].split(';').map(g => g.trim())
    const draws = []
    for (const g of games) {
        const result = g.split(',').map(g => g.trim().split(' '))
        const draw = {red: 0, green: 0, blue: 0}
        for (const r of result) {
            let pulledCubes = Number(r[0])
            if (pulledCubes <= draw[r[1]]) {
                continue
            }
            draw[r[1]] = pulledCubes
        }
        draws.push(draw)
    }

    return {id: id, draws: draws}
}

function findFewest(games) {
    return games.map((g) => {
        const bag = {red: 0, green: 0, blue: 0}
        const draws = g.draws
        for (const d of draws) {
            if (d.red > bag.red) {
                bag.red = d.red;
            }
            if (d.green > bag.green) {
                bag.green = d.green;
            }
            if (d.blue > bag.blue) {
                bag.blue = d.blue;
            }
        }
        return bag;
    })
}

const lines = fs.readFileSync(process.argv[2]).toString().split('\n');
const games = lines.map(l => parseGames(l))

console.log(findFewest(games).map(bag => bag.red*bag.blue*bag.green).reduce((accumulator, pow) => accumulator + pow, 0))