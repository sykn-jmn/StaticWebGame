var pieceOnHand = null;
var whiteTurn = true;
var ix = null;
var iy = null;
var possibleMoves = [];

$(function(){
    $('.square').on("click", function(e){
        var id = $(this).attr('id');
        var children = $(this).children('.piece');
        x = parseInt(id.charAt(0));
        y = parseInt(id.charAt(1));
        if(pieceOnHand!=null){
            if(possibleMoves.includes(id) && (isFree(id) || isOpposite(pieceOnHand,id))){
                $(this).children('.piece').remove();
                $(this).append(pieceOnHand);
                pieceOnHand = null;
                $('.square').css("background-color","")
                whiteTurn = !whiteTurn;
                possibleMoves=[];
            }
        }else{
            if((children.hasClass('white') && !whiteTurn)||
                (children.hasClass('black') && whiteTurn)){
                return
            }
            pieceOnHand = children
            pieceOnHand.remove();
            ix = x;
            iy = y;
            if(pieceOnHand.length==0){
                pieceOnHand = null;
                return;
            }
            updatePossibleMoves();
            $('.square').each(function(){
                var id2 = $(this).attr('id');
                if(possibleMoves.includes(id2) && (isFree(id2) || isOpposite(pieceOnHand,id2))){
                    $(this).css("background-color","rgba(0, 255, 0, 0.3)")
                }
            })
        }
    })
})

function isFree(id){
    var child = $('#'+id).children('.piece')
    if(child.length==0){
        return true;
    }
    return false;
}
function isOpposite(piece, id){
    var child = $('#'+id).children('.piece')
    if((child.hasClass('white') && piece.hasClass('black'))||
        (child.hasClass('black') && piece.hasClass('white'))){
        return true;
    }
    return false;    
}

function updatePossibleMoves(){
    for(var x = 0; x < 8; x++){
        for(var y = 0; y<8; y++){
            if(canMove(pieceOnHand,ix,iy,x,y)){
                possibleMoves.push(x+""+y);
            }
        }
    }
    if(pieceOnHand.hasClass('queen')){
        moveLoop(ix,iy,1,1);
        moveLoop(ix,iy,-1,1);
        moveLoop(ix,iy,-1,-1);
        moveLoop(ix,iy,1,-1);

        moveLoop(ix,iy,1,0);
        moveLoop(ix,iy,0,1);
        moveLoop(ix,iy,-1,0);
        moveLoop(ix,iy,0,-1);
    }
    else if(pieceOnHand.hasClass('bishop')){
        moveLoop(ix,iy,1,1);
        moveLoop(ix,iy,-1,1);
        moveLoop(ix,iy,-1,-1);
        moveLoop(ix,iy,1,-1);
    }
    else if(pieceOnHand.hasClass('rook')){
        moveLoop(ix,iy,1,0);
        moveLoop(ix,iy,0,1);
        moveLoop(ix,iy,-1,0);
        moveLoop(ix,iy,0,-1);
    }
}

function moveLoop(x1,y1,plusX,plusY){
    for(var x = x1+plusX, y = y1+plusY; x<8 && y<8 && x>=0 && y>=0; x+=plusX,y+=plusY){
        var id = x+""+y
        if(!isFree(id)){
            if(isOpposite(pieceOnHand, id)){
                possibleMoves.push(id);
            }
            break;
        }
        possibleMoves.push(id);
    }
}

function canMove(piece, x1, y1, x2, y2){
    if(piece.hasClass('pawn')){
        if(piece.hasClass('white') && y2 == y1-1 && x1 == x2){
            return true;
        }
        if(piece.hasClass('black') && y2 == y1+1 && x1 == x2){
            return true;
        }
        return false;
    }
    else if(piece.hasClass('king')){
        if((x2==x1-1 || x2==x1+1 || (x1==x2 && y1!=y2)) && y2-y1<=1 && y2-y1>=-1){
            return true;
        }
        return false;
    }
    else if(piece.hasClass('knight')){
        if(x2-x1==1 || x2-x1==-1){
            if(y2-y1==2 || y2-y1==-2){
                return true;
            }
        }
        if(x2-x1==2 || x2-x1==-2){
            if(y2-y1==1 || y2-y1==-1){
                return true;
            }
        }
        return false;
    }
}

addSquares();
resetBoard();








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


function resetBoard(){
    for(var i = 0; i <8; i++){
        addPieceToSquare(i,1,"pawn","black");
        addPieceToSquare(i,6,"pawn","white");
    }

    addPieceToSquare(0,0,"rook","black");
    addPieceToSquare(7,0,"rook","black");
    addPieceToSquare(7,7,"rook","white");
    addPieceToSquare(0,7,"rook","white");

    addPieceToSquare(1,0,"knight","black");
    addPieceToSquare(6,0,"knight","black");
    addPieceToSquare(1,7,"knight","white");
    addPieceToSquare(6,7,"knight","white");
    
    addPieceToSquare(2,0,"bishop","black");
    addPieceToSquare(5,0,"bishop","black");
    addPieceToSquare(2,7,"bishop","white");
    addPieceToSquare(5,7,"bishop","white");

    addPieceToSquare(3,0,"king","black");
    addPieceToSquare(4,0,"queen","black");
    addPieceToSquare(3,7,"king","white");
    addPieceToSquare(4,7,"queen","white");
}

function addPieceToSquare(x, y, pieceType, color){
    var square = document.getElementById(x+""+y);
    var piece = document.createElement('img');
    piece.className = "piece "+pieceType+" "+color;
    piece.src = "assets/chess-"+pieceType+"-"+color+".png";
    square.appendChild(piece);
}
