const shipFactory = require("./ship");

const gameBoardFactory = () => {
    let xCoordinates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let yCoordinates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let occuppiedCoordinates = [];

    let carrier = shipFactory(5, [], true, 0, false);
    let battleship = shipFactory(4, [], null, 0, false);
    let cruiser = shipFactory(3, [], true, 0, false);
    let submarine = shipFactory(3, [], null, 0, false);
    let destroyer = shipFactory(2, [], null, 0, false);

    setShipCoordinates(carrier);

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
                for (let i = 1; i < ship.coordinates; i++)
                    generatedCoordinates.push(sourceCoordinates[0] - i, sourceCoordinates[1]); //prettier-ignore
            } else if (positiveExtend && negativeExtend) {
                let randomExtend = Math.floor(Math.random() * 2);

                if (randomExtend == 0) {
                    for (let i = 1; i < ship.coordinates; i++)
                        generatedCoordinates.push(sourceCoordinates[0] + i, sourceCoordinates[1]); //prettier-ignore
                } else {
                    for (let i = 1; i < ship.coordinates; i++)
                        generatedCoordinates.push(sourceCoordinates[0] - i, sourceCoordinates[1]); //prettier-ignore
                }
            }
        } else {
            if (positiveExtend && !negativeExtend) {
                for (let i = 1; i < ship.coordinates; i++)
                    generatedCoordinates.push(sourceCoordinates[0], sourceCoordinates[1] + i); //prettier-ignore
            } else if (negativeExtend && !positiveExtend) {
                for (let i = 1; i < ship.coordinates; i++)
                    generatedCoordinates.push(sourceCoordinates[0], sourceCoordinates[1] - i); //prettier-ignore
            } else if (positiveExtend && negativeExtend) {
                let randomExtend = Math.floor(Math.random() * 2);

                if (randomExtend == 0) {
                    for (let i = 1; i < ship.coordinates; i++)
                        generatedCoordinates.push(sourceCoordinates[0], sourceCoordinates[1] + i); //prettier-ignore
                } else {
                    for (let i = 1; i < ship.coordinates; i++)
                        generatedCoordinates.push(sourceCoordinates[0], sourceCoordinates[1] - i); //prettier-ignore
                }
            }
        }

        console.log(generatedCoordinates);
        return generatedCoordinates;
    }

    function setShipCoordinates(ship) {
        while (true) {
            //let newSourceCoordinates = [randomCoordinates()];
            let newSourceCoordinates = [[1, 1]];
            console.log(newSourceCoordinates);

            ship.coordinates = newSourceCoordinates;

            if (!checkCoordinates(newSourceCoordinates)) continue;

            let extendedCooordinates = extendFromSource(ship);
            console.log(extendedCooordinates);

            if (!checkCoordinates(extendedCooordinates)) continue;

            ship.coordinates = extendedCooordinates;

            for (let coords of extendedCooordinates) {
                occuppiedCoordinates.push(coords);
            }
            break;
        }
    }

    return { carrier, battleship, cruiser, submarine, destroyer }; // prettier-ignore
};
let test = gameBoardFactory();

module.exports = gameBoardFactory;
