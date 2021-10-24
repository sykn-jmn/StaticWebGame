class ChessEngine {
    constructor() {
        console.log('Generating New Game')
        this.board = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];
        this.pieceOnHand = null;
        this.x = null;
        this.y = null;
        this.possibleMoves = [];
        this.generatePieces();
        this.whiteTurn = true;
    }

    isWhiteTurn(){
        return this.whiteTurn;
    }

    getBoard() {
        return this.board;
    }

    select(x, y) {
        if (this.pieceOnHand == null && !this.isFree(x,y) && this.isCorrectTurn(x, y)) {
            this.pickUp(x, y);
            if (this.pieceOnHand != null) this.generatePossibleMoves(x, y)
        } else {
            if (this.isValidMove(x, y)) {
                if (this.x == x && this.y == y) {
                    this.whiteTurn = !this.whiteTurn;
                }
                this.putDown(x, y);
            }
        }
    }

    isCorrectTurn(x, y) {
        var turn = this.whiteTurn ? "white" : "black";
        return this.board[x][y].getColor() == turn;
    }

    isValidMove(x, y) {
        var id = x+""+y;
        for (const item of this.possibleMoves) {
            console.log(item);  
            if (id == item) {
                return true;
            }
        }
        console.log("Invalid Move")
        return false;
    }

    pickUp(x, y) {
        this.pieceOnHand = this.board[x][y];
        this.x = x;
        this.y = y;
        this.board[x][y] = null;
    }
    putDown(x, y) {
        this.board[x][y] = this.pieceOnHand;
        this.pieceOnHand = null;
        this.x = null;
        this.y = null;
        this.possibleMoves = [];
        this.whiteTurn = !this.whiteTurn;
    }

    print() {
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                console.log(this.board[x][y] === null ? 0 : this.board[x][y].getType())
            }
        }
    }

    getPossibleMoves() {
        return this.possibleMoves;
    }
    putPiece(piece, x, y) {
        this.board[x][y] = piece;
    }

    generatePieces() {
        for (var x = 0; x < 8; x++) {
            this.putPiece(new Piece("pawn", "black"), x, 1);
            this.putPiece(new Piece("pawn", "white"), x, 6);
        }
        this.putPiece(new Piece("rook", "black"), 0, 0);
        this.putPiece(new Piece("rook", "black"), 7, 0);
        this.putPiece(new Piece("rook", "white"), 7, 7);
        this.putPiece(new Piece("rook", "white"), 0, 7);

        this.putPiece(new Piece("knight", "black"), 1, 0);
        this.putPiece(new Piece("knight", "black"), 6, 0);
        this.putPiece(new Piece("knight", "white"), 1, 7);
        this.putPiece(new Piece("knight", "white"), 6, 7);

        this.putPiece(new Piece("bishop", "black"), 2, 0);
        this.putPiece(new Piece("bishop", "black"), 5, 0);
        this.putPiece(new Piece("bishop", "white"), 2, 7);
        this.putPiece(new Piece("bishop", "white"), 5, 7);

        this.putPiece(new Piece("king", "black"), 3, 0);
        this.putPiece(new Piece("queen", "black"), 4, 0);
        this.putPiece(new Piece("king", "white"), 3, 7);
        this.putPiece(new Piece("queen", "white"), 4, 7);
    }

    getPieces() {
        return this.pieces;
    }

    generatePossibleMoves(ix, iy) {
        console.log("Generating Possible Moves for " + this.pieceOnHand.getType())
        this.addPossibleMove(ix,iy);
        if (this.pieceOnHand.getType() == 'pawn') {
            if (this.pieceOnHand.getColor() == 'white') {
                if(ix-1>=0 && iy-1>=0 && !this.isFree(ix-1,iy-1) && this.isOpposite(ix-1,iy-1)){
                    this.addPossibleMove(ix-1,iy-1)
                }
                if(ix+1<8 && iy-1>=0 && !this.isFree(ix+1,iy-1) && this.isOpposite(ix+1,iy-1)){
                    this.addPossibleMove(ix+1,iy-1)
                }
                if(this.isFree(ix,iy-1)){
                    this.addPossibleMove(ix,(iy - 1));
                }
                if (iy == 6 && this.isFree(ix,iy-2)) {
                    this.addPossibleMove(ix,(iy - 2));
                }
            } else {
                if(ix-1>=0 && iy+1<8 && !this.isFree(ix-1,iy+1) && this.isOpposite(ix-1,iy+1)){
                    this.addPossibleMove(ix-1,iy+1)
                }
                if(ix+1<8 && iy+1<8 && !this.isFree(ix+1,iy+1) && this.isOpposite(ix+1,iy+1)){
                    this.addPossibleMove(ix+1,iy+1)
                }
                if(this.isFree(ix,iy+1)){
                    this.addPossibleMove(ix,(iy + 1));
                }
                if (iy == 1 && this.isFree(ix,iy+2)) {
                    this.addPossibleMove(ix,(iy + 2));
                }
            }
        } else if (this.pieceOnHand.getType() == 'knight') {
            this.addPossibleMove((ix + 1),(iy + 2));
            this.addPossibleMove((ix + 2),(iy + 1));
            this.addPossibleMove((ix - 1),(iy + 2));
            this.addPossibleMove((ix - 2),(iy + 1));
            this.addPossibleMove((ix + 1),(iy - 2));
            this.addPossibleMove((ix + 2),(iy - 1));
            this.addPossibleMove((ix - 1),(iy - 2));
            this.addPossibleMove((ix - 2),(iy - 1));
        } else if (this.pieceOnHand.getType() == 'king') {
            this.addPossibleMove((ix + 1),(iy + 1));
            this.addPossibleMove((ix + 0),(iy + 1));
            this.addPossibleMove((ix - 1),(iy + 1));
            this.addPossibleMove((ix - 1),(iy + 0));
            this.addPossibleMove((ix - 1),(iy - 1));
            this.addPossibleMove((ix + 0),(iy - 1));
            this.addPossibleMove((ix + 1),(iy - 1));
            this.addPossibleMove((ix + 1),(iy + 0));
        } else if (this.pieceOnHand.getType() == 'queen') {
            this.moveLoop(ix, iy, 1, 1);
            this.moveLoop(ix, iy, -1, 1);
            this.moveLoop(ix, iy, -1, -1);
            this.moveLoop(ix, iy, 1, -1);
            this.moveLoop(ix, iy, 1, 0);
            this.moveLoop(ix, iy, 0, 1);
            this.moveLoop(ix, iy, -1, 0);
            this.moveLoop(ix, iy, 0, -1);
        } else if (this.pieceOnHand.getType() == 'bishop') {
            this.moveLoop(ix, iy, 1, 1);
            this.moveLoop(ix, iy, -1, 1);
            this.moveLoop(ix, iy, -1, -1);
            this.moveLoop(ix, iy, 1, -1);
        } else if (this.pieceOnHand.getType() == 'rook') {
            this.moveLoop(ix, iy, 1, 0);
            this.moveLoop(ix, iy, 0, 1);
            this.moveLoop(ix, iy, -1, 0);
            this.moveLoop(ix, iy, 0, -1);
        }
    }

    addPossibleMove(x,y){
        if(x>=0 && x<8 && y>=0 && y<8){
            if(!this.isFree(x,y) && !this.isOpposite(x,y)){
                return
            }
            this.possibleMoves.push(x+""+y);
        }
    }

    isFree(x, y) {
        return this.board[x][y] == null;
    }
    isOpposite(x, y) {
        var piece = this.board[x][y];
        return piece.getColor() !== this.pieceOnHand.getColor();
    }

    moveLoop(x1, y1, plusX, plusY) {
        for (var x = x1 + plusX, y = y1 + plusY; x < 8 && y < 8 && x >= 0 && y >= 0; x += plusX, y += plusY) {
            if (!this.isFree(x, y)) {
                if (this.isOpposite(x, y)) {
                    this.addPossibleMove(x,y);
                }
                break;
            }
            this.addPossibleMove(x,y);
        }
    }
}

class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }
    getType() {
        return this.type;
    }
    getColor() {
        return this.color;
    }
}