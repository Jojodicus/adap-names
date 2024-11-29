import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { AssertionDispatcher, ExceptionType } from "../common/AssertionDispatcher";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);

        AssertionDispatcher.dispatch(ExceptionType.PRECONDITION, other.length != 0, "https://www.studon.fau.de/frm4447999_385940.html");

        this.components = other.map(s => AbstractName.unescaped(s));
    }

    clone(): StringArrayName {
        let name: StringArrayName = new StringArrayName([""], this.delimiter);
        name.components = this.components;
        return name;
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
        this.checkEscapement(c);
        this.components[i] = AbstractName.unescaped(c);
    }

    insert(i: number, c: string) {
        this.checkEscapement(c);
        if (i != this.components.length) {
            this.checkBounds(i);
        }
        this.components.splice(i, 0, AbstractName.unescaped(c));
    }
    append(c: string) {
        this.checkEscapement(c);
        this.components.push(AbstractName.unescaped(c));
    }
    remove(i: number) {
        this.checkBounds(i);
        this.components.splice(i, 1);
    }
}