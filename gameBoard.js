const shipFactory = require("./ship");

const gameBoardFactory = () => {
    let xCoordinates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let yCoordinates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let occuppiedCoordinates = [];
    let occuppyingShip = {};

    let missedAttacks = [];
    let successfulAttacks = [];

    let carrier = shipFactory(5, [], true, [], false);
    let battleship = shipFactory(4, [], false, [], false);
    let cruiser = shipFactory(3, [], true, [], false);
    let submarine = shipFactory(3, [], null, [], false);
    let destroyer = shipFactory(2, [], null, [], false);

    setShipCoordinates(carrier, [[1, 1]], "carrier");
    setShipCoordinates(battleship, [[1, 2]], "battleship");

    function checkCoordinates(coordinates) {
        for (let coords of coordinates) {
            if (occuppiedCoordinates.includes(coords)) return false;
        }

        return true;
    }

    function randomCoordinates() {
        let xRandom = Math.round(Math.random() * 10);
        let yRandom = Math.round(Math.random() * 10);

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
    return { carrier, battleship, cruiser, submarine, destroyer, recieveAttack }; // prettier-ignore

    function arrayContains(source, target) {
        for (const array of source) {
            if (array.toString() == target.toString()) {
                return true;
            }
        }
        return false;
    }

    function recieveAttack(coords) {
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
};

let test = gameBoardFactory();

test.recieveAttack([1, 1]);
test.recieveAttack([2, 1]);
test.recieveAttack([3, 1]);
test.recieveAttack([4, 1]);
test.recieveAttack([5, 1]);

module.exports = gameBoardFactory;
