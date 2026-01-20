const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  it("returns the hello world message when no name provided", () => {
    expect(getGreeting()).toBe("Hello world!");
  });

  it("includes the name when provided (string)", () => {
    expect(getGreeting("Alice")).toBe("Hello world! From Alice");
  });

  it("returns hello world for empty string (falsy)", () => {
    expect(getGreeting("")).toBe("Hello world!");
  });

  it("returns hello world for 0 (falsy number)", () => {
    expect(getGreeting(0)).toBe("Hello world!");
  });

  it("handles null and undefined as no name", () => {
    expect(getGreeting(null)).toBe("Hello world!");
    expect(getGreeting(undefined)).toBe("Hello world!");
  });
});
