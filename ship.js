const shipFactory = function (
    name,
    size,
    coordinates,
    orientation,
    hits,
    sink
) {
    function getName() {
        return this.name;
    }

    function getSize() {
        return this.size;
    }

    function getCoordinates() {
        return this.coordinates;
    }

    function getOrientation() {
        return this.orientation;
    }

    function getHits() {
        return this.hits;
    }

    function getSink() {
        return this.sink;
    }

    function flipOrientation() {
        this.orientation = !this.orientation;
    }

    function hit(coords) {
        this.hits.push(coords);
    }

    function isSunk() {
        if (hits.length == size) {
            this.sink = true;
        }
    }
    function setCoordinates(inputCoordinates) {
        this.coordinates = inputCoordinates;
    }
    function sayHi() {
        console.log("hi");
    }
    return {
        size,
        name,
        coordinates,
        orientation,
        hits,
        sink,

        getName,
        getSize,
        getCoordinates,
        getOrientation,
        getHits,
        getSink,

        flipOrientation,
        hit,
        isSunk,
        setCoordinates,
        sayHi,
    };
};

module.exports = shipFactory;
