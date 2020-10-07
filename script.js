$(document).ready(function(){

	// Set up grid
	var makeGrid = function(gridWidth, gridHeight) {
		var gridCellWidth = (100 / gridWidth).toString() + "%";
		var gridCellHeight = (100 / gridHeight).toString() + "%";

		$('body').append('<div class="grid"></div>');
		for (i = 0; i < (gridWidth * gridHeight); i++) {
			if ((i % gridWidth === 0) && (i !== 0)) {
				$('.grid').append('<br/>');
			}
			$('.grid').append('<div class="grid-cell"></div>')
		}

		$('.grid-cell').css('width', gridCellWidth);
		$('.grid-cell').css('height', gridCellHeight);
	};

	// Make initial grid
	makeGrid(24,24);

	// Change color of grid cell on hover
	var changeCellColorOnHover = function(colorMode) {
		if (colorMode == 'black') {
			$('.grid-cell').mouseenter(function(){
				$(this).css('background','black');
			});
		}

		if (colorMode == 'random') {
			$('.grid-cell').mouseenter(function(){
				var randomColors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
				var cellColor = 'rgb(' + randomColors[0] + ', ' + randomColors[1] + ', ' + randomColors[2] + ')';
				$(this).css('background', cellColor);
			});
		}

		if (colorMode == 'fadeBlack') {
			var cellColorAlpha = 0;
			var cellColorString = 'rgba(0,0,0,' + cellColorAlpha + ')';
			var darkening = true;
			$('.grid-cell').mouseenter(function(){
				$(this).css('background', cellColorString);	
				if (darkening) {
					cellColorAlpha += 0.1;
					cellColorString = 'rgba(0,0,0,' + cellColorAlpha + ')';
					if (cellColorAlpha >= 1) {
						darkening = false;
					}
				}
				else if (!darkening) {
					cellColorAlpha -= 0.1;
					cellColorString = 'rgba(0,0,0,' + cellColorAlpha + ')';
					if (cellColorAlpha <= 0) {
						darkening = true;
					}
				}
			});
		}

	};

	// Initial call
	changeCellColorOnHover('black');

	var resetGrid = function(colorMode) {
		var newGridWidth = prompt('Enter grid width:');
		var newGridHeight = prompt('Enter grid height:');
		$('.grid').remove();
		makeGrid(newGridWidth,newGridHeight);
		changeCellColorOnHover(colorMode);
	};

	$('#reset-button-black').click(function(){
		resetGrid('black');
	});

	$('#reset-button-random').click(function(){
		resetGrid('random');
	});

	$('#reset-button-fadeBlack').click(function(){
		resetGrid('fadeBlack');
	});

});