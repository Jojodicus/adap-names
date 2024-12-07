import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected readonly components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);

        IllegalArgumentException.assert(other.length != 0, "https://www.studon.fau.de/frm4447999_385940.html");

        this.components = other.map(s => AbstractName.unescaped(s));
    }

    clone(): StringArrayName {
        let name: StringArrayName = new StringArrayName(this.components.map(s => AbstractName.escaped(s, this.delimiter)), this.delimiter);
        return name;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        this.checkBounds(i);
        return AbstractName.escaped(this.components[i], this.delimiter);
    }
    setComponent(i: number, c: string): StringArrayName {
        this.checkBounds(i);
        this.checkEscapement(c);

        let newComponents = this.components.slice().map(s => AbstractName.escaped(s, this.delimiter));
        newComponents[i] = c;
        return new StringArrayName(newComponents, this.delimiter);
    }

    insert(i: number, c: string): StringArrayName {
        this.checkEscapement(c);
        if (i != this.components.length) {
            this.checkBounds(i);
        }

        let newComponents = this.components.slice().map(s => AbstractName.escaped(s, this.delimiter));
        newComponents.splice(i, 0, c);
        return new StringArrayName(newComponents, this.delimiter);
    }
    append(c: string): StringArrayName {
        this.checkEscapement(c);

        let newComponents = this.components.slice().map(s => AbstractName.escaped(s, this.delimiter));
        newComponents.push(c);
        return new StringArrayName(newComponents, this.delimiter);
    }
    remove(i: number): StringArrayName {
        this.checkBounds(i);

        let newComponents = this.components.slice().map(s => AbstractName.escaped(s, this.delimiter));
        newComponents.splice(i, 1);
        return new StringArrayName(newComponents, this.delimiter);
    }
}