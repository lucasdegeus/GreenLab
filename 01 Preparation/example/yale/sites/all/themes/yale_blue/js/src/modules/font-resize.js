$(function () {

	function init()  {
		var iBase = TextResizeDetector.addEventListener(onFontResize,null);
	}

	//id of element to check for and insert control

	TextResizeDetector.TARGET_ELEMENT_ID = 'header';

	//function to call once TextResizeDetector has init'd

	TextResizeDetector.USER_INIT_FUNC = init;

	function onFontResize(e,args) {

		if(args[0].iSize>=20){
			$(".body_wrapper").addClass("font_size_large");
		} else {
			$(".body_wrapper").removeClass("font_size_large");
		}

	}

});
