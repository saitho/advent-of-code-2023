export function getCombinations(totalTime: number, targetDistance: number): number[] {
    const combinations: number[] = []
    // Hold button for i
    for (let i = 0; i <= totalTime; i++) {
        let speed = i
        let remainingTime = totalTime-i
        if (speed*remainingTime > targetDistance) {
            combinations.push(i)
        }
    }
    return combinations
}