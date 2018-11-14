
//获取left和top
function getLeftTop(i, j){
	return {left: padding + ((width - padding*5)/4 + padding) * j, top: padding + ((width - padding*5)/4 + padding) * i }
}

//获取背景颜色
function getBackgroundColor(number){
	switch (number){
		case 2: 
			return '#eee4da';
			break;
		case 4: 
			return '#ede0c8';
			break;
		case 8: 
			return '#f2b179';
			break;
		case 16: 
			return '#f59563';
			break;
		case 32: 
			return '#f67c5f';
			break;
		case 64: 
			return '#f65e3b';
			break;
		case 128: 
			return '#edcf72';
			break;
		case 256: 
			return '#edcc61';
			break;
		case 512: 
			return '#9c0';
			break;
		case 1024: 
			return '#33b5e5';
			break;
		case 2048: 
			return '#09c';
			break;
		case 4096: 
			return '#a6c';
			break;
		case 8192: 
			return '#93c';
			break;
		case 16384: 
			return '#f67c5f';
			break;	
		case 32768: 
			return '#f65e3b';
			break;
		case 65536: 
			return '#edcf72';
			break;
		case 131072: 
			return '#edcc61';
			break;
	}
}

//获取文字颜色
function getColor(number){
	if(number <= 4){
		return '#776e65'
	}
	return '#fff'
}

//获取文字大小
function getFontSize(number){
	var l = String(number).length
	var s = ((width - padding*5)/4)/100
	switch(l){
		case 1: 
			return 60*s;
			break;
		case 2: 
			return 56*s;
			break;
		case 3: 
			return 50*s;
			break;
		case 4: 
			return 40*s;
			break;
		case 5: 
			return 30*s;
			break;
		case 6: 
			return 26*s;
			break;
	}
}

//判断棋盘是否有空位置添加数字
function noSpace(board){
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++)
			if(board[i][j] == 0){
				return false
			}
	return true
}

//判断是否可以移动
function noMove(board){
	if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
		return false
	}
	return true
}

//可以向左移动
function canMoveLeft(board){
	for(var i = 0; i < 4; i++)
		for(var j = 1; j < 4; j++)
			if(board[i][j] != 0){
				if(board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]){//判断是否能够向左移动
					return true
				}
			}
	return false
}

//可以向右移动
function canMoveRight(board){
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 3; j++)
			if(board[i][j] != 0){
				if(board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]){//判断是否能够向右移动
					return true
				}
			}
	return false
}

//可以向上移动
function canMoveUp(board){
	for(var i = 1; i < 4; i++)
		for(var j = 0; j < 4; j++)
			if(board[i][j] != 0){
				if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]){//判断是否能够向上移动
					return true
				}
			}

	return false
}

//可以向下移动
function canMoveDown(board){
	for(var i = 0; i < 3; i++)
		for(var j = 0; j < 4; j++)
			if(board[i][j] != 0){
				if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]){//判断是否能够向上移动
					return true
				}
			}

	return false
}



//横向无障碍物
function noObstacleHorizontal(row, col1, col2, board){
	for(var j = col1 + 1 ; j < col2; j++ ){
		if(board[row][j] != 0){
			return false
		}
	}
	return true
}

//纵向无障碍物
function noObstacleVertical(col, row1, row2, board){
	for(var i = row1 + 1 ; i < row2; i++ ){
		if(board[i][col] != 0){
			return false
		}
	}
	return true
}

































