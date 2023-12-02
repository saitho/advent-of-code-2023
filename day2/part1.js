const {readInputFile} = require("../common");
const {parseGames} = require("./common");

function evaluateGames(games, bag) {
    return games.filter((g) => {
        for (const d of g.draws) {
            if (d.red > bag.red || d.green > bag.green || d.blue > bag.blue) {
                return false;
            }
        }
        return true;
    })
}

const games = readInputFile().map(l => parseGames(l))
console.log(evaluateGames(games, {red: 12, green: 13, blue: 14}).reduce((accumulator, g) => accumulator + Number(g.id), 0))