
export class Range {
    private _start: number
    private readonly _range: number
    private _destStart: number

    constructor(start: number, range: number, destStart = -1) {
        this._start = start
        this._range = range
        this._destStart = destStart
    }

    get destStart(): number {
        return this._destStart;
    }

    set destStart(value: number) {
        this._destStart = value;
    }

    applyTransformValue(): void
    {
        try {
            this._start = this.transformValue(this.start)
            this.destStart = -1
        } catch (error) {
        }
    }

    transformValue(value: number): number
    {
        if (this.destStart === -1) {
            throw new Error('Empty destStart value')
        }
        return this.destStart-this.start+value
    }

    get range(): number {
        return this._range;
    }
    get start(): number {
        return this._start;
    }

    public getSubRange(r: Range): Range|null
    {
        if (r.start+r.range-1 < this.start || r.start > this.start+this.range-1) {
            return null
        }
        const start = Math.max(r.start, this.start)
        return new Range(start, Math.min(this.start+this.range, r.start+r.range)-start)
    }

    public isInRange(input: number): boolean
    {
        return input >= this._start && input < this._start+this._range
    }
}
