const playerOne = require("./main.js");

test("carrier should be 5 tiles long", () => {
    expect(playerOne.carrier.lengths).toBe(5);
});
test("carrier coords should be ['A', '1'] to ['E', '1']", () => {
    expect(playerOne.carrier.coordinates).toEqual([
        ["A", "1"],
        ["B", "1"],
        ["C", "1"],
        ["D", "1"],
        ["E", "1"],
    ]);
});
