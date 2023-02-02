const ShipFactory = (
    length: number,
    coordinates: String,
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
    return { length, coordinates, orientation, hits, sink, hit, isSunk };
};

const GameBoardFactory = () => {
    let yCoordinates: String[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] // prettier-ignore
    let xCoordinates: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] // prettier-ignore

    function randomCoordinates() {
        // creates random coordinates for ship
    }

    function generateShips() {
        // randomly generates ships at random coordinates
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
