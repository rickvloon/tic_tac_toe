//Player factorial function

const playerFactory = (mark) => {

    return { mark }

}

//Gameboard module
const gameBoard = (() => {
    //Board array
    const board = ["", "", "", "", "", "", "", "", ""];

    const getSquare = (index) => {
        return board[index];
    }

    const setMark = (index, mark) => {
        board[index] = mark;
    }

    const checkSquare = (index) => {
        return board[index] == "";
    }

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        };
    }

    return {
        getSquare,
        setMark,
        checkSquare,
        board,
        resetBoard
    }

})();

//Game module
const game = (() => {
    
    const player1 = playerFactory("X");
    const player2 = playerFactory("O");

    let round = 1;

    const makeMove = (index) => {
        if(gameBoard.checkSquare(index) === true){
            gameBoard.setMark(index, getCurrentPlayer());
            checkWinner(index);
            round ++;
            //hier gebleven check for draw
        }
    }

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? player1.mark : player2.mark;
    }

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for(i = 0; i < winConditions.length; i++){
            let count = 0;
            if(round == 8){
                alert("Its a draw!");
                break;
            }
            for(x = 0; x < winConditions[i].length; x++){
                if(gameBoard.board[winConditions[i][x]] == getCurrentPlayer()){
                    count++;
                    if(count === 3){
                        alert(getCurrentPlayer() + " wins!");
                        endGame();
                    }
                }
            }
        }
    }

    const endGame = () => {
        displayController.removeEvents();
        displayController.showResetButton();
    };
    
    const reset = () => {
        round = 0;
        gameBoard.resetBoard();
        displayController.updateGameBoard()
        displayController.showResetButton();
        displayController.addEvents();
    }


    return {
        makeMove,
        getCurrentPlayer,
        reset
    }

})();

//Display controll module
const displayController = (() => {
    //DOM queryselector
    const squares = document.querySelectorAll(".square");
    const resetButton = document.getElementById("reset-button");
    resetButton.style.display = "none";

    const eventHandling = (e) => {
        let index = e.target.getAttribute("counter");   
        game.makeMove(index);
        updateGameBoard();
    };

    const addEvents = () => {
            squares.forEach(function(square){
                square.addEventListener("click", eventHandling);
        })
    };


    const removeEvents = () => {
        squares.forEach(function(square){
                square.removeEventListener("click", eventHandling);
        });
    }

    const showResetButton = () => {
        if(resetButton.style.display = "none"){
            resetButton.style.display = "block";
        }
        else{ 
            resetButton.style.display = "none";
        }
    }

    const updateGameBoard = () => {
        for(i = 0; i < squares.length; i++){
            squares[i].textContent = gameBoard.getSquare(i);
            squares[i].setAttribute("counter", i);
        };
    } 

    return {
        updateGameBoard,
        removeEvents,
        showResetButton,
        addEvents
    }

})();

game.reset();