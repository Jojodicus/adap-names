import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        this.assertNodeInDir(cn);
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    protected assertNodeInDir(cn: Node): void {
        if (!this.childNodes.has(cn)) {
            throw new IllegalArgumentException("directory does not contain node");
        }
    }
}