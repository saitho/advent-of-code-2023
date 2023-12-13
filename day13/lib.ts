
function getAllIndexes(arr: any[], val: any) {
    const indexes = [];
    let i = -1
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

export function validateSymmetry(lines: string[], symmetryVector: number[]): boolean
{
    // odd number of entries, but only one value in symmetry vector
    if (lines.length % 2 === 1 && symmetryVector.length === 1) {
        return false
    }

    // assume single number vector for initialization
    let index1 = symmetryVector[0]-1
    let index2 = symmetryVector[0]+1
    if (symmetryVector.length === 2) {
        index1 = symmetryVector[0]
        index2 = symmetryVector[1]
    }
    if (index1 < 0 || index2 >= lines.length) {
        return false
    }
    while (true) {
        if (index1 < 0 || index2 >= lines.length) {
            break
        }
        if (lines[index1] !== lines[index2]) {
            return false
        }
        index1--
        index2++
    }
    return true
}

export function findReflection(lines: string[]): number[]
{
    const allIndexesPairs = lines.map(line => getAllIndexes(lines, line))

    // Keep consecutive entries with two pairs
    let potentialSymmetries = []
    let currentSymmetrySet = []
    for (const indexPair of allIndexesPairs) {
        if (indexPair.length < 2) {
            if (currentSymmetrySet.length) {
                potentialSymmetries.push(currentSymmetrySet)
            }
            currentSymmetrySet = []
            continue
        }
        currentSymmetrySet.push(indexPair)
    }
    if (currentSymmetrySet.length) {
        potentialSymmetries.push(currentSymmetrySet)
    }

    for (const symmetrySet of potentialSymmetries) {
        if (new Set(symmetrySet.map(a => a.join('-'))).size === symmetrySet.length) {
            // no symmetry if set after removing duplicate items is the same
            continue
        }
        const symmetryIndex = symmetrySet[Math.floor(symmetrySet.length/2)]
        if (validateSymmetry(lines, symmetryIndex)) {
            return symmetryIndex
        }
    }
    return []
}