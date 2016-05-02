// $(function() {
// 	$("#menu-toggle").click(function(e) {
// 		e.preventDefault();
// 		$("#wrapper").toggleClass("toggled");
// 	});
// });

$(document).ready(function() {
	// 滑动开关
	$("input[name='monitor-switch']")
		.bootstrapSwitch()
		.on('switchChange.bootstrapSwitch', function(evt, state) {
			var $target = $(evt.target),
				id = $target.data('id'),
				$tr = $('.item-id-' + id);
			var targetUrl = $tr.find('.targetUrl').text(),
				frequency = $tr.find('.frequency').data('frequency');
			// 开关必须关掉才可删除监控项
			if (state) {
				$tr.find('.btn-Danger').addClass('disabled');
				$.ajax({
					type: 'GET', 
					url: '/control/monitor/getMetrics',
					data: {
						id: id,
						url: targetUrl,
						frequency: frequency
					}
				}).done(function(res) {
					// TODO
				});
			} else {
				$tr.find('.btn-Danger').removeClass('disabled')
			}
		});

	// 删除列表
	$('.del').on('click', function(evt) {
		var $target = $(evt.target),
			id = $target.data('id'),
			$tr = $('.item-id-' + id);
		if($target.hasClass('disabled')) return;
		$.ajax({
			type: 'DELETE',
			url: '/control/monitor/deleteMonitor?id=' + id
		}).done(function(res) {
			if (res.success === 1001) {
				if ($tr.length > 0) {
					$tr.remove();
				}
			}
		});
	});
});