import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected readonly delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assert(delimiter.length == 1, "delimiter must be single character");

        let components: string[] = [];
        for(let i = 0; i < this.getNoComponents(); ++i) {
            components.push(this.getComponent(i));
        }
        return components.map(s => AbstractName.unescaped(s)).join(delimiter);
    }

    public toString(): string {
        // ???
        return this.asDataString();
    }

    public asDataString(): string {
        let components: string[] = [];
        for(let i = 0; i < this.getNoComponents(); ++i) {
            components.push(this.getComponent(i));
        }
        return components.map(
                s => AbstractName.escaped(
                    AbstractName.unescaped(s), DEFAULT_DELIMITER)
            ).join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        return this.delimiter == other.getDelimiterCharacter()
            && this.asDataString() == other.asDataString();
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.asDataString() == "";
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): Name;

    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    public concat(other: Name): Name {
        IllegalArgumentException.assert(other.getDelimiterCharacter() == this.delimiter, "Delimiters do not match");

        let runName: Name = this;
        for(let i: number = 0; i < other.getNoComponents(); ++i) {
            runName = runName.append(other.getComponent(i));
        }
        return runName;
    }

    // helper methods

    protected checkBounds(index: number): void {
        IllegalArgumentException.assert(index >= 0 && index < this.getNoComponents(), `Index out of bounds: ${index} for length ${this.getNoComponents()}`);
    }

    // add escape characters to a string
    protected static escaped(s: string, delimiter: string): string {
        return s.replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER) // \ -> \\
                .replaceAll(delimiter, ESCAPE_CHARACTER + delimiter);              // . -> \.
    }

    // remove escape characters from a string, reconstructing the original
    protected static unescaped(s: string): string {
        let amongus: string = "ඞ"; // used to differentiate between \. and \\.
        let masked: string = s.replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, amongus);
        return masked.replaceAll(ESCAPE_CHARACTER, "").replaceAll(amongus, ESCAPE_CHARACTER);
    }

    // remove escape characters and construct string array
    protected static unescapedArray(s: string, delimiter: string): string[] {
        let amongus: string = "ඞ";
        let sus: string = "숫"; // i really hope there characters are not used in the secret tests...
        let masked: string = s.replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, amongus) // \\
                              .replaceAll(ESCAPE_CHARACTER + delimiter, sus)            // \.
                              .replaceAll(ESCAPE_CHARACTER, "")                         // \a
        let components: string[] = masked.split(delimiter);
        return components.map(c => c.replaceAll(amongus, ESCAPE_CHARACTER).replaceAll(sus, delimiter));
    }

    // construct string array, but keep escape characters
    protected static escapedArray(s: string, delimiter: string): string[] {
        let amongus: string = "ඞ";
        let sus: string = "숫";
        let masked: string = s.replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, amongus) // \\
                              .replaceAll(ESCAPE_CHARACTER + delimiter, sus)            // \.
        let components: string[] = masked.split(delimiter);
        return components.map(c => c.replaceAll(amongus, ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                                    .replaceAll(sus, ESCAPE_CHARACTER + delimiter));
    }

    protected static isEscapedComponent(s: string, delimiter: string): boolean {
        let amongus: string = "ඞ";
        let sus: string = "숫";
        let masked: string = s.replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, amongus) // \\
                              .replaceAll(ESCAPE_CHARACTER + delimiter, sus)            // \.
        return !masked.includes(ESCAPE_CHARACTER) && !masked.includes(delimiter);
    }

    protected checkEscapement(s: string): void {
        if (!AbstractName.isEscapedComponent(s, this.getDelimiterCharacter())) {
            // to hell with the assertion dispatcher, unreadable pile of junk
            IllegalArgumentException.assert(false, `String not escpaed: ${s}`);
        }
    }
}