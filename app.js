game = new ChessEngine();
addSquares();
reloadBoard(game.getBoard(), game.getPossibleMoves(), game.isWhiteTurn());


$(function(){
    $('.square').on("click", function(e){
        var id = $(this).attr('id');
        var children = $(this).children('.piece');
        x = parseInt(id.charAt(0));
        y = parseInt(id.charAt(1));  
        game.select(x,y);
        reloadBoard(game.getBoard(), game.getPossibleMoves(), game.isWhiteTurn());
    })
})

