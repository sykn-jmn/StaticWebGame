whitesTurn = true;
function addSquares(){
    var board = document.getElementById('board');
    var hiddenBoard = document.getElementById('hiddenBoard');
    for(var i = 0; i <8; i++){
        var row = document.createElement('div')
        var hiddenRow = document.createElement('div')
        row.style.cssText = "width:100%; height:12.5%; display: flex"
        hiddenRow.style.cssText = "width:100%; height:12.5%; display: flex"
        for(var j = 0; j <8; j++){
            var square = document.createElement('span');
            var color = ((i%2!=0)?(j%2!=0):(j%2==0))?"light":"dark";
            square.setAttribute("id",(j+""+i));
            square.setAttribute("class","square "+color);

            var hiddenSquare = document.createElement('span');
            hiddenSquare.setAttribute("id",("H"+j+""+i));
            hiddenSquare.setAttribute("class","hiddenSquare");

            row.appendChild(square);
            hiddenRow.appendChild(hiddenSquare);
        }
        board.appendChild(row);
        hiddenBoard.appendChild(hiddenRow);
    }
}

function showTurnDisplay(){
    jQuery("#turn").fadeIn(1000).fadeOut(1000);
}
function updateDisplayText(text){
    jQuery("#turn h1").text(text)
}

function reloadBoard(board, possibleMoves, isWhiteTurn){
    this.updateTurn(isWhiteTurn);
    for(var x = 0; x<8; x++){
        for(var y = 0; y<8; y++){
            removeHighlight(x+""+y);
            if(board[x][y]!==null){
                removePiece(x,y);
                addPiece(x,y,board[x][y].getType(),board[x][y].getColor())
            }else{
                removePiece(x,y)
            }
        }
    }
    possibleMoves?.forEach(function(item){
        highlight(item);
    })
}

function updateTurn(isWhiteTurn){
    var text = isWhiteTurn?"White's Turn":"Black's Turn";
    updateDisplayText(text);
    if(whitesTurn!=isWhiteTurn){
        showTurnDisplay();
        whitesTurn=isWhiteTurn;
    }
}

function highlight(id){
    var square = document.getElementById(id);
    if(square !== null){
        square.classList.add("highlighted");
    }
}

function removeHighlight(id){
    var square = document.getElementById(id);
    square.classList.remove("highlighted");
}

function removePiece(x,y){
    var square = document.getElementById(x+""+y);
    square.textContent = '';
}

function addPiece(x, y, pieceType, color){
    var square = document.getElementById(x+""+y);
    var piece = document.createElement('img');
    piece.className = "piece "+pieceType+" "+color;
    piece.src = "assets/chess-"+pieceType+"-"+color+".png";
    square.appendChild(piece);
}