$(document).ready(function(){
			
	$('.section').on('mousemove', function(e) {
		$ths = $(this);
		$ths.find('.background').parallax(110, e);
		$ths.find('.cloud1').parallax(80, e);
		$ths.find('.cloud2').parallax(50, e);
	});
	
	
	var timers = [];
	function animateAll() {
		$('.section .animate').each(function () {
			var $wrap = $(this), wrapW = $wrap.width(), wrapH = $wrap.height();
			var step = 0.75, koeff = 0;
			$wrap.closest('.animate-block').hover(function () {
				koeff = 3;
			}, function () {
				koeff = 0;
			});
			$wrap.find('span').each(function () {
				var $img = $(this);
				var imgW = $img.width(), imgH = $img.height();
				var vX = step * (random(0, 1) == 1 ? -1 : 1) * (2 / random(1, 2));
				var vY = step * (random(0, 1) == 1 ? -1 : 1) * (2 / random(1, 2));
				var x = random(0, wrapW - imgW - step), y = random(0, wrapH - imgH - step);
				$img.css({left: x, top: y, opacity: 1});
				function draw() {
					if (y < 0 || y + imgH + step > wrapH) {
						vY = -vY;
					}
					if (x < 0 || x + imgW + step > wrapW) {
						vX = -vX;
					}
					x += vX * koeff;
					y += vY * koeff;
					$img.css({left: x, top: y});
				}
				 timers.push(setInterval(draw, 1000 / 50));						
			});
		});
	}
	animateAll();			
	function random(low, high) {
		return Math.floor(Math.random() * (high - low + 1) + low);
	}
	
	
});