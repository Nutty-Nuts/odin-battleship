// true for horinztal, false for vertical
const ShipFactory = (
    length: number,
    coordinates: String[],
    orientation: boolean,
    hits: number,
    sink: boolean
) => {
    const hit = () => {
        hits++;
    };
    const isSunk = () => {
        if (hits == length) sink = true;
    };
    const setCoordinates = (newCoordinates: String[]) => {
        coordinates = newCoordinates;
    };
    return {
        length,
        coordinates,
        orientation,
        hits,
        sink,
        hit,
        isSunk,
        setCoordinates,
    };
};

const GameBoardFactory = () => {
    let yCoordinates: String[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] // prettier-ignore
    let xCoordinates: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] // prettier-ignore

    let occuppiedCoordinates: String[] = []

    let carrier = ShipFactory(5, null, null, 0, false);
    let battleship = ShipFactory(4, null, null, 0, false);
    let cruiser = ShipFactory(3, null, null, 0, false);
    let submarine = ShipFactory(3, null, null, 0, false);
    let destroyer = ShipFactory(2, null, null, 0, false);

    function randomCoordinates() {
        // creates random coordinates for ship
    }

    function generateShips() {
        // randomly generates ships at random coordinates
        while (true) {
            let generatedCoordinates: String[] = [
                xCoordinates[Math.random() * 9],
                yCoordinates[Math.random() * 9],
            ];
            for (let i of occuppiedCoordinates) {
                if (generatedCoordinates.includes(i[0]))
            }
        }
    }
    function receiveAttack(coordinates: String[]) {
        // determines if attack hits or misses
    }
    function missedAttack() {
        // keeps track of the missed attacks
    }
    function remainingShips() {
        // counts the remainingShips
    }

    return;
};

const PlayerFactory = () => {
    return;
};
