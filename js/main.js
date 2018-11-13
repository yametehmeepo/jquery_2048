var board = [];
var score = 0;

$(function(){
	newgame()
	$(document).on('keydown', function(e){
		//console.log(e.keyCode)
		switch(e.keyCode){
			case 37://left
				//console.log('left')
				if(moveLeft()){
					
					isgameover()
				}
				break;
			case 38://up
				//console.log('up')
				break;
			case 39://right
				//console.log('right')
				break;
			case 40://down
				//console.log('down')
				break;
			default:
				//console.log(e.keyCode)
				break
		}
	})
})

//开始游戏
function newgame(){
	init()
	createOneNumber()
	createOneNumber()
}

//初始化
function init(){
	//初始化棋盘
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var v = getLeftTop(i, j)
			$('#grid-item-' + i + '-' + j).css({'left': v.left, 'top': v.top})
		}
	}
	//初始化board
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]
	//更新numbercell
	updateNumberCell()
}

//更新numbercell
function updateNumberCell(){
	$('.numbercell').remove()
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$('.container').append($('<div class="numbercell" id="number-cell-' + i + '-' + j +'"></div>'))
			var thenumbercell = $('#number-cell-' + i + '-' + j)
			var v = getLeftTop(i, j)
			if(board[i][j] != 0){
				var fontSize = getFontSize(board[i][j])
				thenumbercell.css({
					'width': '100px',
					'height': '100px',
					'left': v.left,
					'top': v.top,
					'font-size': fontSize,
					'background-color': getBackgroundColor(board[i][j]),
					'color': getColor(board[i][j])
				})
				thenumbercell.text(board[i][j])
			}else{
				thenumbercell.css({
					'width': 0,
					'height': 0,
					'left': v.left + 50,
					'top': v.top + 50
				})
			}
		}
	}
}

//创建一个数字
function createOneNumber(){
	if(nospace(board)){
		return false
	}
	var randomX = parseInt(Math.floor(Math.random() * 4))
	var randomY = parseInt(Math.floor(Math.random() * 4))
	while(board[randomX][randomY] != 0){
		randomX = parseInt(Math.floor(Math.random() * 4))
		randomY = parseInt(Math.floor(Math.random() * 4))
	}
	var number = Math.random() < 0.5?2:4
	board[randomX][randomY] = number
	theAnimateShowNumber(randomX, randomY, number)
}

//向左移动
function moveLeft(){
	if(!canMoveLeft(board)){
		return false
	}

	for(var i = 0; i < 4; i++)
		for(var j = 1; j < 4; j++)
			if(board[i][j] != 0){
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && noObstacle(i, k, j, board)){
						theAnimateMoveNumber(i, j, i, k)
						board[i][k] = board[i][j]
						board[i][j] = 0
						continue
					}else if(board[i][k] == board[i][j] && noObstacle(i, k, j, board)){
						theAnimateMoveNumber(i, j, i, k)
						board[i][k] += board[i][j]
						board[i][j] = 0
						continue
					}
				}
			}

	setTimeout(function(){
		updateNumberCell()
		createOneNumber()
	}, 200)

	return true
}

//游戏结束
function isgameover(){

}































