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
test("battleship coords should be [1, 2] to [1, 5]", () => {
    expect(player.battleship.coordinates).toEqual([
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
    ]);
});

player.recieveAttack([2, 1]);
player.recieveAttack([1, 1]);
player.recieveAttack([3, 1]);
player.recieveAttack([4, 1]);
player.recieveAttack([5, 1]);
test("carrier receives attacks at [1, 1], [3, 1], [4, 1], [5, 1] and hits should contain [[2,1]]", () => {
    expect(player.carrier.hits).toEqual([
        [2, 1],
        [1, 1],
        [3, 1],
        [4, 1],
        [5, 1],
    ]);
});

test("carrier has took 5 hits and should be sunk", () => {
    expect(player.carrier.sink).toBe(true);
});

test("1 ship has sunk, therefore the sink count is 1", () => {
    expect(player.countSunk()).toBe(1);
});
