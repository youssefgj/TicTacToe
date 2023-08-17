let buttonFunctionalities = (() => {
    document.getElementById('play').addEventListener('click', e => {
        document.querySelector('.bg-modal').style.display = 'flex';
    });

    document.querySelector('.close').addEventListener('click', e => {
        document.querySelector('.bg-modal').style.display = 'none';
    });

    document.querySelector('.start-btn').addEventListener('click', e => {
        document.querySelector('.bg-modal').style.display = 'none';
    });
})();
let gameController = (() => {
    // board Initialization
    let _board = [];
    for (let i = 0; i < 3; i++) {
        _board[i] = [];
    }

    function isOver(_board) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (_board[i][j] === '')
                    return false;
            }
        }
        return true;
    }

    function isWon(_board) {
        for (let i = 0; i < 3; i++) {
            if (_board[i][0] !== '' && _board[i][0] === _board[i][1] && _board[i][1] === _board[i][2]) {
                return true;
            }

            if (_board[0][i] !== '' && _board[0][i] === _board[1][i] && _board[1][i] === _board[2][i]) {
                return true;
            }
        }

        if (_board[0][0] !== '' && _board[0][0] === _board[1][1] && _board[1][1] === _board[2][2]) {
            return true;
        }

        if (_board[0][2] !== '' && _board[0][2] === _board[1][1] && _board[1][1] === _board[2][0]) {
            return true;
        }
        return false;
    }

    function checkBoardState() {
        let k = 0;
        const columns = document.querySelectorAll('.col');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                _board[i][j] = columns[k].textContent;
                k++;
            }
        }
        let output = document.getElementById('p2');
        if (isWon(_board)) {
            if (isX) {
                output.textContent = 'Player1 has won';
            }
            else {
                output.textContent = 'Player2 has won';
            }
        } else if (isOver(_board)) {
            output.textContent = 'Draw';
        }
    }
    return {
        checkBoardState,
        isWon,
        isOver
    }
})();

let displayController = (() => {
    let _board = [];
    for (let i = 0; i < 3; i++) {
        _board[i] = [];
    }


    function playTurn() {
        let output = document.getElementById('p1');
        if (isX) {
            let output = document.getElementById('p1');
            output.textContent = 'Player1\'s turn';

        } else if (isX === false) {
            let output = document.getElementById('p1');
            output.textobjectContent = 'Player2\'s turn';
        }
        const columns = document.querySelectorAll('.col');
        for (const column of columns) {
            column.addEventListener('click', e => {
                if (isX) {
                    column.textContent = 'X';
                } else {
                    column.textContent = 'O';
                }
                gameController.checkBoardState();
                isX === true ? isX = false : isX = true;
                if (isX) {
                    let output = document.getElementById('p1');
                    output.textContent = "Player1's turn";

                } else if (isX === false) {
                    let output = document.getElementById('p1');
                    output.textContent = "Player2's turn";
                }
            }, {
                once: true
            })
        }
    }
    return {
        playTurn
    }

})();
let count = 0;
let isX = true;
displayController.playTurn();
gameController.checkBoardState();
