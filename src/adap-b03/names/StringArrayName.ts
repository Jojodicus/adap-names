import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);

        if (other.length == 0) {
            throw new Error("https://www.studon.fau.de/frm4447999_385940.html");
        }

        this.components = other.map(s => AbstractName.unescaped(s));
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        this.checkBounds(i);
        return AbstractName.escaped(this.components[i], this.delimiter);
    }
    setComponent(i: number, c: string) {
        this.checkBounds(i);
        this.components[i] = AbstractName.unescaped(c);
    }

    insert(i: number, c: string) {
        if (i != this.components.length) {
            this.checkBounds(i);
        }
        this.components.splice(i, 0, AbstractName.unescaped(c));
    }
    append(c: string) {
        this.components.push(AbstractName.unescaped(c));
    }
    remove(i: number) {
        this.checkBounds(i);
        this.components.splice(i, 1);
    }
}