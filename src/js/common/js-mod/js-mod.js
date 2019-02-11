/**
 * @author     Victor Kulyabin <v.kulyabin@clientlab.ru>
 * @copyright  2019 Victor Kulyabin
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.0.0
 * @link       https://github.com/clientlab/mod_boilerplate
 */

/*
JS MOD
*/
function JS_MOD(){
	//Publick methods
	var _JS_MOD = this;
	
	_JS_MOD.options = {};

	_JS_MOD.init = function(opts){

		var defaults = {
			blockClassPrefix:"js_mod__",
			url: '/JS_MOD.php',
			// Callbacks
			onInit : function(){},
			onJsSet : function(){}
		}

		_JS_MOD.options = merge_obj(defaults, opts);
		document.addEventListener('DOMContentLoaded', function(){
			cacheCheck();
		});
		_JS_MOD.options.onInit(_JS_MOD);
	}

	_JS_MOD.update = function(){
		cacheCheck();
	}

	//Private methods
	var makeRequest = function (cb){
		//debugger;
		var blocks = document.querySelectorAll("[class*='"+_JS_MOD.options.blockClassPrefix+"']");
		var blocksArrayClass = [];

		Array.prototype.forEach.call(blocks, function (value) {
			var splited = value.className.split(' ');
			for (var i = splited.length - 1; i >= 0; i--) {
				blocksArrayClass.push(splited[i]);
			};
			
			//blocksArrayClass.push(value.className);
		});

		var xhr = new XMLHttpRequest();
		xhr.open('POST', _JS_MOD.options.url, true);

		var json = JSON.stringify({
			blocks: blocksArrayClass
		});

		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		xhr.onload = function(data) {
			if (xhr.status != 200) {
				console.warn(xhr);
			} else {
				if (xhr.responseText!='') {
					var data = JSON.parse(xhr.responseText);
					console.log('data', data);
					cb(data);
				}
			}
		}
		xhr.send(json);
	}

	var cacheCheck = function(){

		if (localStorageTest()) {

			var currentPath = location.pathname;

			if (localStorage[currentPath + "blocks_js_sum"] == '' || localStorage[currentPath + "blocks_js_sum"] == undefined) {
					makeRequest(function(data){
					updateLocalStorage(data);
					setJs(data.blocks_js);
				});
			}else{
				setJs(localStorage[currentPath + "blocks_js"]);
				
				makeRequest(function(data){
					if (localStorage[currentPath + "blocks_js_sum"] !== data.blocks_js_sum) {

						updateLocalStorage(data);
						console.log('updated to last js ver');
						setJs(data.blocks_js);
					}
				});
			}


		}else{
			makeRequest(function(data){
				setJs(data.blocks_js);
			});
		}

		function updateLocalStorage(data){
			localStorage[currentPath + "blocks_js_sum"] = data.blocks_js_sum;
			localStorage[currentPath + "blocks_js"] = data.blocks_js;
		}

		function localStorageTest(){
			var mod = 'modernizr';
			try {
					localStorage.setItem(mod, mod);
					localStorage.removeItem(mod);
					return true;
				} catch(e) {
					return false;
				}
		}
	}

	var setJs = function(js){
		var newdiv = document.createElement('div');

		var script = document.createElement('script');
		script.innerHTML = js;
		newdiv.appendChild(script);
		//document.getElementById('target').appendChild(newdiv);
		document.getElementsByTagName('body')[0].appendChild(newdiv);

		_JS_MOD.options.onJsSet(JS_MOD);
	}


	setJs.firstInit = true;
	setJs.jsTag = "";

	var merge_obj = function (obj1,obj2){
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	}
}