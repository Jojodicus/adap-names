import { Exception } from "../common/Exception";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
        // this.assertClassInvariants();
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertIsValidBaseName(bn);
        this.doSetBaseName(bn);
        this.assertClassInvariants();
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        let set: Set<Node> = new Set<Node>();
        if (bn == this.getBaseName()) {
            set.add(this);
        }

        try {
            this.assertClassInvariants();
        } catch (e: any) {
            ServiceFailureException.assert(false, "unable to execute findNodes", e as Exception);
        }

        return set;
    }

    protected assertClassInvariants(): void {
        const bn: string = this.doGetBaseName();
        try {
            this.assertIsValidBaseName(bn);
        } catch {
            InvalidStateException.assert(false, "i hate this");
        }
    }

    protected assertIsValidBaseName(bn: string): void {
        const condition: boolean = (bn != ""); // Root must have "" as base name
        IllegalArgumentException.assert(condition, "invalid base name");
    }

}
