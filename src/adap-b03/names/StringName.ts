import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

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
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr[i] = c;
        this.name = arr.join(this.delimiter);
    }

    insert(i: number, c: string) {
        if (i != this.noComponents) {
            this.checkBounds(i);
        }
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr.splice(i, 0, c);
        this.name = arr.join(this.delimiter);
        this.noComponents++;
    }
    append(c: string) {
        this.name += this.delimiter + c;
        this.noComponents++;
    }
    remove(i: number) {
        this.checkBounds(i);
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr.splice(i, 1);
        this.name = arr.join(this.delimiter);
        this.noComponents--;
    }
}