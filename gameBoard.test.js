const gameBoardFactory = require("./gameBoard");

let player = gameBoardFactory();

// test size of ships
test("carrier should have a size of 5", () => {
    expect(player.carrier.size).toBe(5);
});
test("battleship should have a size of 4", () => {
    expect(player.battleship.size).toBe(4);
});
test("cruiser should have a size of 3", () => {
    expect(player.cruiser.size).toBe(3);
});
test("submarine should have a size of 3", () => {
    expect(player.submarine.size).toBe(3);
});
test("destroyer should have a size of 2", () => {
    expect(player.destroyer.size).toBe(2);
});

test("carrier coords should be [1, 1] to [5, 1]", () => {
    expect(player.carrier.coordinates).toEqual([
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
    ]);
});
