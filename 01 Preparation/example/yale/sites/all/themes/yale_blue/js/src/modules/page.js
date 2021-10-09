/*-------------------------------------------
	Page
-------------------------------------------*/

	var IE8 = IE8 || false,
	    IE9 = IE9 || false;

	/* global picturefill, Modernizr */

	Site.modules.Page = (function($, Site) {
		var $siteAlert,
		$bodyWrapper,
		$pageDivider,
		$carouselCount,
		$exploreForm,
		$curioForm,
		$exploreDropdown,
		exploreSlug,
		$cardCarousel,
		$historyCarousel,
		$historyCaptionCarousel,
		$timeline,
		$videoPlayer,
		$googleSearch,
		$featureCarousel,
		$featureCaptionCarousel,
		$departmentSearchDropdown,
		$marker,
		$siteSearch,
		$directorySearch,
		$mainNavItem,

		$skipLink,
		$header,
		$main,
		$footer,
		$mobileSidebar,

		$mobileOpenButton,
		$mobileCloseButton,
		$mobileFocusables,
		$firstMobileFocusable,
		$lastMobileFocusable;


		function init() {
			$siteAlert                   = $(".site_alert");
			$bodyWrapper                 = $(".body_wrapper");
			$pageDivider                 = $(".page_divider");
			$carouselCount               = $(".carousel_count");
			$exploreForm                 = $(".news_explore_form");
			$curioForm                   = $(".explore_topics");
			$cardCarousel                = $(".card_carousel_wrapper");
			$historyCarousel             = $(".history_carousel");
			$historyCaptionCarousel      = $(".history_caption_carousel");
			$timeline                    = $(".history_timeline");
			$videoPlayer                 = $('.video_callout');
			$googleSearch                = $('.google-cse');
			$featureCarousel             = $(".feature_carousel");
			$featureCaptionCarousel      = $(".feature_caption_carousel");
			$departmentSearchDropdown    = $('.js-department-search');
			$marker                      = $('.timeline_marker_label');
			$siteSearch                  = $('.search_block, .site_search');
			$directorySearch             = $('.directory_search_form');
			$mainNavItem                 = $('.main_nav_item');

			$skipLink                    = $('#skip_to_content');
			$header                      = $('#header');
			$main                        = $('#page');
			$footer                      = $('#footer');
			$mobileSidebar               = $('.mobile_sidebar');
			$mobileOpenButton            = $('#header button.mobile_nav_handle');
			$mobileCloseButton           = $('.mobile_sidebar button.mobile_nav_handle');

			$mobileFocusables            = $mobileSidebar.find('a[href]');
		  $firstMobileFocusable        = $mobileFocusables.first()[0];
		  $lastMobileFocusable         = $mobileFocusables.last()[0];

			// Plugins
			buildPlugins();

			if ($exploreForm.length) {
				$exploreDropdown  = $exploreForm.find(".news_explore_select");
				exploreSlug       = "http://news.yale.edu/";

				$exploreDropdown.on("change", selectExplore);
				$exploreForm.on("submit", function() {
					$.analytics("event", {
					    eventCategory: "Home Page News",
					    eventAction: "Explore",
					    eventLabel: $exploreDropdown.find("option:selected").val()
					});
				});
			}

			if ($curioForm.length) {
				var updateCurioForm = function (event) {
					var currentTopic = $(event.data.tid).val();
					var currentTopicTitle = $(event.data.tid).find('option:selected').text();
					if (currentTopic === '') {
						currentTopic = 'All';
					}
					$.post(
						'/views/ajax',
						{
							view_name: 'explore_yale',
							view_display_id: 'block',
							"field_topic_tid": currentTopic
						},
						function (response) {
								if (response[1] !== undefined) {
									var viewHTML = response[1].data;
									var $regionBottom = $('.region-content-bottom');
									$('.explore_section').replaceWith(viewHTML);
									$regionBottom.find(".js-dropdown").dropdown();
									$regionBottom.find(".js-carousel").carousel();
									$regionBottom.find(".js-lightbox").lightbox({
										mobile: true
									});
									$regionBottom.addClass('loading');
									picturefill();
								}
						}
					);
					$.analytics("event", {
					    eventCategory: "Curio",
					    eventAction: "Shuffle",
					    eventLabel: currentTopicTitle
					});
				};

				$('.region-content-bottom').on('click', '.explore_shuffle_button1', { tid: "#edit-field-topic-tid1" }, updateCurioForm);
				$('.region-content-bottom').on('click', '.explore_shuffle_button2', { tid: "#edit-field-topic-tid2" }, updateCurioForm);
				$('.region-content-bottom').on('change', '#edit-field-topic-tid1', { tid: "#edit-field-topic-tid1" }, updateCurioForm);
				$('.region-content-bottom').on('change', '#edit-field-topic-tid2', { tid: "#edit-field-topic-tid2" }, updateCurioForm);

				$('.region-content-bottom').on("click",".explore_story_link, .explore_story_button_explore, .explore_story_button_more", function() {
					$.analytics("event", {
						eventCategory: "Curio",
				    eventAction: "Click",
				    eventLabel: $(this).data('title')
					});
				});


			}

			if ($videoPlayer.length) {
				$videoPlayer.each(function(){

					var $videoSelect = $(this).find('.video_callout_language'),
							$videoRegion = $(this).find('.video_callout_player');
					$videoSelect.change(function(){
						var videoEmbed = loadVideo($videoSelect.val());
						$videoRegion.html(videoEmbed);
					});
					$videoSelect.trigger('change');
				});

			}

			if ($googleSearch.length) {
				$googleSearch.find('.form-text').attr('style','');
			}

			if($directorySearch.length) {
				$directorySearch.on("submit", function(){
					var searchTerm = $directorySearch.find('.directory_search_input').val();
					if(searchTerm.length>0) {
						$.analytics("event", {
						    eventCategory: "Directories",
						    eventAction: "Search",
						    eventLabel: searchTerm
						});
					}
				});
			}

			$departmentSearchDropdown.change(function(){
				var area = $(this).val();
				if (area.length>0) {
					$('.department_results_divider').show();
					$('.department_results_list article').hide();
					$('.department_results_list').find('.' + area).show();
					$('.department_results_list article:visible').removeClass('bg_gray_light');
					$('.department_results_set').each(function(){
						$(this).find('.department_item:visible').filter(':odd').addClass('bg_gray_light');
					});

					$('.department_results_divider').each(function(){
						var $thisDivider = $(this);
						var $results = $thisDivider.next('.department_results_set');
						if ($results.find('article:visible').length===0) {
							$thisDivider.hide();
						}
					});

					$.analytics("event", {
					    eventCategory: "Departments & Programs",
					    eventAction: "Action",
					    eventLabel: area
					});

				} else {
					$('.department_results_list article, .department_results_divider').show();
					$.analytics("event", {
					    eventCategory: "Departments & Programs",
					    eventAction: "Action",
					    eventLabel: 'All'
					});
				}
			});

			$marker.click(function() {
				var year   = $(this).data("year"),
					article  = $historyCarousel.find(".carousel_item[data-year='" + year +"']").index(),
					index    = article + 1;
				$historyCarousel.carousel("jump", index);
				$.analytics("event", {
					eventCategory: "Carousel - Traditions & History",
					eventAction: "Click",
					eventLabel: year
				});
			});

			$siteSearch.submit(function(e){
				Site.killEvent(e);
				var searchTerm = $(this).find('input').val();
				document.location.replace('/search/google/' + searchTerm + "?query=" + searchTerm);
			});


			var baseURI = window.location.host;
			$("body").on("click", function(e) {

				// abandon if link already aborted or analytics is not available
				if (e.isDefaultPrevented() || typeof ga !== "function") {
					return;
				}

				// abandon if no active link or link within domain
				var link = $(e.target).closest("a");
				if (link.length !== 1 || baseURI === link[0].host) {
					return;
				}

				var href = link[0].href;

				$.analytics("event", {
					eventCategory: "Outbound Link",
					eventAction: "Click",
					eventLabel: href
				});

			});

			// Placeholder attribute polyfill
			if (!Modernizr.input.placeholder) {
				placeholderPolyfill();
			}

			$mainNavItem.find("a").focus(function () {
				$(this).closest(".main_nav_item").addClass("focused");
			});

			$mainNavItem.find("a").blur(function () {
				$(this).closest(".main_nav_item").removeClass("focused");
			});

		}

		function buildPlugins($target) {

			picturefill();

			if (!$target) {
				$target = $(Site.$body);
			}

			// Plugins

			if (IE8 === true) {
				$target.find(".js-carousel").carousel({ useMargin: true });
			} else {
				$target.find(".js-carousel").carousel();
			}

			$target.find(".js-background").background();
			$target.find(".js-checkbox").checkbox();
			$target.find(".js-dropdown").dropdown();
			$target.find(".js-equalize").equalize();
			$target.find(".js-lightbox").lightbox({
				mobile: true
			});
			$target.find(".js-navigation").navigation({ maxWidth: Site.maxLG + "px" });
			$target.find(".js-swap").swap();
			$target.find(".js-tab").tabs();



			// Carousel Count
			$carouselCount.find(".js-carousel").on("update.carousel", carouselCount);

			// Carousel Tracking
			$(".js-carousel").on("update.carousel", carouselTrack);

			// History Timeline
			$historyCarousel.on("update.carousel", carouselHistory);
			$historyCaptionCarousel.on("update.carousel", carouselHistory);

			// Linked Carousles
			$featureCarousel.on("update.carousel", updateCarousel);
			$featureCaptionCarousel.on("update.carousel", updateCaptionCarousel);

			// Generic toggles
			$target.find(".js-toggle")
				.not(".js-bound")
				.on("click", ".js-toggle_handle", onToggleClick)
				.addClass("js-bound");

			// Scroll To
			$target.find(".js-scroll_to")
				.not(".js-bound")
				.on("click", onScrollTo)
				.addClass("js-bound");

			// Media Queries
			$.mediaquery("bind", "mq-key", "(min-width: " + Site.minMD + "px)", {
				enter: function() {
					mqMedium();
				}
			});

			$.mediaquery("bind", "mq-key", "(min-width: " + Site.minLG + "px)", {
				enter: function() {
					mqLarge();
				},
				leave: function() {
					mqMedium();
				}
			});

			$.mediaquery("bind", "mq-key", "(max-width: " + Site.maxMD + "px)", {
				enter: function() {
					mqSmall();
				}
			});

			if ($carouselCount.length) {
				carouselCount();
			}

			if ($cardCarousel.length) {
				cardCarousel();
			}

			if ($historyCaptionCarousel.length) {
				carouselHistory();
			}

			$(".mobile_nav_handle").click(function() {
				$(".mobile_sidebar").removeClass("overflow_scroll");

				$(".mobile_sidebar_body").transition({
				property: "transform",
				}, function() {
					$(".mobile_sidebar").addClass("overflow_scroll");
					if ($('body').hasClass("fs-navigation-lock")) {
					  $skipLink.css('visibility', 'hidden');
					  $header.css('visibility', 'hidden');
				    $main.css('visibility', 'hidden');
					  $footer.css('visibility', 'hidden');
					  $firstMobileFocusable.focus();
					} else {
					  $mobileOpenButton.focus();
					}
				});
			});

			function setAriaHidden(selection, state) {
			  selection.attr('aria-hidden', state);
			}

			$mobileOpenButton.click(function() {
			  setAriaHidden($skipLink, 'true');
			  setAriaHidden($header, 'true');
			  setAriaHidden($main, 'true');
			  setAriaHidden($footer, 'true');
			  setAriaHidden($mobileSidebar, 'false');
			});

			$mobileCloseButton.click(function() {
			  $skipLink.css('visibility', 'visible');
				$header.css('visibility', 'visible');
				$main.css('visibility', 'visible');
				$footer.css('visibility', 'visible');
        setAriaHidden($skipLink, 'false');
			  setAriaHidden($header, 'false');
			  setAriaHidden($main, 'false');
			  setAriaHidden($footer, 'false');
			  setAriaHidden($mobileSidebar, 'true');
			});

			$mobileSidebar.keydown(function(event) {
			  if (event.which === 27) {
			    $mobileCloseButton.trigger('click');
			    return;
			  }

			  if (event.which === 9) {
			    if (event.shiftKey) {
			      if (event.target === $firstMobileFocusable) {
			        $lastMobileFocusable.focus();
			        event.preventDefault();
			      }
			    } else {
			      if (event.target === $lastMobileFocusable) {
			        $firstMobileFocusable.focus();
			        event.preventDefault();
			      }
			    }
			  }
			});

			$target.find("table").wrap('<div class="table_wrapper"></div>');

		}

		function onToggleClick(e) {
			Site.killEvent(e);

			var $target     = $(e.delegateTarget),
				activeClass = "js-toggle_active";

			if ($target.hasClass(activeClass)) {
				$target.removeClass(activeClass);
			} else {
				$target.addClass(activeClass);
			}

			// Focus desktop search
			if ($target.hasClass("header")) {
				setTimeout(function() {
					$(".site_search_input").trigger("focus");
				}, 500);
			}
			// Track Media Gallery opening
			if ($target.hasClass("media_gallery")) {
				var galleryStatus = "Close";
				if($target.hasClass("js-toggle_active")) {
					galleryStatus = "Open";
				}
				$.analytics("event", {
				    eventCategory: "Media Gallery",
				    eventAction: "Click",
				    eventLabel: galleryStatus
				});

			}
		}

		function onScrollTo(e) {
			Site.killEvent(e);

			var $target = $(e.delegateTarget),
				id = $target.attr("href");

			scrollToElement(id);
		}

		function scrollToElement(id) {
			var $to = $(id);

			if ($to.length) {
				var offset = $to.offset();

				$("html, body").animate({ scrollTop: offset.top },400,function() {
				  $to.focus();
				});
			}
		}

		function mqSmall() {
			if ($exploreForm.length) {
				$exploreForm.prependTo(".news_explore_supporting");
			}
		}

		function mqMedium() {
			if ($siteAlert.length) {
				$siteAlert.insertAfter($pageDivider);
			}
			if ($exploreForm.length) {
				$exploreForm.appendTo(".news_explore_supporting");
			}
		}

		function mqLarge() {
			if ($siteAlert.length) {
				$siteAlert.insertBefore($bodyWrapper);
			}
			if ($exploreForm.length) {
				$exploreForm.appendTo(".news_explore_header");
			}
		}

		function carouselCount() {
			var totalSlides   = $carouselCount.find(".media_gallery_slide").length;
			var currentIndex  = $carouselCount.find(".fs-carousel-visible").index() + 1;

			$carouselCount.find(".media_gallery_counter_index").text(currentIndex);
			$carouselCount.find(".media_gallery_counter_total").text(totalSlides);
		}

		function carouselTrack() {
			//alert('something');
			var pageTitle = $(document).find("title").text();
			pageTitle = pageTitle.substring(0,pageTitle.indexOf(" | "));
			if (pageTitle.length === 0) {
				pageTitle = "Home";
			}
			$.analytics("event", {
			    eventCategory: "Carousel - " + pageTitle,
			    eventAction: "Click"
			});
		}

		function selectExplore() {
			$exploreForm.attr("action", exploreSlug + $exploreDropdown.find("option:selected").val());
		}

		function placeholderPolyfill() {
			$('input, textarea').placeholder();
		}

		function cardCarousel() {
			var $panel       = $cardCarousel.find(".card_carousel_panel");
			var $controls    = $cardCarousel.find(".card_carousel_controls");
			var $pagination  = $cardCarousel.find(".fs-carousel-pagination");

			$panel.insertBefore($pagination);
			$pagination.insertBefore($controls);
		}

		function carouselHistory() {
			var totalMarkers   = $historyCarousel.find(".carousel_item").length;
			var currentMarker  = $historyCarousel.find(".fs-carousel-visible").index();
			var $marker        = $timeline.find(".timeline_marker");

			$timeline.find(".timeline_fill").css("width", currentMarker * (100 / (totalMarkers - 1)) + "%");

			$marker.each(function() {
				var index = $(this).index();
				$(this).css("left", index * (100 / (totalMarkers - 1)) + "%");
			});
		}

		function updateCarousel(e, index) {
			$featureCaptionCarousel.carousel("jump", index + 1, true);
		}

		function updateCaptionCarousel(e, index) {
			$featureCarousel.carousel("jump", index + 1, true);
		}

		function loadVideo(source) {
			var youtubeParts = source.match( /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i ), // 1
				vimeoParts   = source.match( /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/ ), // 3
				url = (youtubeParts !== null) ? "//www.youtube.com/embed/" + youtubeParts[1] : "//player.vimeo.com/video/" + vimeoParts[3];

			return '<iframe src="' + url + '" seamless="seamless"></iframe>';

		}

		// Hook into main init routine
		Site.onInit.push(init);

		return {
			//
		};
	})(jQuery, Site);
