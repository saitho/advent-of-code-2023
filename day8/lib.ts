export type Mapping = Map<string, {left: string; right: string}>

export function getNewNodeValue(currentNode: string, instruction: string, mappings: Mapping): string
{
    if (instruction === 'L') {
        return mappings.get(currentNode).left
    } else if (instruction === 'R') {
        return mappings.get(currentNode).right
    } else {
        throw new Error('Unknown direction "'+ instruction + '"')
    }
}