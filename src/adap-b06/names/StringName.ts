import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected readonly name: string = "";
    protected readonly noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.noComponents = AbstractName.escapedArray(other, this.delimiter).length;
    }

    clone(): StringName {
        return new StringName(this.name, this.delimiter);
    }

    getNoComponents(): number {
        return this.noComponents;
    }

    getComponent(i: number): string {
        this.checkBounds(i);
        return AbstractName.escapedArray(this.name, this.delimiter)[i];
    }
    setComponent(i: number, c: string): StringName {
        this.checkBounds(i);
        this.checkEscapement(c);
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr[i] = c;
        let newName = arr.join(this.delimiter);
        this.checkClassInvariants();
        return new StringName(newName, this.delimiter);
    }

    insert(i: number, c: string): StringName {
        this.checkEscapement(c);
        if (i != this.noComponents) {
            this.checkBounds(i);
        }
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr.splice(i, 0, c);
        let newName = arr.join(this.delimiter);
        this.checkClassInvariants();
        return new StringName(newName, this.delimiter);
    }
    append(c: string): StringName {
        this.checkEscapement(c);
        let newName = this.name + this.delimiter + c;
        this.checkClassInvariants();
        return new StringName(newName, this.delimiter);
    }
    remove(i: number): StringName {
        this.checkBounds(i);
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr.splice(i, 1);
        let newName = arr.join(this.delimiter);
        this.checkClassInvariants();
        return new StringName(newName, this.delimiter);
    }

    private checkClassInvariants(): void {
        InvalidStateException.assert(this.noComponents == AbstractName.escapedArray(this.name, this.delimiter).length, "Component length broken");
    }
}