$(document).ready(function() {

	var baseUrl = 'http://localhost:8342',

		$baseImgBtn = $('.baseImgUrl button'),
		$baseImg = $('.baseImg img'),

		$targetImgBtn = $('.targetImgUrl button'),
		$targetImg = $('.targetImg img'),

		$diffImgBtn = $('.getDiffImg button'),
		$diffImg = $('.diffImg img');

	$baseImgBtn.on('click', function() {
		var baseImgUrl = $('.baseImgUrl input').val() || window.location.href;
		$.ajax({
			url: 'http://localhost:8342/phantomcss/getBaseImg',
			method: 'GET',
			data: {
				url: baseImgUrl
			},
			success: function(res) {
				setTimeout(function() {
					$baseImg.attr('src', baseUrl + res.img);
				}, 1000);

			}
		});
	});

	$targetImgBtn.on('click', function() {
		var targetImgUrl = $('.targetImgUrl input').val() || window.location.href;
		$.ajax({
			url: 'http://localhost:8342/phantomcss/getTargetImg',
			method: 'GET',
			data: {
				url: targetImgUrl
			},
			success: function(res) {
				setTimeout(function() {
					$targetImg.attr('src', baseUrl + res.img);
				}, 1000);

			}
		});
	});

	$diffImgBtn.on('click', function() {
		var diffImg = $diffImg.attr('src');
		var diff = resemble('../screenshot/baseImg/_1708875937.png')
			.compareTo('../screenshot/targetImg/_7596399160.png')
			.ignoreColors()
			.onComplete(function(data) {
				var diffImgUrl = data.getImageDataUrl();
				$diffImg.attr('src', diffImgUrl);
		});
	});

});