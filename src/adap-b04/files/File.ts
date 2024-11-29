import { Node } from "./Node";
import { Directory } from "./Directory";
import { InvalidStateException } from "../common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    protected assertClassInvariants() {
        super.assertClassInvariants();
        // this.assertHasValidFileState();
    }

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        this.assertIsInState(FileState.CLOSED);
        // do something
        // this.assertIsInState(FileState.OPEN) // postcondition
    }

    public read(noBytes: number): Int8Array {
        // read something
        return new Int8Array();
    }

    public close(): void {
        this.assertIsInState(FileState.OPEN)
        // do something
        // this.assertIsInState(FileState.CLOSED); // postcondition
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected assertIsInState(state: FileState) {
        if (state != this.doGetFileState()) {
            throw new InvalidStateException("invalid file state");
        }
    }
}