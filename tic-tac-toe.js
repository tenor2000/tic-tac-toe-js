// Game functions
const gridsize = 3;
const container = document.getElementById('container');
const boardSpace = document.createElement('div');
boardSpace.className = 'gameboard';
const turnDisplay = document.createElement('div');
turnDisplay.className = 'turn-display';
container.appendChild(turnDisplay)
container.appendChild(boardSpace);

const gameboard = (function () {
    const board = [["empty","empty","empty"], ["empty","empty","empty"], ["empty","empty","empty"]];
    const enterPosition = (row, col, player) => board[row][col] = player;
    return { board, enterPosition }
})();

const player = (function () {
    let currentIndex = 0;
    const icons = ['X', 'O']

    const toggle = function() {
        currentIndex = (currentIndex + 1) % icons.length;
    };

    const getCurrent = function() {
        return icons[currentIndex];
    }
    return { toggle, getCurrent }
})();

const game = (function () {
    const displayTurn = function() {
        if (checkVictory() === true) {
            turnDisplay.textContent = `${player.getCurrent()} is the winner!`
        } else {
            turnDisplay.textContent = `Current Turn: ${player.getCurrent()}`
        }
    };
    const displayBoard = function() {
        for (let i=0; i<gameboard.board.length; i++) {
            const gameRow = document.createElement('div');
            gameRow.className = 'game-row';

            for (let j=0; j<gameboard.board[i].length; j++) {
                const box = document.createElement('div');
                box.className = gameboard.board[i][j];
                gameRow.appendChild(box);
                box.addEventListener('click', (function(i, j) {
                    return function() {
                        if (gameboard.board[i][j] === 'empty') {
                            gameboard.enterPosition(i, j, player.getCurrent());
                            box.className = player.getCurrent();
                            box.textContent = player.getCurrent();
                            displayTurn();
                            if (checkVictory() === true) {
                                alert("Someone Won the game");
                            }
                            player.toggle();
                        }
                        
                    };
                })(i, j));
            }
            boardSpace.appendChild(gameRow)
        }
    };

    const checkVictory = (function () {
        for (let i = 0; i < gameboard.board.length; i++) {
            // Check rows
            if (gameboard.board[i].every(item => item.toUpperCase() === player.getCurrent())) {
                return true;
            }
            // Check columns
            const col = gameboard.board.map(row => row[i]);
            if (col.every(item => item.toUpperCase() === player.getCurrent())) {
                return true;
            }
        }
        // Check diagonals
        if (gameboard.board[0][0] === player.getCurrent() && gameboard.board[1][1] === player.getCurrent() && gameboard.board[2][2] === player.getCurrent()) {
            return true;
        } else if (gameboard.board[2][0] === player.getCurrent() && gameboard.board[1][1] === player.getCurrent() && gameboard.board[0][2] === player.getCurrent()) {
            return true;
        }
        return false;
    });
    displayTurn()

    return { displayBoard, checkVictory }
})()



// gameboard.enterPosition(2,0,'x')
// gameboard.enterPosition(1,1,'x')
// gameboard.enterPosition(0,2,'x')

game.displayBoard()

