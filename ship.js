const shipFactory = function (size, coordinates, orientation, hits, sink) {
    function hit(coords) {
        this.hits.push(coords);
    }
    function isSunk() {
        if (hits.length == size) {
            this.sink = true;
        }
    }
    const setCoordinates = (inputCoordinates) => {
        this.coordinates = inputCoordinates;
    };
    function sayHi() {
        console.log("hi");
    }
    return {
        size,
        coordinates,
        orientation,
        hits,
        sink,
        hit,
        isSunk,
        setCoordinates,
        sayHi,
    };
};

module.exports = shipFactory;
