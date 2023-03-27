const gameBoardFactory = require("./gameBoard");

let player = gameBoardFactory();

player.setShipCoordinates(0, [[1, 1]], true);

console.log(player.ships[0].getSize());
console.log(player.ships[0].getCoordinates());
console.log(player.shipCoordinates);

// test size of ships
test("carrier should have a size of 5", () => {
    expect(player.ships[0].getSize()).toBe(5);
});
// test("battleship should have a size of 4", () => {
//     expect(player.ship[1].getSize()).toBe(4);
// });
// test("cruiser should have a size of 3", () => {
//     expect(player.ship[2].getSize()).toBe(3);
// });
// test("submarine should have a size of 3", () => {
//     expect(player.ship[3].getSize()).toBe(3);
// });
// test("destroyer should have a size of 2", () => {
//     expect(player.ship[4].getSize()).toBe(2);
// });

test("carrier coords should be [1, 1] to [5, 1]", () => {
    expect(player.ships[0].getCoordinates()).toEqual([
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
    ]);
});
// test("battleship coords should be [1, 2] to [1, 5]", () => {
//     expect(player.battleship.coordinates).toEqual([
//         [1, 2],
//         [1, 3],
//         [1, 4],
//         [1, 5],
//     ]);
// });

player.receiveAttack([1, 1]);
player.receiveAttack([2, 1]);
player.receiveAttack([3, 1]);
player.receiveAttack([4, 1]);
player.receiveAttack([5, 1]);

test("carrier receives attacks at [1, 1], [3, 1], [4, 1], [5, 1] and hits should contain [[2,1]]", () => {
    expect(player.ships[0].getHits()).toEqual([
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
    ]);
});

test("carrier has took 5 hits and should be sunk", () => {
    expect(player.ships[0].getSink()).toBe(true);
});

test("1 ship has sunk, therefore the sink count is 1", () => {
    expect(player.countSunk()).toBe(1);
});
