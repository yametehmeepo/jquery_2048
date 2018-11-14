//显示数字
function theAnimateShowNumber(i, j, num){
	var thenumbercell = $('#number-cell-' + i + '-' + j)
	var v = getLeftTop(i, j)
	var fontSize = getFontSize(num)
	thenumbercell.css({
		'font-size': fontSize,
		'background-color': getBackgroundColor(num),
		'color': getColor(num)
	})
	thenumbercell.text(num)
	thenumbercell.animate({
		'width': '100px',
		'height': '100px',
		'left': v.left,
		'top': v.top,
	}, 50)
}

//移动数字
function theAnimateMoveNumber(fromX, fromY, toX, toY){
	var theMoveNumber = $('#number-cell-' + fromX + '-' + fromY)
	var v = getLeftTop(toX, toY)
	theMoveNumber.animate({
		'left': v.left,
		'top': v.top,
	}, 200)
}

//更新分数
function updateScore(score){
	
	$('#score').animate({
		'top': '-25px',
		'opacity': 0
	}, 100, 'swing', function(){
		$('#score').text(score)
		$('#score').css({
			'top': '25px'
		})
		$('#score').animate({
			'top': 0,
			'opacity': 1
		}, 50)
	})	
}













