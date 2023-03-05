const gameBoardFactory = require("./gameBoard");

const playerFactory = (turn) => {
    let playerGameBoard = gameBoardFactory();

    function setPlayerShip(coords) {
        playerGameBoard.setShipCoordinates();
    }

    function setPlayerTurn() {
        turn = !turn;
    }

    function attackPlayer(coords) {
        if (turn) {
            this.turn = !turn;
            return coords;
        }
    }

    function doneAttack() {
        if (!turn) {
            return true;
        }
    }

    function isPlayerLose() {
        let numberOfShips = playerGameBoard.countSunk();

        if (numberOfShips == 5) {
            return true;
        } else {
            return false;
        }
    }

    function isPlayerWin() {}
};
