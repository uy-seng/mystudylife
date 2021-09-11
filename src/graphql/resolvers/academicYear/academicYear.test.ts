/**
 * functionality test
 *
 * 1. create 3 uuid
 * 2. test academic year schedule resolver functionality
 *    - create fixed schedule (test case 1)
 *    - create week rotation schedule (test case 2)
 *    - create day rotation schedule (test case 3)
 * 3. test academic year term resolver functionality
 *    - create term (test case 1)
 * 4. test academic year
 *    - create academic year with fixed schedule with term (test case 1)
 *    - create academic year with week rotation schedule (test case 2)
 *    - create academic year with day rotation schedule (test case 3)
 */
import { newScheduleMutation } from "src/graphql/mutation";
import { v4 as uuidv4 } from "uuid";
import { testClient } from "../../../../test/graphqlTestClient";

describe("test case 1: create academic year with fixed schedule and term", () => {
  const academicYearId = uuidv4();
  it("should create fixed schedule", async () => {
    const response = await testClient({
      source: newScheduleMutation,
      variableValues: {
        type: "fixed",
        academicYearId: academicYearId,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
  });
  it("should create terms", async () => {});
  it("should create academic year with fixed schedule and have term", () => {});
});

describe("test case 2: create academic year with week rotation schedule", () => {
  const academicYearId = uuidv4();
  it("should create week rotation schedule", async () => {
    const response = await testClient({
      source: newScheduleMutation,
      variableValues: {
        type: "weekRotation",
        academicYearId: academicYearId,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
  });
  it("should create academic year with week rotation schedule", () => {});
});

describe("test case 3: create academic year with day rotation schedule", () => {
  const academicYearId = uuidv4();
  it("should create day rotation schedule", async () => {
    const response = await testClient({
      source: newScheduleMutation,
      variableValues: {
        type: "dayRotation",
        academicYearId: academicYearId,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data).not.toBeNull();
  });
  it("should create academic year with day rotation schedule", () => {});
});
