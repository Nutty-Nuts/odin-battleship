const shipFactory = require("./ship");

const gameBoardFactory = (ships, occuppied, takenCoords) => {
    let occuppiedCoordinates = [];
    let occuppyingShip = {};

    let missedAttacks = [];
    let successfulAttacks = [];

    let carrier = shipFactory(5, [], true, [], false);
    let battleship = shipFactory(4, [], false, [], false);
    let cruiser = shipFactory(3, [], true, [], false);
    let submarine = shipFactory(3, [], null, [], false);
    let destroyer = shipFactory(2, [], null, [], false);

    let ships = [carrier, battleship, cruiser, submarine, destroyer];

    setShipCoordinates(ships[0], [[1, 1]], "carrier");
    setShipCoordinates(ships[1], [[1, 2]], "battleship");

    function checkCoordinates(coordinates) {
        for (let coords of coordinates) {
            if (this.takenCoords.includes(coords)) return false;
        }

        return true;
    }

    function randomCoordinates() {
        let xRandom = 1 + Math.round(Math.random() * 9);
        let yRandom = 1 + Math.round(Math.random() * 9);

        let generatedCoordinates = [
            [xCoordinates[xRandom], yCoordinates[yRandom]],
        ];

        return generatedCoordinates;
    }

    function extendFromSource(ship) {
        let positiveExtend = false;
        let negativeExtend = false;

        let sourceCoordinates = ship.coordinates[0];
        let generatedCoordinates = [sourceCoordinates];

        if (ship.orientation) {
            if (sourceCoordinates[0] + ship.size <= 9) positiveExtend = true;
            if (sourceCoordinates[0] - ship.size >= 0) negativeExtend = true;
        } else {
            if (sourceCoordinates[1] + ship.size <= 9) positiveExtend = true;
            if (sourceCoordinates[1] - ship.size >= 0) negativeExtend = true;
        }

        if (ship.orientation) {
            if (positiveExtend && !negativeExtend) {
                for (let i = 1; i < ship.size; i++)
                    generatedCoordinates.push([sourceCoordinates[0] + i, sourceCoordinates[1]]); //prettier-ignore
            } else if (negativeExtend && !positiveExtend) {
                for (let i = 1; i < ship.size; i++)
                    generatedCoordinates.push([sourceCoordinates[0] - i, sourceCoordinates[1]]); //prettier-ignore
            } else if (positiveExtend && negativeExtend) {
                let randomExtend = Math.floor(Math.random() * 2);

                if (randomExtend == 0) {
                    for (let i = 1; i < ship.size; i++)
                        generatedCoordinates.push([sourceCoordinates[0] + i, sourceCoordinates[1]]); //prettier-ignore
                } else {
                    for (let i = 1; i < ship.size; i++)
                        generatedCoordinates.push([sourceCoordinates[0] - i, sourceCoordinates[1]]); //prettier-ignore
                }
            }
        } else {
            if (positiveExtend && !negativeExtend) {
                for (let i = 1; i < ship.size; i++)
                    generatedCoordinates.push([sourceCoordinates[0], sourceCoordinates[1] + i]); //prettier-ignore
            } else if (negativeExtend && !positiveExtend) {
                for (let i = 1; i < ship.size; i++)
                    generatedCoordinates.push([sourceCoordinates[0], sourceCoordinates[1] - i]); //prettier-ignore
            } else if (positiveExtend && negativeExtend) {
                let randomExtend = Math.floor(Math.random() * 2);

                if (randomExtend == 0) {
                    for (let i = 1; i < ship.size; i++)
                        generatedCoordinates.push([sourceCoordinates[0], sourceCoordinates[1] + i]); //prettier-ignore
                } else {
                    for (let i = 1; i < ship.size; i++)
                        generatedCoordinates.push([sourceCoordinates[0], sourceCoordinates[1] - i]); //prettier-ignore
                }
            }
        }

        return generatedCoordinates;
    }

    function setShipCoordinates(ship, coords, name) {
        if (!checkCoordinates(coords)) return;
        ship.coordinates = coords;

        let extendedCooordinates = extendFromSource(ship);

        if (!checkCoordinates(extendedCooordinates)) return;
        ship.coordinates = extendedCooordinates;

        for (let coords of extendedCooordinates)
            occuppiedCoordinates.push(coords);
        occuppyingShip[name] = extendedCooordinates;
        ship.sayHi();
    }

    function arrayContains(source, target) {
        for (const array of source) {
            if (array.toString() == target.toString()) {
                return true;
            }
        }
        return false;
    }

    function receiveAttack(coords) {
        let targetShip = "";

        if (arrayContains(occuppiedCoordinates, coords)) {
            successfulAttacks.push(coords);
            for (const [key, value] of Object.entries(occuppyingShip)) {
                for (const item of value) {
                    if (item.toString() == coords.toString()) {
                        targetShip = key;
                    }
                }
            }
        } else {
            missedAttacks.push(coords);
        }
        switch (targetShip) {
            case "carrier":
                carrier.hit(coords);
                carrier.isSunk();
                break;
        }
        console.log(
            carrier.hits,
            carrier.sink,
            carrier.hits.length,
            carrier.size
        );
    }

    function countSunk() {
        // count sink
        let sinkCount = 0;

        for (const item of ships) {
            if (item.sink) {
                sinkCount++;
            }
        }
        return sinkCount;
    }
    return { carrier, battleship, cruiser, submarine, destroyer, receiveAttack, setShipCoordinates, countSunk }; // prettier-ignore
};

let test = gameBoardFactory();

test.receiveAttack([1, 1]);
test.receiveAttack([2, 1]);
test.receiveAttack([3, 1]);
test.receiveAttack([4, 1]);
test.receiveAttack([5, 1]);

module.exports = gameBoardFactory;
