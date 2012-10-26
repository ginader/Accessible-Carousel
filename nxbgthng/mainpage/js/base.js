$(document).ready(function(){
	$("#demo ul.items").accessibleCarousel({
		remote:'ul#preview',
		autoRotate:false,
		updateElementLink:'img.overlay'
	});
	$("#apps li").hover(function(){
	    $(this).append('<div id="bubble"><strong>'+$(this).find('img').attr('alt')+'</strong></div>');
	    $('#bubble').fadeIn('slow');
	},function(){
	    $('#bubble').remove();
	});
});