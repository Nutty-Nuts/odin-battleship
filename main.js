// true for horinztal, false for vertical
const ShipFactory = (lengths, coordinates, orientation, hits, sink) => {
    const hit = () => {
        hits++;
    };
    const isSunk = () => {
        if (hits == length) sink = true;
    };
    const setCoordinates = (newCoordinates) => {
        coordinates = newCoordinates;
    };
    const extendCoordinates = (inputCoordinates) => {
        coordinates.push(inputCoordinates);
    };
    return {
        lengths,
        coordinates,
        orientation,
        hits,
        sink,
        hit,
        isSunk,
        setCoordinates,
        extendCoordinates,
    };
};

const GameBoardFactory = () => {
    let yCoordinates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] // prettier-ignore
    let xCoordinates = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] // prettier-ignore

    let occuppiedCoordinates = [];

    let carrier = ShipFactory(5, [], true, 0, false);
    let battleship = ShipFactory(4, null, null, 0, false);
    let cruiser = ShipFactory(3, null, true, 0, false);
    let submarine = ShipFactory(3, null, null, 0, false);
    let destroyer = ShipFactory(2, null, null, 0, false);

    function randomCoordinates() {
        // creates random coordinates for ship
    }

    function generateShips() {
        // randomly generates ships at random coordinates
    }
    placeShips(carrier);

    function placeShips(ship) {
        // generates ship coordinates
        while (true) {
            let xRandom = Math.round(Math.random() * 9);
            let yRandom = Math.round(Math.random() * 9);
            let generatedCoordinates = [
                xCoordinates[xRandom],
                yCoordinates[yRandom],
            ];
            xRandom = 9;
            yRandom = 0;
            generatedCoordinates = ["J", "1"];
            if (occuppiedCoordinates.length == 0) {
                ship.extendCoordinates(generatedCoordinates);
                occuppiedCoordinates.push(generatedCoordinates);
            } else {
            }
            if (ship.orientation == true) {
                // check if valid horinztally
                let remainingLength = ship.lengths - 1;
                // is ship valid when extending to the right when extending to the left is not valid
                if (xRandom - ship.lengths < 0 && xRandom + ship.lengths <= 9) {
                    // extend to the right
                    for (let i = 1; i <= remainingLength; i++) {
                        console.log("this");
                        ship.extendCoordinates([
                            xCoordinates[xRandom + i],
                            yCoordinates[yRandom],
                        ]);
                    }
                } else if (
                    xRandom + ship.lengths >= 9 &&
                    xRandom - ship.lengths > 0
                ) {
                    // extend to the left
                    console.log("this");
                    for (let i = 1; i <= remainingLength; i++) {
                        ship.extendCoordinates([
                            xCoordinates[xRandom - i],
                            yCoordinates[yRandom],
                        ]);
                    }
                } else {
                    console.log("this");
                    let randomDirection = Math.random() * 1;

                    if (randomDirection == 0) {
                        // extend left
                        for (let i = 1; i <= remainingLength; i++) {
                            ship.extendCoordinates([
                                xCoordinates[xRandom - i],
                                yCoordinates[yRandom],
                            ]);
                        }
                    } else {
                        // extend right
                        for (let i = 1; i <= remainingLength; i++) {
                            ship.extendCoordinates([
                                xCoordinates[xRandom + i],
                                yCoordinates[yRandom],
                            ]);
                        }
                    }
                }
            } else if (ship.orientation == false) {
                // check of valid vertically
                let remainingLength = ship.lengths - 1;
                // is ship valid when extending to the right when extending to the left is not valid
                if (yRandom - ship.lengths < 0 && yRandom + ship.lengths <= 9) {
                    // extend to the right
                    for (let i = 1; i <= remainingLength; i++) {
                        ship.extendCoordinates([
                            xCoordinates[xRandom],
                            yCoordinates[yRandom + i],
                        ]);
                    }
                } else if (
                    yRandom + ship.lengths >= 0 &&
                    yRandom - ship.lengths > 9
                ) {
                    // extend to the left
                    for (let i = 1; i <= remainingLength; i++) {
                        ship.extendCoordinates([
                            xCoordinates[xRandom],
                            yCoordinates[yRandom - i],
                        ]);
                    }
                } else {
                    let randomDirection = Math.random() * 1;

                    if (randomDirection == 0) {
                        // extend left
                        for (let i = 1; i <= remainingLength; i++) {
                            ship.extendCoordinates([
                                xCoordinates[xRandom],
                                yCoordinates[yRandom - i],
                            ]);
                        }
                    } else {
                        // extend right
                        for (let i = 1; i <= remainingLength; i++) {
                            ship.extendCoordinates([
                                xCoordinates[xRandom],
                                yCoordinates[yRandom + i],
                            ]);
                        }
                    }
                }
            }
            break;
        }
    }
    function receiveAttack(coordinates) {
        // determines if attack hits or misses
    }
    function missedAttack() {
        // keeps track of the missed attacks
    }
    function remainingShips() {
        // counts the remainingShips
    }

    return { placeShips, carrier };
};

const PlayerFactory = () => {
    return;
};

const playerOne = GameBoardFactory();

console.log(playerOne.carrier.lengths);
console.log(playerOne.carrier.coordinates);

module.exports = playerOne;
