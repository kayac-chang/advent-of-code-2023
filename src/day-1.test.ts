import * as fs from "fs/promises";
import path = require("path");

const isDigit = (char: string) => /\d/.test(char);

function formDigit(value: string) {
  let left = "";
  for (let i = 0; i < value.length; i++) {
    if (isDigit(value[i])) {
      left = value[i];
      break;
    }
  }

  let right = "";
  for (let i = value.length - 1; i >= 0; i--) {
    if (isDigit(value[i])) {
      right = value[i];
      break;
    }
  }

  return Number(left + right);
}

const sum = (a: number, b: number) => a + b;

it.each([
  { input: "1abc2", expected: 12 },
  { input: "pqr3stu8vwx", expected: 38 },
  { input: "a1b2c3d4e5f", expected: 15 },
])(`fn($input) => $expected`, ({ input, expected }) => {
  expect(formDigit(input)).toBe(expected);
});

it("result should be 142", () => {
  const testcase = "1abc2\n" + "pqr3stu8vwx\n" + "a1b2c3d4e5f\n" + "treb7uchet";

  expect(
    testcase.split("\n").map(formDigit).reduce(sum)
    //
  ).toBe(142);
});

it.only("what is the sum of all of the calibration values?", async () => {
  await fs
    .readFile(path.resolve(__dirname, "day-1-input.txt"), "utf8")
    .then((input) => input.split("\n").map(formDigit).reduce(sum))
    .then(console.log);
});
