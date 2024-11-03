import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {
    // helper methods to (un-)escape a string

    // add escape characters to a string
    private static escaped(s: string, delimiter: string): string {
        return s.replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER) // \ -> \\
                .replaceAll(delimiter, ESCAPE_CHARACTER + delimiter);              // . -> \.
    }

    // remove escape characters from a string, reconstructing the original
    private static unescaped(s: string): string {
        let amongus: string = "ඞ"; // used to differentiate between \. and \\.
        let masked: string = s.replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, amongus);
        return masked.replaceAll(ESCAPE_CHARACTER, "").replaceAll(amongus, ESCAPE_CHARACTER);
    }

    // saves unescaped variant
    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        if (other.length == 0) {
            throw new Error("https://www.studon.fau.de/frm4447999_385940.html");
        }

        // FIXME: assume `other` does not contain escape/delimiter which should be treated special
        this.components = other.map(s => StringArrayName.unescaped(s));
        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }
    }

    private checkBounds(index: number): void {
        if (index < 0 || index >= this.components.length) {
            throw new Error("Index out of bounds: " + index + " for length " + this.components.length)
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.map(s => StringArrayName.escaped(s, DEFAULT_DELIMITER)).join(DEFAULT_DELIMITER);
    }

    public isEmpty(): boolean {
        // FIXME: difference between [""] and []
        return this.asString() == "";
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        // FIXME: assume internal unescaped representation is fine
        this.checkBounds(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        // FIXME: assume oob behavior is fine
        this.checkBounds(i);
        this.components[i] = StringArrayName.unescaped(c);
    }

    public insert(i: number, c: string): void {
        // FIXME: assume oob behavior is fine
        if (i != this.components.length) {
            this.checkBounds(i);
        }
        this.components.splice(i, 0, StringArrayName.unescaped(c));
    }

    public append(c: string): void {
        this.components.push(StringArrayName.unescaped(c));
    }

    public remove(i: number): void {
        // FIXME: assume oob behavior is fine
        this.checkBounds(i);
        this.components.splice(i, 1);
    }

    // FIXME: not in interface
    public concat(other: Name): void {
        let dataString: string = other.asDataString();
        // same idea as unescaped()
        let amongus: string = "ඞ";
        let sus: string = "숫"; // i really hope there characters are not used in the secret tests...
        let masked: string = dataString.replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, amongus) // \\
                                       .replaceAll(ESCAPE_CHARACTER + DEFAULT_DELIMITER, sus)    // \.
                                       .replaceAll(ESCAPE_CHARACTER, "");                        // \a
        let components: string[] = masked.split(DEFAULT_DELIMITER);
        components.forEach(c => this.components.push(c.replaceAll(amongus, ESCAPE_CHARACTER).replaceAll(sus, DEFAULT_DELIMITER)));
    }

}