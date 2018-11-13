var board = [];
var score = 0;

$(function(){
	newgame()
})


function newgame(){
	init()
}

function init(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var v = getLeftTop(i, j)
			$('#grid-item-' + i + '-' + j).css({'left': v.left, 'top': v.top})
		}
	}
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]
	initNumberCell()
	var randomX = parseInt(Math.floor(Math.random() * 4))
	var randomY = parseInt(Math.floor(Math.random() * 4))
	var number = Math.random() < 0.5?2:4
	board[randomX][randomY] = number
	randomX = parseInt(Math.floor(Math.random() * 4))
	randomY = parseInt(Math.floor(Math.random() * 4))
	while(true){
		if(board[randomX][randomY] == 0){
			break
		}else{
			randomX = parseInt(Math.floor(Math.random() * 4))
			randomY = parseInt(Math.floor(Math.random() * 4))
		}
	}
	number = Math.random() < 0.5?2:4
	board[randomX][randomY] = number
	//console.log(board)
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] != 0){
				var numbercell = $('#number-cell-' + i + '-' + j)
				numbercell.css({
					'width': '100px',
					'height': '100px',
					'left': getLeftTop(i, j).left,
					'top': getLeftTop(i, j).top,
					'background-color': getBackgroundColor(board[i][j]),
					'color': getColor(board[i][j])
				})
				numbercell.text(board[i][j])
			}
		}
	}

}

function initNumberCell(){
	$('.numbercell').remove()
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var v = getLeftTop(i, j)
			$('.container').append($('<div class="numbercell" id="number-cell-' + i + '-' + j +'"></div>'))
			$('#number-cell-' + i + '-' + j).css({
				width: 0,
				height: 0,
				left: v.left + 50,
				top: v.top + 50
			})
		}
	}
}



































