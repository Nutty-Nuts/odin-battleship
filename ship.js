const shipFactory = (size, coordinates, orientation, hits, sink) => {
    const hit = () => {
        hits++;
    };
    const isSunk = () => {
        if (hits == size) sink = true;
    };
    const setCoordinates = (inputCoordinates) => {
        coordinates = inputCoordinates;
    };
    return {
        size,
        coordinates,
        orientation,
        hits,
        sink,
        hit,
        isSunk,
        setCoordinates,
    };
};

module.exports = shipFactory;
