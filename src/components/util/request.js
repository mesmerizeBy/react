import 'whatwg-fetch';

var qs = require('querystring');
var Request=(function(){
	return {
		get:function(url){
			// var result = fetch('http://www.mockhttp.cn'+url, { //打包apk时候使用
			var result = fetch(''+url, {
				
				credentials: 'same-origin',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/x-www-form-urlencoded'
				}
				
			});
			return result;
		},
		post:function(url,obj){
			var result = fetch(url, {
				credentials: 'same-origin',
				method: 'POST',
				
				headers: new Headers({
									'Accept': 'application/json',
									'Content-Type': 'application/x-www-form-urlencoded'
								}),
				
				body: qs.stringify(obj)
			});
			return result;
		}
	}

}())

export default Request;