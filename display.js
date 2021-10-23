function addSquares(){
    var board = document.getElementById('board');
    for(var i = 0; i <8; i++){
        var row = document.createElement('div')
        row.style.cssText = "width:100%; height:12.5%; display: flex"
        for(var j = 0; j <8; j++){
            var square = document.createElement('span');
            square.className = "square";
            square.id = j+""+i;
            row.appendChild(square);
        }
        board.appendChild(row);
    }
}

function reloadBoard(board, possibleMoves, isWhiteTurn){
    this.updateTurn(isWhiteTurn?"WHITE":"BLACK");
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

function updateTurn(turn){
    var turnDisplay = document.getElementById("turn");
    turnDisplay.textContent = turn+ "'S TURN";
}

function highlight(id){
    var square = document.getElementById(id);
    if(square !== null){
        square.className = "square highlighted";
    }
}

function removeHighlight(id){
    var square = document.getElementById(id);
    square.className = "square";
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