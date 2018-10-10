import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

const collectionPath = path.join(__dirname, "../collection.json");

describe("docker", () => {
  it("works", () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = runner.runSchematic("docker", {}, Tree.empty());

    console.log(tree.files);
    expect(tree.files).toContain("/Dockerfile");
    expect(tree.files).toContain("/.dockerignore");
    expect(tree.files).toContain("/config/nginx.conf");
  });
});
