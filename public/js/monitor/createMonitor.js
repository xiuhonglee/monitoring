$(document).ready(function() {

	var $submit = $('button[type="submit"]'),
		$targetUrl = $('#targetUrl');


	// 表单验证，放一放再弄
	// $submit.on('click', function(evt) {
	// 	evt.preventDefault();
	// 	var $tParent = $targetUrl.parent();
	// 	if (!$targetUrl.val()) {
	// 		if (!$tParent.hasClass('has-error')) {
	// 			$tParent.addClass('has-error');
	// 		}
	// 	} else {
	// 		if ($tParent.hasClass('has-error')) {
	// 			$tParent.removeClass('has-error');
	// 		}
	// 	}
	// });


});
