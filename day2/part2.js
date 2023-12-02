const {parseGames, readInputFile} = require("./common");

function findFewestBag(games) {
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

const games = readInputFile().map(l => parseGames(l))
console.log(findFewestBag(games).map(bag => bag.red*bag.blue*bag.green).reduce((accumulator, pow) => accumulator + pow, 0))