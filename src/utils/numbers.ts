export function convert(value: number, conversionFactor: number): number {
    const result = value * conversionFactor;

    return parseFloat(result.toFixed(2));
}