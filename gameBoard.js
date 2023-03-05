const shipFactory = require("./ship");

const gameBoard = (ship, shipCoordinates, occupiedCoordinates) => {
    function createShip(option) {
        switch (option) {
            // create carrier
            case 0:
                this.ship.push(shipFactory(5, [], null, [], false));
                break;
            // create battleship
            case 1:
                this.ship.push(shipFactory(4, [], null, [], false));
                break;
            // create cruiser
            case 2:
                this.ship.push(shipFactory(3, [], null, [], false));
                break;
            // create destroyer
            case 3:
                this.ship.push(shipFactory(3, [], null, [], false));
                break;
            // create submarine
            case 4:
                this.ship.push(shipFactory(2, [], null, [], false));
                break;
        }
    }

    // verify if coordinates is valid
    function verifyCoordinates(coordinates) {
        for (let coords of coordinates) {
            if (this.occupiedCoordinates.includes(coords)) return false;
        }
        return true;
    }

    function extendCoordinatesFromSource(ship) {
        let sourceCoordinates = ship.coordinates[0];
        let extendedCoordinates = [sourceCoordinates];
        // ship is horizontal
        if (ship.orientation) {
            for (let i = 0; i < ship.size; i++) {
                extendedCoordinates.push(
                    sourceCoordinates[0] + i,
                    sourceCoordinates[1]
                );
            }
            return extendedCoordinates;
        }
        // ship is vertical
        else {
            for (let i = 0; i < ship.size; i++) {
                extendedCoordinates.push(
                    sourceCoordinates[0],
                    sourceCoordinates[1] + i
                );
            }
            return extendedCoordinates;
        }
    }

    function setShipCoordinates(option) {
        this.ship.push(createShip(option));
    }
};
