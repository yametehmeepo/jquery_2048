var board = new Array()
var hasCombine = new Array()
var score = 0
var lastClickTime = 0 //上一次按键时间
var isPressDown = false
var lastScore = 0
var width, padding, startX, startY

$(function(){
	
	newgame()
	$(document).on('keydown', function(e){
		//console.log(e.keyCode)
		
		switch(e.keyCode){
			case 37://left
				e.preventDefault()
				//console.log('left')
				if(moveLeft()){
					afterMove()
				}
				break;
			case 38://up
				e.preventDefault()
				//console.log('up')
				if(moveUp()){
					afterMove()
				}
				break;
			case 39://right
				e.preventDefault()
				//console.log('right')
				if(moveRight()){
					afterMove()
				}
				break;
			case 40://down
				e.preventDefault()
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
	//手机端touch事件
	$('html').on('touchstart', function(e){
		//e.preventDefault()
		var touch = e.touches[0]
		startX = touch.pageX
		startY = touch.pageY
	})
	$('html').on('touchmove', function(e){
		e.preventDefault()
	})
	$('html').on('touchend', function(e){
		isPressDown = false
		//e.preventDefault()
		var touch = e.changedTouches[0]
		var endX = touch.pageX
		var endY = touch.pageY
		var deg = Math.atan2(endY - startY, endX - startX)*180/Math.PI
		var d = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY))
		
		//console.log('start', startX, startY)
		//console.log('end', endX, endY)
		// console.log('deg', deg)
		// console.log('d', d)
		if(d > 40){
			if( deg < 45 && deg > -45 ){//right
				console.log('touch-right')
				if(moveRight()){
					afterMove()
				}
			}else if( deg < -45 && deg > -135 ){//up
				console.log('touch-up')
				if(moveUp()){
					afterMove()
				}
			}else if( deg < 135 &&  deg > 45){//down
				console.log('touch-down')
				if(moveDown()){
					afterMove()
				}
			}else{//left
				console.log('touch-left')
				if(moveLeft()){
					afterMove()
				}
			}
		}
		startX = 0
		startY = 0
	})
	window.history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function () { 
		window.history.pushState(null, null, document.URL); 
	});
})

//开始游戏
function newgame(){
	init()
	createOneNumber()
	createOneNumber()
}

//初始化
function init(){
	var boxWidth = $(window).width()
	padding = boxWidth > 540 ? 20 : 10
	width = boxWidth > 540 ? 500 : boxWidth - 20
	var itemW = (width - 5*padding)/4
	$('.container').css({
		width: width,
		height: width
	})
	$('.container .item').css({
		width: itemW,
		height: itemW
	})
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
	//更新numbercell
	updateNumberCell()
	//重置分数
	score = 0
	lastScore = 0
	$('#score').text(score)
}

//更新numbercell
function updateNumberCell(){
	$('.numbercell').remove()
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$('.container').append($('<div class="numbercell" id="number-cell-' + i + '-' + j +'"></div>'))
			var thenumbercell = $('#number-cell-' + i + '-' + j)
			var v = getLeftTop(i, j)
			var cellW = (width - padding*5)/4
			if(board[i][j] != 0){
				var fontSize = getFontSize(board[i][j])
				thenumbercell.css({
					'width': cellW,
					'height': cellW,
					'left': v.left,
					'top': v.top,
					'line-height': cellW + 'px',
					'font-size': fontSize,
					'background-color': getBackgroundColor(board[i][j]),
					'color': getColor(board[i][j])
				})
				thenumbercell.text(board[i][j])
			}else{
				thenumbercell.css({
					'width': 0,
					'height': 0,
					'left': v.left + (width - padding*5)/8,
					'top': v.top + (width - padding*5)/8
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
	var available = []
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++)
			if(board[i][j] == 0){
				available.push([i, j])
			}

	var randomAvailableIndex = parseInt(Math.floor(Math.random() * available.length))
	var randomX = available[randomAvailableIndex][0]
	var randomY = available[randomAvailableIndex][1]
	// var randomX = parseInt(Math.floor(Math.random() * 4))
	// var randomY = parseInt(Math.floor(Math.random() * 4))
	// while(board[randomX][randomY] != 0){
	// 	randomX = parseInt(Math.floor(Math.random() * 4))
	// 	randomY = parseInt(Math.floor(Math.random() * 4))
	// }
	var number = Math.random() < 0.5?2:4
	board[randomX][randomY] = number
	theAnimateShowNumber(randomX, randomY, number)
}

//向左移动
function moveLeft(){
	var now = new Date().getTime()
	if(!canMoveLeft(board) || isPressDown || now - lastClickTime < 200){
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
						
						hasCombine[i][k] = true
						continue
					}
				}
			}

	if(lastScore != score){
		updateScore(score)
		lastScore = score
	}
	return true
}

//向右移动
function moveRight(){
	var now = new Date().getTime()
	if(!canMoveRight(board) || isPressDown || now - lastClickTime < 200){
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
						
						hasCombine[i][k] = true
						continue
					}
				}
			}

	if(lastScore != score){
		updateScore(score)
		lastScore = score
	}
	return true
}

//向上移动
function moveUp(){
	var now = new Date().getTime()
	if(!canMoveUp(board) || isPressDown || now - lastClickTime < 200){
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
						
						hasCombine[k][j] = true
						continue
					}
				}
			}


	if(lastScore != score){
		updateScore(score)
		lastScore = score
	}

	return true
}

//向下移动
function moveDown(){
	var now = new Date().getTime()
	if(!canMoveDown(board) || isPressDown || now - lastClickTime < 200){
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
						
						hasCombine[k][j] = true
						continue
					}
				}
			}

	if(lastScore != score){
		updateScore(score)
		lastScore = score
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





























