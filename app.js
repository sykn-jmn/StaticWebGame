game = new ChessEngine();
addSquares();
reloadBoard(game.getBoard(), game.getPossibleMoves(), game.isWhiteTurn());


$(function(){
    $('.hiddenSquare').on("click", function(e){
        var id = $(this).attr('id');
        var children = $(this).children('.piece');
        x = parseInt(id.charAt(1));
        y = parseInt(id.charAt(2));  
        game.select(x,y);
        reloadBoard(game.getBoard(), game.getPossibleMoves(), game.isWhiteTurn());
    })

    $('.hiddenSquare').mouseover(function() { 
        var id = $(this).attr('id');
        var children = $(this).children('.piece');
        x = parseInt(id.charAt(1));
        y = parseInt(id.charAt(2));
        $("#"+x+y).addClass('hovered')
    }).mouseout(function() {
        var id = $(this).attr('id');
        var children = $(this).children('.piece');
        x = parseInt(id.charAt(1));
        y = parseInt(id.charAt(2));
        $("#"+x+y).removeClass('hovered')
    });
})

