import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = AbstractName.escapedArray(other, this.delimiter).length;
    }

    clone(): StringName {
        return new StringName(this.name, this.delimiter);
    }

    getNoComponents(): number {
        return this.length;
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
        if (i != this.length) {
            this.checkBounds(i);
        }
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr.splice(i, 0, c);
        this.name = arr.join(this.delimiter);
        this.length++;
    }
    append(c: string) {
        this.name += this.delimiter + c;
        this.length++;
    }
    remove(i: number) {
        this.checkBounds(i);
        let arr: string[] = AbstractName.escapedArray(this.name, this.delimiter);
        arr.splice(i, 1);
        this.name = arr.join(this.delimiter);
        this.length--;
    }
}