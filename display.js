function addSquares(){
    var board = document.getElementById('board');
    for(var i = 0; i <8; i++){
        var row = document.createElement('div')
        row.style.cssText = "width:100%; height:12.5%; display: flex"
        for(var j = 0; j <8; j++){
            var square = document.createElement('span');
            var color = ((i%2!=0)?(j%2!=0):(j%2==0))?"light":"dark";
            square.setAttribute("id",(j+""+i));
            square.setAttribute("class","square "+color);
            row.appendChild(square);
        }
        board.appendChild(row);
    }
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
    var turnDisplay = document.getElementById("turn");
    var text = isWhiteTurn?"WHITE":"BLACK";
    var color = isWhiteTurn?"black":"white";
    var background = isWhiteTurn?"white":"black";
    var html =  "<h2 style = \"color:"+color+"; background:"+background+"; padding:5px\">"+text+"</h2>";
    console.log(html);
    turnDisplay.innerHTML = html;
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