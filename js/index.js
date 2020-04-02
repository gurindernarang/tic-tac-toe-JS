$(function() {
    let rows = 3;
    let cols = 3;
    var clickCount = 0;
    //Function to create views of rows and columns
    createView = (rows, cols) => {
        var view = '';
        for (let i = 0; i < rows; i++) {
            view += `<div class="row justify-content-center">`;
            for (let j = 0; j < cols; j++) {
                view += `<div id="row${i + 1}_col${j + 1}" class="col-3 col-sm-1 col-xs-3 animated bounceIn" onclick="addDataAndCheck(this)"></div>`;
            }
            view += `</div>`
        }
        return view;
    };
    //Append dynamic view to HTML
    $('#game-structure').append(createView(rows, cols));
    //update the text value on click each div in the DOM
    addDataAndCheck = (e) => {
        let id = `#${e.id}`;
        if (e.id && !($(id).html() === 'X' || $(id).html() === 'O') && clickCount < 9) {
            (clickCount % 2 === 0) ? $(id).html('X'): $(id).html('O');
            nextPlayer();
            clickCount++;
            //This will run on and after 5th click
            if (clickCount >= 5) {
                checkStatus('X') ? playerWins('X') : (checkStatus('O') ? playerWins('O') : playerWins(clickCount));
            }
        }
    };
    //Udpate value for next turn
    nextPlayer = () => {
        (clickCount % 2 === 0) ? updateNextplayer('O'): updateNextplayer('X');
    };
    //update content for next player
    updateNextplayer = (player) => {
        if (player === 'O') {
            $('#nextPlayer').html(player).removeClass('flipInY').addClass('flipInX');
        } else {
            $('#nextPlayer').html(player).removeClass('flipInX').addClass('flipInY');
        }
    };
    //Check current status of the game
    checkStatus = (player) => {
        return checkColumns(player) ? true : (checkRows(player) ? true : (checkDiagonal(player) ? true : false));
    };
    //check columns
    checkColumns = (player) => {
        let starightCount = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if ($(`#row${i + 1}_col${j + 1}`).html() === player) {
                    starightCount++;
                    if (starightCount === 3) {
                        return true;
                    }
                }
            }
            starightCount = 0;
        }
    };
    //check rows
    checkRows = (player) => {
        let starightCount = 0;
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                if ($(`#row${i + 1}_col${j + 1}`).html() === player) {
                    starightCount++;
                    if (starightCount === 3) {
                        return true;
                    }
                }
            }
            starightCount = 0;
        }
    };
    //check diagonally
    checkDiagonal = (player) => {
        let starightCount = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (i == j) {
                    if ($(`#row${i + 1}_col${j + 1}`).html() === player) {
                        starightCount++;
                        if (starightCount === 3) {
                            return true;
                        }
                    }
                }
            }
        }
    };
    //who wins
    playerWins = (player) => {
        if (player === 'X' || player === 'O') {
            $('#player').html(`Player ${player} wins!`).addClass('infinite flash winner');
        } else if (typeof player === 'number' && (player >= 8 && player <= 9)) {
            $('#player').html(`Match Draw!`).addClass('infinite flash draw');
        }
    };
})