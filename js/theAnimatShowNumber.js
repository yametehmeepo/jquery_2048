function theAnimatShowNumber(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var thenumbercell = $('#number-cell-' + i + '-' + j)
			var v = getLeftTop(i, j)
			if(board[i][j] != 0){
				var fontSize = getFontSize(board[i][j])
				thenumbercell.css({
					'font-size': fontSize,
					'background-color': getBackgroundColor(board[i][j]),
					'color': getColor(board[i][j])
				})
				thenumbercell.text(board[i][j])
				thenumbercell.animate({
					'width': '100px',
					'height': '100px',
					'left': v.left,
					'top': v.top,
				}, 50)
			}
		}
	}
}