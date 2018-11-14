var board = new Array()
var hasCombine = new Array()
var score = 0
var lastClickTime = 0 //上一次按键时间
var isPressDown = false

$(function(){
	newgame()
	$(document).on('keydown', function(e){
		//console.log(e.keyCode)
		switch(e.keyCode){
			case 37://left
				//console.log('left')
				if(moveLeft()){
					afterMove()
				}
				break;
			case 38://up
				//console.log('up')
				if(moveUp()){
					afterMove()
				}
				break;
			case 39://right
				//console.log('right')
				if(moveRight()){
					afterMove()
				}
				break;
			case 40://down
				//console.log('down')
				if(moveDown()){
					afterMove()
				}
				break;
			default:
				//console.log(e.keyCode)
				break
		}
	})

	$(document).on('keyup', function(e){
		//console.log(e.keyCode)
		switch(e.keyCode){
			case 37://left
				isPressDown = false
				break;
			case 38://up
				isPressDown = false
				break;
			case 39://right
				isPressDown = false
				break;
			case 40://down
				isPressDown = false
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
	for(var i = 0; i < 4; i++){
		board[i] = new Array()
		hasCombine[i] = new Array()
		for(var j = 0; j < 4; j++){
			board[i][j] = 0
			hasCombine[i][j] = false
		}
	}
	console.log(board, hasCombine)
	//更新numbercell
	updateNumberCell()
	//重置分数
	score = 0
	updateScore(score)
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
			hasCombine[i][j] = false
		}
	}
}

//创建一个数字
function createOneNumber(){
	if(noSpace(board)){
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
	var now = new Date().getTime()
	if(!canMoveLeft(board) || isPressDown || now - lastClickTime < 300){
		return false
	}
	lastClickTime = now
	isPressDown = true
	for(var i = 0; i < 4; i++)
		for(var j = 1; j < 4; j++)
			if(board[i][j] != 0){
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && noObstacleHorizontal(i, k, j, board)){
						theAnimateMoveNumber(i, j, i, k)
						board[i][k] = board[i][j]
						board[i][j] = 0
						continue
					}else if(board[i][k] == board[i][j] && noObstacleHorizontal(i, k, j, board) && !hasCombine[i][k]){
						theAnimateMoveNumber(i, j, i, k)
						board[i][k] += board[i][j]
						board[i][j] = 0
						score += board[i][k]
						updateScore(score)
						hasCombine[i][k] = true
						continue
					}
				}
			}

	
	return true
}

//向右移动
function moveRight(){
	var now = new Date().getTime()
	if(!canMoveRight(board) || isPressDown || now - lastClickTime < 300){
		return false
	}
	lastClickTime = now
	isPressDown = true
	for(var i = 0; i < 4; i++)
		for(var j = 2; j > -1; j--)
			if(board[i][j] != 0){
				for(var k = 3; k > j; k--){
					if(board[i][k] == 0 && noObstacleHorizontal(i, j, k, board)){
						theAnimateMoveNumber(i, j, i, k)
						board[i][k] = board[i][j]
						board[i][j] = 0
						continue
					}else if(board[i][k] == board[i][j] && noObstacleHorizontal(i, j, k, board) && !hasCombine[i][k]){
						theAnimateMoveNumber(i, j, i, k)
						board[i][k] += board[i][j]
						board[i][j] = 0
						score += board[i][k]
						updateScore(score)
						hasCombine[i][k] = true
						continue
					}
				}
			}


	return true
}

//向上移动
function moveUp(){
	var now = new Date().getTime()
	if(!canMoveUp(board) || isPressDown || now - lastClickTime < 300){
		return false
	}
	lastClickTime = now
	isPressDown = true
	for(var i = 1; i < 4; i++)
		for(var j = 0; j < 4; j++)
			if(board[i][j] != 0){
				for(var k = 0; k < i; k++){
					if(board[k][j] == 0 && noObstacleVertical(j, k, i, board)){
						theAnimateMoveNumber(i, j, k, j)
						board[k][j] = board[i][j]
						board[i][j] = 0
						continue
					}else if(board[k][j] == board[i][j] && noObstacleVertical(j, k, i, board) && !hasCombine[k][j]){
						theAnimateMoveNumber(i, j, k, j)
						board[k][j] += board[i][j]
						board[i][j] = 0
						score += board[k][j]
						updateScore(score)
						hasCombine[k][j] = true
						continue
					}
				}
			}


	return true
}

//向下移动
function moveDown(){
	var now = new Date().getTime()
	if(!canMoveDown(board) || isPressDown || now - lastClickTime < 300){
		return false
	}
	lastClickTime = now
	isPressDown = true
	for(var i = 2; i > -1; i--)
		for(var j = 0; j < 4; j++)
			if(board[i][j] != 0){
				for(var k = 3; k > i; k--){
					if(board[k][j] == 0 && noObstacleVertical(j, i, k, board)){
						theAnimateMoveNumber(i, j, k, j)
						board[k][j] = board[i][j]
						board[i][j] = 0
						continue
					}else if(board[k][j] == board[i][j] && noObstacleVertical(j, i, k, board) && !hasCombine[k][j]){
						theAnimateMoveNumber(i, j, k, j)
						board[k][j] += board[i][j]
						board[i][j] = 0
						score += board[k][j]
						updateScore(score)
						hasCombine[k][j] = true
						continue
					}
				}
			}


	return true
}



//移动之后刷新棋盘并新增一个数字
function afterMove(){
	setTimeout(function(){
		updateNumberCell()
		createOneNumber()
	}, 200)
	setTimeout(function(){
		isgameover()
	}, 320)
}

//游戏结束
function isgameover(){
	if(noSpace(board) && noMove(board)){
		gameover()
	}
}

function gameover(){
	alert('游戏结束!获得' + score + '分')
	newgame()
}





























