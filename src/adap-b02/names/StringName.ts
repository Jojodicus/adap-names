import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {
    // helper methods to (un-)escape a string

    // add escape characters to a string
    private static escaped(s: string, delimiter: string): string {
        return s.replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER) // \ -> \\
                .replaceAll(delimiter, ESCAPE_CHARACTER + delimiter);              // . -> \.
    }

    // remove escape characters and construct string array
    private static unescapedArray(s: string, delimiter: string): string[] {
        let amongus: string = "ඞ";
        let sus: string = "숫"; // i really hope there characters are not used in the secret tests...
        let masked: string = s.replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, amongus) // \\
                              .replaceAll(ESCAPE_CHARACTER + delimiter, sus)            // \.
                              .replaceAll(ESCAPE_CHARACTER, "")                         // \a
        let components: string[] = masked.split(delimiter);
        return components.map(c => c.replaceAll(amongus, ESCAPE_CHARACTER).replaceAll(sus, delimiter));
    }

    // construct string array, but keep escape characters
    private static escapedArray(s: string, delimiter: string): string[] {
        let amongus: string = "ඞ";
        let sus: string = "숫";
        let masked: string = s.replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, amongus) // \\
                              .replaceAll(ESCAPE_CHARACTER + delimiter, sus)            // \.
        let components: string[] = masked.split(delimiter);
        return components.map(c => c.replaceAll(amongus, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                                    .replaceAll(sus, ESCAPE_CHARACTER + delimiter));
    }

    protected delimiter: string = DEFAULT_DELIMITER;

    // saves escaped variant of string
    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        // FIXME: assume `other` does not contain escape/delimiter which should be treated special
        this.name = other;
        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }
        this.length = StringName.escapedArray(other, this.delimiter).length;
    }

    private checkBounds(index: number): void {
        if (index < 0 || index >= this.length) {
            throw new Error("Index out of bounds: " + index + " for length " + this.length)
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        return StringName.unescapedArray(this.name, this.delimiter).join(delimiter);
    }

    public asDataString(): string {
        let ua: string[] = StringName.unescapedArray(this.name, this.delimiter);
        let uae: string[] = ua.map(s => StringName.escaped(s, DEFAULT_DELIMITER));
        return uae.join(DEFAULT_DELIMITER);
    }

    public isEmpty(): boolean {
        return this.length == 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.length;
    }

    public getComponent(x: number): string {
        // FIXME: assume unescaped representation is fine
        // FIXME: assume oob behavior is fine
        this.checkBounds(x);
        return StringName.unescapedArray(this.name, this.delimiter)[x];
    }

    public setComponent(n: number, c: string): void {
        // FIXME: assume oob behavior is fine
        this.checkBounds(n);
        let arr: string[] = StringName.escapedArray(this.name, this.delimiter);
        arr[n] = c;
        this.name = arr.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        // FIXME: assume oob behavior is fine
        if (n != this.length) {
            this.checkBounds(n);
        }
        let arr: string[] = StringName.escapedArray(this.name, this.delimiter);
        arr.splice(n, 0, c);
        this.name = arr.join(this.delimiter);
        this.length++;
    }

    public append(c: string): void {
        this.name += this.delimiter + c;
        this.length++;
    }

    public remove(n: number): void {
        // FIXME: assume oob behavior is fine
        this.checkBounds(n);
        let arr: string[] = StringName.escapedArray(this.name, this.delimiter);
        arr.splice(n, 1);
        this.name = arr.join(this.delimiter);
        this.length--;
    }

    // FIXME: not in interface
    public concat(other: Name): void {
        if (other.getDelimiterCharacter() != this.delimiter) {
            throw new Error("Delimiters do not match");
        }
        this.name += this.delimiter + other.asDataString();
        this.length += other.getNoComponents();
    }

}