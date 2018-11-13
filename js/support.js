
//获取left和top
function getLeftTop(i, j){
	return {left: 20 + 120 * j, top: 20 + 120 * i }
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
	switch(l){
		case 1: 
			return '60px';
			break;
		case 2: 
			return '56px';
			break;
		case 3: 
			return '50px';
			break;
		case 4: 
			return '40px';
			break;
	}
}

//判断棋盘是否有空位置添加数字
function nospace(board){
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++)
			if(board[i][j] == 0){
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

//无障碍物
function noObstacle(row, col1, col2, board){
	for(var j = col1 + 1 ; j < col2; j++ ){
		if(board[row][j] != 0){
			return false
		}
	}
	return true
}

































