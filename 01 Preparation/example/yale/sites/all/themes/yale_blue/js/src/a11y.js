(function($) {
    $(document).on('click keypress', '.btn_site_seach', function(e){
		if(e.type == 'click' || (e.keyCode == '13' || e.keyCode == '32')){
			e.preventDefault();
			e.stopPropagation();
			setTimeout(function(){
				$('.btn_site_seach').attr('aria-expanded', ($('.btn_site_seach').parents('.header').hasClass('js-toggle_active')) ? true:false);
			},250);
		}
	});

	$(document).on('submit', '.gateway_form', function(e){
		var $this = $(e.target);
		var pattern = /^(f|ht)tps?:\/\//i;
		var destUrl = $this.find('.fs-dropdown-item.fs-dropdown-item_selected').attr('data-value');
		e.preventDefault();
		e.stopPropagation();
		(pattern.test(destUrl)) ?  window.location.href = destUrl  : window.location.href = window.location.origin + destUrl;
	});

	$(document).on('keyup', '.fs-dropdown, .fs-dropdown-item', function(e){
		if(e.keyCode === 32){
			e.preventDefault();
			e.stopPropagation();
			if($(e.target).hasClass('fs-dropdown')){
				var $elClass = $(e.target).hasClass('fs-dropdown-open');
				$elClass ? ($(e.target).find('.fs-dropdown-element').eq(0).dropdown("close"),  $(e.target).attr('aria-expanded', false)) : ($(e.target).find('.fs-dropdown-element').eq(0).dropdown("open"), $(e.target).attr('aria-expanded', true));
				($elClass) ? $(e.target).find('.fs-dropdown-item').attr('tabindex', '-1') : $(e.target).find('.fs-dropdown-item').attr('tabindex', '0');
			}else if($(e.target).hasClass('fs-dropdown-item')){
				$(e.target).click();
				/**
				var parents = $(e.target).parents('.fs-dropdown');
				parents.find('.fs-dropdown-element option').attr('selected', false);
				parents.find('.fs-dropdown-element option').eq($(e.target).index()).attr('selected', 'selected');
				parents.find('.fs-dropdown-element').eq(0).dropdown('close');
				parents.find('.fs-dropdown-element').eq(0).dropdown('update');
				parents.find('.fs-dropdown-item_selected').removeClass('fs-dropdown-item_selected');
				parents.attr('aria-expanded', false);
				setTimeout(function(){
					$(e.target).addClass('fs-dropdown-item_selected');
					parents.find('.fs-dropdown-item').attr({
						'role': 'option',
						'aria-selected': false
					});
					parents.find('.fs-dropdown-item_selected').attr('aria-selected', true);
					$(e.target).attr('aria-selected', true);
					parents.find('.fs-dropdown-selected').text(parents.find('option[selected="selected"]').text());
					//$(e.target).attr('aria-selected', true).siblings('.fs-dropdown-item').attr('aria-selected', false);
				},250);
				**/
			}
		}
	});
    
	$(document).on('keypress', '.fs-dropdown', function(e){
		if(e.keyCode === 13){
            e.preventDefault();
			e.stopPropagation();
            if($(e.target).hasClass('fs-dropdown-item')){
                $(e.target).click();
				var parents = $(e.target).parents('.fs-dropdown');
				parents.find('.fs-dropdown-element option').attr('selected', false);
				parents.find('.fs-dropdown-element option').eq($(e.target).index()).attr('selected', 'selected');
				parents.find('.fs-dropdown-element').eq(0).dropdown('close');
				parents.find('.fs-dropdown-element').eq(0).dropdown('update');
				parents.find('.fs-dropdown-item_selected').removeClass('fs-dropdown-item_selected');
				parents.attr('aria-expanded', false);
				setTimeout(function(){
                    $(e.target).addClass('fs-dropdown-item_selected');
					parents.find('.fs-dropdown-item').attr({
						'role': 'option',
						'aria-selected': false
					});
					$(e.target).attr('aria-selected', true);
					parents.find('.fs-dropdown-item_selected').attr('aria-selected', true);
					
					//$(e.target).attr('aria-selected', true).siblings('.fs-dropdown-item').attr('aria-selected', false);
				},250);
            }else{
			    var $elClass = $(e.target).hasClass('fs-dropdown-open');
			    $elClass ? ($(e.target).find('.fs-dropdown-element').eq(0).dropdown("close"),  $(e.target).attr('aria-expanded', false)) : ($(e.target).find('.fs-dropdown-element').eq(0).dropdown("open"), $(e.target).attr('aria-expanded', true));
			
			    ($elClass) ? $(e.target).find('.fs-dropdown-item').attr('tabindex', '-1') : $(e.target).find('.fs-dropdown-item').attr('tabindex', '0');
            }
		}
	});
	$(document).on('focusin','.instagram_carousel_item_link', function(e){
		if($(this).parents('.instagram_carousel_item').attr('aria-hidden') == 'true'){$(this).parents('.instagram_carousel_item').attr('aria-hidden', 'false')}
	});
	
	$(document).on('click', '.fs-dropdown, .fs-dropdown-item', function(e){
		if($(e.target).hasClass('fs-dropdown')){
			var $elClass = $(e.target).hasClass('fs-dropdown-open');
			$elClass ? ($(e.target).find('.fs-dropdown-element').eq(0).dropdown("close"),  $(e.target).attr('aria-expanded', false)) : ($(e.target).find('.fs-dropdown-element').eq(0).dropdown("open"), $(e.target).attr('aria-expanded', true));
		}else if($(e.target).hasClass('fs-dropdown-item')){
			var parents = $(e.target).parents('.fs-dropdown');
			parents.attr('aria-expanded', false);
			setTimeout(function(){
				parents.find('.fs-dropdown-item').attr({
					'role': 'option',
					'aria-selected': false
				});
				$(e.target).attr('aria-selected', true);
				parents.find('.fs-dropdown-item_selected').attr('aria-selected', true);
				//$(e.target).attr('aria-selected', true).siblings('.fs-dropdown-item').attr('aria-selected', false);
			},250);
		}
	});


	if($(window).width() < 980 && $('.sub_nav_sidebar').length){
		$('.page_content').before($('.sub_nav_sidebar'));
	}
	$(window).on('resize', function(){
		if($(window).width() < 980 && $('.sub_nav_sidebar').length){
			$('.page_content').before($('.sub_nav_sidebar'));
		}else{
			$('.page_content').after($('.sub_nav_sidebar'));
		}
	});

	$.each($('.fs-dropdown'), function(i,v){
		var selId = $(this).find('.fs-dropdown-element').attr('id'),
		newId = selId+'-selected';
		$(this).attr({'aria-labelledby':newId, 'aria-live':'polite','aria-haspopup':'true','role':'listbox', 'aria-expanded':false}).find('.fs-dropdown-selected').attr({'id':newId, 'aria-hidden': 'false'});
		$(this).find('.fs-dropdown-options').attr({'aria-hidden': 'false'});
		if(typeof($(this).attr('aria-describedby')) == 'undefined' && $(this).hasClass('explore_topics_dropdown')){
			$(this).attr('aria-describedby', 'carouselPagerMsg');
		}
	});

	$('.fs-dropdown').on('focus', function(){
		if(typeof($(this).attr('aria-labelledby')) == 'undefined' || $(this).attr('aria-labelledby').includes('undefined')){
			var selId = $(this).find('.fs-dropdown-element').attr('id'),
			newId = selId+'-selected';
			$(this).attr({'aria-labelledby':newId, 'aria-live':'polite','aria-haspopup':'true','role':'listbox', 'aria-expanded':false}).find('.fs-dropdown-selected').attr({'id':newId, 'aria-hidden': 'false'});
			$(this).find('.fs-dropdown-options').attr({'aria-hidden': 'false'});
		}
		if(typeof($(this).attr('aria-describedby')) == 'undefined' && $(this).hasClass('explore_topics_dropdown')){
			$(this).attr('aria-describedby', 'carouselPagerMsg');
		}
	});
	
	$.each($('.instagram_carousel_item_footer_link'), function(i,v){
		$(this).prepend('<span class="sr-only">' + $(this).attr('title') + '</span>');
	});

	$.each($('.instagram_carousel_item_link'), function(i,v){
		$(this).attr('aria-label', $(this).siblings('.instagram_carousel_item_caption').find('.instagram_carousel_item_description').text());
	});
	
	$(document).on('focus','a.explore_story_link',function(e){
		$(this).parent('article').css('border', '2px solid #fff');
	}).on('blur','a.explore_story_link',function(e){
		$(this).parent('article').css('border', 'none');
	});
	
	$(document).on('keypress', '.sub_nav_handle.fs-navigation-toggle-handle.fs-navigation-enabled', function(e){
    var b = e.keyCode;
    if(b == 13 || b == 32){
        e.preventDefault();
        e.stopPropagation();
        $(this).click();
    }
});
	
	/**
	$.each('.instagram_carousel_item_likes', function(i,v){
		$(this).append('<span class="sr-only">Number of Likes</span>');
	});
	$.each('.instagram_carousel_item_comments', function(i,v){
		$(this).append('<span class="sr-only">Number of Comment</span>');
	});
	**/

	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			$.each(mutation.addedNodes, function(i,node){
				if (typeof(node.classList) == 'object'){
					var cList = Object.values(node.classList);
					if(cList.indexOf("fs-dropdown") >= 0){
						var selId = $(node).find('.fs-dropdown-element').attr('id'),
						newId = selId+'-selected';
						$(node).attr({'aria-labelledby':newId, 'aria-live':'polite','aria-haspopup':'true','role':'listbox', 'aria-expanded':false}).find('.fs-dropdown-selected').attr({'id':newId, 'aria-hidden': 'false'});
						$(this).find('.fs-dropdown-options').attr({'aria-hidden': 'false'});
						if(cList.indexOf("explore_topics_dropdown") >= 0){
							$(node).attr('aria-describedby', 'carouselPagerMsg');
						}
					}
					if(cList.indexOf("fs-dropdown-item") >= 0){
						$(node).attr({
							'role': 'option',
							'aria-selected': ((cList.indexOf("fs-dropdown-item_selected") >= 0) ? true : false)
						});

					}
				}
			});
		});
	});
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true,

	});
	setTimeout(function(){
		observer.disconnect();
	}, 45000);

	$('.sub_nav_handle').on('click', function() {
	  if ($(this).hasClass('fs-navigation-open')) {
	    $(this).attr('aria-expanded', 'false');
	  } else {
	    $(this).attr('aria-expanded', 'true');
	  }
	});

}(jQuery));
