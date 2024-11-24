import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Unspecified edge cases", () => {
  it("test stuff", () => {
    let n: Name = new Name(["adap-names"], '-');
    expect(n.getNoComponents()).toBe(1);

    n.append("my-repo");
    n.append("account");
    expect(n.asNameString()).toBe("adap\\-names-my\\-repo-account");
    expect(n.getNoComponents()).toBe(3);

    n.setComponent(0, "jo-jo");
    n.insert(1, "git-hub");
    n.remove(2);
    expect(n.asNameString()).toBe("jo\\-jo-git\\-hub-account");
    expect(n.getNoComponents()).toBe(3);
    expect(n.asNameString("o")).toBe("j\\o-j\\oogit-huboacc\\ount");

    expect(n.getComponent(1)).toBe("git-hub");
  })
});
