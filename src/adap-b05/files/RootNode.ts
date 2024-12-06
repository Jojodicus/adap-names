import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        IllegalArgumentException.assert( false, "Can't move root node");
        // null operation
    }

    public rename(bn: string): void {
        IllegalArgumentException.assert(false, "Can't rename root node");
    }

    protected doSetBaseName(bn: string): void {
        // null operation
    }

    protected assertIsValidBaseName(bn: string): void {
        const condition: boolean = (bn == ""); // Root must have "" as base name
        IllegalArgumentException.assert(condition, "invalid base name");
    }
}