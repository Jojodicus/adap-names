import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { AssertionDispatcher, ExceptionType } from "../common/AssertionDispatcher";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

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
    setComponent(i: number, c: string) {
        this.checkBounds(i);
        this.checkEscapement(c);
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr[i] = c;
        this.name = arr.join(this.delimiter);
        this.checkClassInvariants();
    }

    insert(i: number, c: string) {
        this.checkEscapement(c);
        if (i != this.noComponents) {
            this.checkBounds(i);
        }
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr.splice(i, 0, c);
        this.name = arr.join(this.delimiter);
        this.noComponents++;
        this.checkClassInvariants();
    }
    append(c: string) {
        this.checkEscapement(c);
        this.name += this.delimiter + c;
        this.noComponents++;
        this.checkClassInvariants();
    }
    remove(i: number) {
        this.checkBounds(i);
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr.splice(i, 1);
        this.name = arr.join(this.delimiter);
        this.noComponents--;
        this.checkClassInvariants();
    }

    private checkClassInvariants(): void {
        AssertionDispatcher.dispatch(ExceptionType.CLASS_INVARIANT, this.noComponents == AbstractName.escapedArray(this.name, this.delimiter).length, "Component length broken");
    }
}