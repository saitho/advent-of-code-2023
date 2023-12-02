// e.g. Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
function parseGames(gameString) {
    const regex = /^Game (\d+): (.*)$/;
    let m;
    if ((m = regex.exec(gameString)) === null) {
        throw new Error('Invalid game string "' + gameString + '"')
    }
    const id = m[1]
    // e.g. 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    const games = m[2].split(';').map(g => g.trim())
    const draws = []
    for (const g of games) {
        // e.g. 3 blue, 4 red
        const result = g.split(',').map(g => g.trim().split(' '))
        const draw = {red: 0, green: 0, blue: 0}
        for (const r of result) {
            draw[r[1]] = Number(r[0])
        }
        draws.push(draw)
    }

    return {id: Number(id), draws: draws}
}

module.exports = {parseGames}