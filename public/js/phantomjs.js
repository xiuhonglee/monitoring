$(document).ready(function() {

	var $btn = $('.excute'),
		$url = $('.url');
	$btn.on('click', function() {
		var url = $url.val() || window.location.href;
		$.ajax({
			url: 'http://localhost:8342/phantomjs/getdata',
			method: 'GET',
			data: {url: url},
			// dataType: 'json',
			success: function(res) {
				console.log(res);
			}
		});
	});
});