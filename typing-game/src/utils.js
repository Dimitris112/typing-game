export function calculateAccuracy(input, expected) {
    if (!input) return 100;
    const correct = input.split('').filter((char, i) => char === expected[i]).length;
    return Math.round((correct / expected.length) * 100);
}
