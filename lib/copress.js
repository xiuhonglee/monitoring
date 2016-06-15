define("CpcDataConstruct", ["base/MoGu"], function (MoGu) {
	var callbackfun = function(data,callback){
		$(data).each(function(index, item){
			if(item.cparam) {
				// var urlIndex = isPc ? "item_url" : "item_h5_url";
				if(data[index]["item_url"].indexOf('?') > 0) {
					data[index]["item_url"] += ('&cparam=' + data[index].cparam);
				} else {
					data[index]["item_url"] += ('?cparam=' + data[index].cparam);
				}
				if(data[index]["item_h5_url"].indexOf('?') > 0) {
					data[index]["item_h5_url"] += ('&cparam=' + data[index].cparam);
				} else {
					data[index]["item_h5_url"] += ('?cparam=' + data[index].cparam);
				}
			}
		});
		callback(data);
	},
	CpcDataConstruct = function(data, callback) {
		if(data && window.MOGU_PLATFORM && window.MOGU_PLATFORM !== "pc" && MoGu && MoGu.ua && MoGu.ua.native && hdp) {
		    hdp.do('mgj.device.signParams', {}).then(function(deviceInfo){
	            if (typeof deviceInfo === 'string') {
	                 deviceInfo = JSON.parse(deviceInfo);
	            }
	            if(deviceInfo && deviceInfo._did) {
	                var param = "_did=" + deviceInfo._did;
	                // alert(param);
		        	sendRequestFunc(data, callback, false, param);
		        }else{
		      //  	callback(data);
		        	callbackfun(data,callback);
		        }
	            // 安卓老did
	        }).catch(function(msg){
	            //接口不存在、获取失败
	            callbackfun(data,callback);
	        });
		} else if(window.MOGU_PLATFORM && window.MOGU_PLATFORM == "pc" && MoGu && MoGu.fn && MoGu.fn.getCookie && MoGu.fn.getCookie("__mgjuuid")) {
            var param = "_uuid=" + MoGu.fn.getCookie("__mgjuuid");
        	sendRequestFunc(data, callback, true, param);
		} else if(window.MOGU_PLATFORM && window.MOGU_PLATFORM !== "pc" && MoGu && MoGu.fn && MoGu.fn.getCookie && MoGu.fn.getCookie("__mgjuuid")) {
			var param = "_uuid=" + MoGu.fn.getCookie("__mgjuuid");
        	sendRequestFunc(data, callback, false, param);
		} else {
		  //  callback(data);
		    callbackfun(data,callback);
		    return;
		}
	}, 
	sendRequestFunc = function(data, callback, isPc, param) {
		var obj = {};
		    obj["fakecparams"] = {},
		    objFlag = false;
		    
		$(data).each(function(index, item){
			if(item.cparam) {
				objFlag = true;
				obj["fakecparams"][item.item_id] = item.cparam;
			}
		});
		if(obj && objFlag) {		    
			$.ajax({
				url: "http://log.juangua.com/cparams.php?" + param,
				data: obj,
				dataType: 'json',
				type: "POST"
			}).then(function(result){
			    if(result){
			        if(typeof result === 'string'){
			            result = JSON.parse(result);
			        }
    				$(data).each(function(index, item){
    					if(item.cparam) {
    						data[index].cparam = result[item.item_id];
    						var urlIndex = isPc ? "item_url" : "item_h5_url";
    						if(data[index][urlIndex].indexOf('?') > 0) {
    							data[index][urlIndex] += ('&cparam=' + data[index].cparam);
    						} else {
    							data[index][urlIndex] += ('?cparam=' + data[index].cparam);
    						}
    					}
    				});
    				callback(data);
			    }else{
    				callbackfun(data,callback);
			    }
			}).fail(function(){
				callbackfun(data,callback);
			});
		    
		} else {
			callbackfun(data,callback);
		}
	};

	return CpcDataConstruct;
});