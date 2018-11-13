
function getLeftTop(i, j){
	return {left: 20 + 120 * j, top: 20 + 120 * i }
}

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

function getColor(number){
	if(number <= 4){
		return '#776e65'
	}
	return '#fff'
}

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

function nospace(board){
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++)
			if(board[i][j] == 0){
				return false
			}
	return true
}




































