import { getConnection } from "typeorm";

describe("setting up test environment", () => {
  it("should be test environment", () => {
    expect(process.env.NODE_ENV).toEqual("test");
  });

  it("should connect to (name: test) typeorm connection", () => {
    expect(getConnection("test")).toBeDefined();
  });
});
