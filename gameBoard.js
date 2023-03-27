const shipFactory = require("./ship");

const gameBoard = () => {
    let ships = [];
    let shipCoordinates = {};
    let occupiedCoordinates = [];
    let successfulAttacks = [];
    let missedAttacks = [];

    function createShip(option, orient) {
        switch (option) {
            // create carrier
            case 0:
                ships.push(shipFactory("carrier", 5, [], orient, [], false));
                break;
            // create battleships
            case 1:
                ships.push(
                    shipFactory("battleship", 4, [], orient, [], false)
                );
                break;
            // create cruiser
            case 2:
                ships.push(shipFactory("cruiser", 3, [], orient, [], false));
                break;
            // create destroyer
            case 3:
                ships.push(shipFactory("submarine", 3, [], orient, [], false));
                break;
            // create submarine
            case 4:
                ships.push(shipFactory("destroyer", 2, [], orient, [], false));
                break;
        }
    }

    // verify if coordinates is valid
    function verifyCoordinates(coordinates) {
        for (let coords of coordinates) {
            if (occupiedCoordinates.includes(coords)) return false;
        }
        return true;
    }

    function extendCoordinatesFromSource(ships) {
        let sourceCoordinates = ships.coordinates[0];
        let extendedCoordinates = [sourceCoordinates];
        // ships is horizontal
        if (ships.orientation) {
            for (let i = 1; i < ships.size; i++) {
                extendedCoordinates.push([
                    sourceCoordinates[0] + i,
                    sourceCoordinates[1],
                ]);
            }
            return extendedCoordinates;
        }
        // ships is vertical
        else {
            for (let i = 1; i < ships.size; i++) {
                extendedCoordinates.push([
                    sourceCoordinates[0],
                    sourceCoordinates[1] + i,
                ]);
            }
            return extendedCoordinates;
        }
    }

    function setShipCoordinates(option, coords, orient) {
        createShip(option, orient);
        if (!verifyCoordinates(coords)) return null;

        let shipsIndex = ships.length - 1;
        ships[shipsIndex].setCoordinates(coords);

        let extendedCoordinates = extendCoordinatesFromSource(
            ships[shipsIndex]
        );
        if (!verifyCoordinates(extendedCoordinates)) return null;

        ships[shipsIndex].setCoordinates(extendedCoordinates);

        for (let newCoords of extendedCoordinates) {
            occupiedCoordinates.push(newCoords);
        }
        shipCoordinates[ships[shipsIndex].getName()] = extendedCoordinates;
    }

    function arrayContains(source, target) {
        for (const array of source) {
            if (array.toString() == target.toString()) {
                return true;
            }
        }
        return false;
    }

    function receiveAttack(coord) {
        let targetShip = "";

        if (arrayContains(occupiedCoordinates, coord)) {
            successfulAttacks.push(coord);

            for (const [key, value] of Object.entries(shipCoordinates)) {
                for (const item of value) {
                    if (item.toString() == coord.toString()) {
                        targetShip = key;
                    }
                }
            }
        } 
        else {
            missedAttacks.push(coord);
        }
        switch (targetShip) {
            case "carrier":
                console.log("Carrier Hit");
                ships[0].hit(coord);
                ships[0].isSunk();
                break;
        }
    }

    function countSunk() {
        // count sink
        let sinkCount = 0;

        for (const item of ships) {
            if (item.getSink()) {
                sinkCount++;
            }
        }
        return sinkCount;
    }
    return { ships, shipCoordinates, setShipCoordinates, receiveAttack, countSunk };
};

module.exports = gameBoard;
