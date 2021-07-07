const polybius = require("../src/polybius");
const expect = require("chai").expect;
describe("polybius", () => {
  it("should return 11 when given a", () => {
    let input = "a";
    let expected = "11";
    let actual = polybius.polybius(input, (encode = true));
    expect(actual).to.equal(expected);
  });
  it("should return hello world when given 3251131343 2543241341", () => {
    let input = "3251131343 2543241341";
    let expected = "hello world";
    let encode = false;
    let actual = polybius.polybius(input, encode);
    expect(actual).to.equal(expected);
  });
  it("when encoding, translates i and j to 42", () => {
    let input = "i j";
    let expected = "42 42";
    let encode = true;
    let actual = polybius.polybius(input, encode);
    expect(actual).to.equal(expected);
  });
  it("should ignore capital letters", () => {
    let input1 = "hello world";
    let encode = true;
    let input2 = "HELLO WORLD";
    let actual = polybius.polybius(input1, encode);
    let expected = polybius.polybius(input2, encode);
    expect(actual).to.equal(expected);
  });
  it("should maintain spaces when decoding", () => {
    let input = "3251131343 2543241341 3251131343 2543241341";
    let expected = "hello world hello world";
    let encode = false;
    let actual = polybius.polybius(input, encode);
    expect(actual).to.equal(expected);
  });
  it("should maintain spaces when encoding", () => {
    let expected = "3251131343 2543241341 3251131343 2543241341";
    let input = "hello world hello world";
    let encode = true;
    let actual = polybius.polybius(input, encode);
    expect(actual).to.equal(expected);
  });
  it("should return false if number of digits is odd when decoding", () => {
    let input = "3251131343 254324134";
    let encode = false;
    let actual = polybius.polybius(input, encode);
    expect(actual).to.be.false;
  });
});
