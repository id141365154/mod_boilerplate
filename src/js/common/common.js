var css = new CSS_MOD;
css.init({
	blockClassPrefix:"css_mod__",
	url: 'CSS_MOD.php',
	onCssSet: function(){
		console.log('oncssset method');
	},
	onInit: function(){
		console.log('oninit css');
	}
});

var js = new JS_MOD;
js.init({
	blockClassPrefix:"js_mod__",
	url: 'JS_MOD.php',
	onJsSet: function(){
		console.log('on js set method');
		/**/
	},
	onInit: function(){
		console.log('oninit js');
	}
});


