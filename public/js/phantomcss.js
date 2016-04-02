$(document).ready(function() {

	var $btn = $('.excute'),
		$url = $('.url');
	$btn.on('click', function() {
		var url = $url.val() || window.location.href;
		$.ajax({
			url: 'http://localhost:8342/phantomcss/getdata',
			method: 'GET',
			data: {url: url},
			success: function(res) {
				console.log(res);
			}
		});
	});
});