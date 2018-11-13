var board = [];
var score = 0;

$(function(){
	newgame()
})


function newgame(){
	init()
	createOneNumber()
	createOneNumber()
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
	//console.log(board)
}

function initNumberCell(){
	$('.numbercell').remove()
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$('.container').append($('<div class="numbercell" id="number-cell-' + i + '-' + j +'"></div>'))
			var thenumbercell = $('#number-cell-' + i + '-' + j)
			var v = getLeftTop(i, j)
			thenumbercell.css({
				width: 0,
				height: 0,
				left: v.left + 50,
				top: v.top + 50
			})
		}
	}
}

function createOneNumber(){
	if(nospace(board)){
		return false
	}
	var randomX = parseInt(Math.floor(Math.random() * 4))
	var randomY = parseInt(Math.floor(Math.random() * 4))
	while(true){
		if(board[randomX][randomY] == 0){
			break
		}else{
			randomX = parseInt(Math.floor(Math.random() * 4))
			randomY = parseInt(Math.floor(Math.random() * 4))
		}
	}
	var number = Math.random() < 0.5?2:4
	board[randomX][randomY] = number
	theAnimatShowNumber(randomX, randomY, number)
}

































