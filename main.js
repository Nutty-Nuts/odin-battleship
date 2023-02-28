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

    // prettier-ignore-start
    function remainingCoordinates(
        xSource,
        ySource,
        xIndex,
        yIndex,
        xModify,
        yModify,
        length
    ) {
        let newCoordinates = [];
        for (let i = 1; i <= length; i++) {
            newCoordinates.push([
                xSource[xIndex + (xModify ? i : 0)],
                ySource[yIndex + (yModify ? i : 0)],
            ]);
        }
        return newCoordinates;
    }

    function extendShip(index, xSource, ySource, xIndex, yIndex, length) {
        //extends ship based on length
        let rightExtend = false;
        let leftExtend = false;
        let randomExtend = 0;

        // check if ship is valid to extend by positive based on game board
        if (index - length < 0 && index + length <= 9) {
            rightExtend = true;
            randomExtend = 1;
        }
        // check if ship is valid to extend by negative based on game board
        else if (index + length >= 9 && index - length > 0) {
            leftExtend = true;
            randomExtend = 0;
        }

        if (rightExtend == true && leftExtend == true)
            randomExtend = Math.floor(Math.random() * 2);

        if (randomExtend == 1) {
            return remainingCoordinates(xSource, ySource, xIndex, yIndex, true, false, length); //prettier-ignore
        } else {
            return remainingCoordinates(xSource, ySource, xIndex, yIndex, false, true, length); //prettier-ignore
        }
    }

    function checkValidTiles(index, occuppied, ship) {
        // checks if the tiles that the ship will take is valid
        let isValid = true;
    }

    function randomShipCoordinates() {
        // creates a random and valid ship coordinate
    }

    function placeShips(ship) {
        // generates ship coordinates
        while (true) {
            let xRandom = Math.round(Math.random() * 9);
            let yRandom = Math.round(Math.random() * 9);
            let generatedCoordinates = [
                xCoordinates[xRandom],
                yCoordinates[yRandom],
            ];
            xRandom = 0;
            yRandom = 0;
            generatedCoordinates = ["A", "1"];
            if (occuppiedCoordinates.length == 0) {
                ship.extendCoordinates(generatedCoordinates);
                occuppiedCoordinates.push(generatedCoordinates);
            } else {
            }
            let remainingLength = ship.lengths - 1;
            let remLengthCoords = [];
            if (ship.orientation == true) {
                // check if valid horinztally
                remLengthCoords = extendShip(xRandom, xCoordinates, yCoordinates, xRandom, yRandom, remainingLength); // prettier-ignore

                remLengthCoords.forEach((item) => {
                    ship.extendCoordinates(item);
                    occuppiedCoordinates.push(item);
                });
            } else if (ship.orientation == false) {
                remLengthCoords = extendShip(xRandom, xCoordinates, yCoordinates, xRandom, yRandom, remainingLength); // prettier-ignore

                remLengthCoords.forEach((item) => {
                    ship.extendCoordinates(item);
                    occuppiedCoordinates.push(item);
                });
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

    return { placeShips, carrier, occuppiedCoordinates };
};

const PlayerFactory = () => {
    return;
};

const playerOne = GameBoardFactory();

console.log(playerOne.carrier.lengths);
console.log(playerOne.carrier.coordinates);
console.log(playerOne.occuppiedCoordinates);

module.exports = playerOne;
