export function hash(word: string) {
    let value = 0

    for (const char of word.split('')) {
        value += char.charCodeAt(0)
        value *= 17
        value %= 256
    }
    return value
}