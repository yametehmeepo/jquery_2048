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
















