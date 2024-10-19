export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }
    }

    public asNameString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public getComponent(i: number): string {
        // TODO: what if oob?
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        // TODO: what if oob?
        this.components[i] = c;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public insert(i: number, c: string): void {
        // TODO: what if oob?
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        // TODO: what if oob?
        this.components.splice(i);
    }

}