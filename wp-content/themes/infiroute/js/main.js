/*
* File       : js/main.js
* Author     : STUDIO-JT (KMS)
* Guideline  : JTstyle.1.0
*
* SUMMARY:
* 1) Global Variable
* 2) JT Default Functions INIT
* 3) Other Functions INIT
* 4) ON LOAD
* 5) ON RESIZE
* 6) JT Default Functions
* 7) Other Functions
*/


jQuery(function($) {


/* **************************************** *
* Global Variable
* **************************************** */
/* main key visual tl */
var main_visual_progress = null;
var main_fullpage_slider = null;
var other_business_slider = null;

/* These Transition must be global to allow destroy on the fly */
var transition_start_tween = {};
var transition_end_tween = {};
var transition_fade_start_tween = {};
var transition_fade_end_tween = {};
var tl_ad = {};

/* Track home index data */
var home_list_back_flag = false;
var home_list_idx = null;
var intro_done = false;



/* **************************************** *
* RUN
* **************************************** */
init(true);
JT.ui.add( init );



/* **************************************** *
* INIT
* **************************************** */
function init(loadonce){

    //if(typeof gsap.killTweensOf !== "undefined"){
        gsap.killTweensOf(document.getElementById('main'));
    //}

	if (sessionStorage.getItem("intro") && sessionStorage.getItem("intro") == "1") {
	    intro_done = true;
		gsap.set('.intro',{autoAlpha:0})
	}

    // Refresh
    JT.smoothscroll.destroy();

    console.log('init');

    if($('body').hasClass('home')){
        main_fullpage();
        main_visual();
        ball_motion();
		intro_init();
    }else{
        JT.smoothscroll.init();
    }

    // MENU
    primary_menu()

    // scroll_down();
    media_image_popup();
    //sns_popup_init();

    isotope_init();
    tabs('.tabs_component');
    jt_accordion();
    //jt_category_swip();
    vimeo_play();
    youtube_play();
    loadmore();
    ad_request_btn_scroll_sniff()
    jt_popup();
    icheck_init();
    selectric_init();
    contact_field();
    custom_input_file();
    nicescroll_init();
    comment_toggle();
    financial_chart_init();
    stock_tab();
    ir_accordion();
    jt_board_list_fullclick();
	single_slider_init();
    other_business_slider_init();
	component_logo_slider_init();
	jt_draw_line();
	flipbook_download_btn();
	pr_ajax_list();
	platform_goto();
	jt_share_open();
	//share_clipboard();
	//share_kakao();
    footer_menu_init_state();
	ad_request_btn_scroll_sniff_init();
	whatwedo_smallscreen_slide();
	//small_screen_footer();
	research_history_loadmore();
	google_partner_api();


	if( $('body').hasClass('single') ) {
		//jt_share_open();
		JT.ui.get('sns_popup_init');
		JT.ui.get('share_clipboard');
		JT.ui.get('share_kakao');
		//single_share_sticky();
		//single_other_post();
		//youtube_play();
	}


    //split_word_helper();
    jt_fullvid('.jt_fullvid');
    // mapbox_init();
    if($('body').hasClass('page-template-company-location')){
        googlemap_init();
    }

    unveil_init();
    // broken_image();

    //motion_rotate();
    //motion_gradient_btn();

    // ios_debugging();

    //element_cursor('iframe, #barba-wrapper .element_cursor,#barba-wrapper a,#barba-wrapper button, #barba-wrapper .swiper-pagination, #barba-wrapper .swiper_control');
    element_cursor('.swiper-button-next,.swiper-button-prev');

    // Sub
    ci_slide_color();

	if($('body').hasClass('error404') || $('body').hasClass('page-template-email') || $('body').hasClass('page-template-company-ci')){
        ball_motion();
		//console.log('000')
    }

    // First load
    if (typeof loadonce !== 'undefined' && loadonce === true) {

        //init_sub_nav_bar();

		//transition_init();
		transition_fade_init();
        barba_init();  //barba init function

        minimize_header();
        top_menu();
        menu_layout();
        primary_menu_init_active();
		pdf_viewer_scroll();

        //nav_open();
		nav_open_mask();
        btn_spread_motion();

        small_screen_nav_toggle();
        global_search_setting();

        screen_nav_a11y();
        focus_on_tab_only();
        business_toggle_picto();

		ad_request_popup();

        // Footer
		scroll_top();
        family_select();
        footer_menu();

        qhd_viewport_zoom();

        //custom_cursor();
        //element_cursor('#header .element_cursor, #header a, .pop_menu_container, .footer .element_cursor,.footer a');
        //element_cursor('#header .element_cursor, #header a, .pop_menu_container, .footer .element_cursor');

		// fix jquery 3 on load issue on IE11
		if($('html').hasClass('ie11')){
			setTimeout(function(){
                init_onload();
			},1000);
		}


    // >=2nd load
    }else{

        /* JT Default Functions */
        match_height();
        match_height('.main_what_list > li > p');
        match_height('.system_welfare_list > ul > li > .system_welfare_list_content');
        match_height('.business_other_slide_item > a');
		match_height('.about_vision_value_list > li > p');

        component_match_height('p','.components_cards_icon');
        component_match_height('.components_cards_num_item_inner','.components_cards_num');

        /* Other Functions */
        button_motion();
        //lang_nav();
        sub_menu_tab();
        spidochescaler_init();

		/* Fix perf issue*/
		motion_with_class();

		/* Fix home footer menu bug */
		if($('body').hasClass('home')){
			 footer_menu();
		}

    }

    // Hack trigger resize to debug some stuff
    $(window).trigger('resize');

}



/* **************************************** *
* ON LOAD
* **************************************** */
$(window).on('load',function() {

    if(!$('html').hasClass('ie11')){ // fix jquery 3 on load issue on IE11
        init_onload();
    }

});

function init_onload(){
	/* JT Default Functions */
    match_height();
    match_height('.main_what_list > li > p');
    match_height('.system_welfare_list > ul > li > .system_welfare_list_content');
	match_height('.business_other_slide_item > a');
	match_height('.about_vision_value_list > li > p');

    component_match_height('p','.components_cards_icon');
    component_match_height('.components_cards_num_item_inner','.components_cards_num');

    /* Other Functions */
    button_motion();
    sub_menu_tab();
    spidochescaler_init();

    /* Delay some function for performance */
	setTimeout(function(){
		menu_layout_bg_video();
		animate_favicon();
	},1000)


    /* Fix motion load */
	if(!$('body').hasClass('home')){
		$('body').addClass('transition_tween_ended');
	}

	/* Fix perf issue*/
	motion_with_class();
}



/* **************************************** *
* ON RESIZE
* **************************************** */
// INITIALIZE RESIZE

function init_resize(){

    qhd_viewport_zoom();

	match_height();
    match_height('.main_what_list > li > p');
    match_height('.system_welfare_list > ul > li > .system_welfare_list_content');
	match_height('.business_other_slide_item > a');
	match_height('.about_vision_value_list > li > p');

    component_match_height('p','.components_cards_icon');
    component_match_height('.components_cards_num_item_inner','.components_cards_num');

}

// Init resize on reisize
$(window).on('resize',init_resize);


/* **************************************** *
* BARBA PAGE TRANSITION
* **************************************** */
function barba_init(){

    // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    if ('history' in window && 'pushState' in history){

        if(barba == "undefined") return;

        // Wp admin link add data-barba-prevent attribute
        if($('body').hasClass('admin-bar')){
            $( "#wpadminbar a" ).each( function() {
                $( this ).attr( 'data-barba-prevent' , true );
            });
        }

        // Prevent current url to reload page
		/*
		$('a[href]').not('.home #logo a, .search #logo a').on('click', function(e) {
            if($(this).hasClass('main-menu-link')) { return; }

            if(e.currentTarget.href === window.location.href) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
		*/

        // track bodyclass to update them a the right time
        var body_classes_tracker = '';

        // barba init
        barba.init();

        barba.hooks.leave(function(){

            return new Promise(function (resolve) {

                //if($('html').hasClass('mobile')){

                    //new TweenMax.to('#barba-wrapper', .15, { autoAlpha:0, onComplete: function(){
                        //gsap.killTweensOf(document.getElementById('main'));
                        //resolve();
                    //}});

                //}else{



					TweenMax.set('.transition_mask', {y: '100%'});

                    //transition_start_tween.restart();
					transition_fade_start_tween.restart();

                    transition_fade_start_tween.eventCallback("onComplete", function(){

						$('body').removeClass('open_menu');
		                $('#global_menu_outer').hide();

						Waypoint.destroyAll();
                        gsap.killTweensOf(document.getElementById('main'));

						resolve();
                    });

                //}

            });

        }); // barba leave hook

        barba.hooks.enter(function(data){

            var $new_dom = $(data.next.container);
            //var $old_dom = $(data.current.container);

            $new_dom.css({visibility : 'hidden'});

			// ie text flash fix
			TweenMax.set('.article_header, .article_body',{autoAlpha:0})

            // Update body class
            var response = data.next.html.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', data.next.html);
			var $response = $(response);
            body_classes_tracker = $response.filter('notbody').attr('class');

            // Update admin bar
            if($('body').hasClass('admin-bar')){
                $( "#wpadminbar" ).replaceWith( $response.find('#wpadminbar'));
                $( "#wpadminbar a" ).each( function() {
                    $( this ).attr( 'data-barba-prevent' , true );
                });
            }


            // Update menu and footer menu content (refresh current class)
            $( "#top_menu" ).replaceWith( $response.find('#top_menu'));
			$( "#primary_menu" ).replaceWith( $response.find('#primary_menu'));
            $( ".footer_primary_menu" ).replaceWith( $response.find('.footer_primary_menu').first());

			// browser back check
			if(data.trigger == 'back') {
				home_list_back_flag = true;

				if( body_classes_tracker.match('home') == null ){
					home_list_idx = null;
				}
			} else {
				home_list_back_flag = false;
			}


            // Scroll to the top
            window.scrollTo(0,0);

            // Update body class
            $('body').attr('class', body_classes_tracker);

			// Reset home menu index
			$('body').attr('data-slide-index','0');

            // Clear Global UI
			$('body').removeAttr('style');
			$('#header,.pop_menu_container').removeAttr('style');
            /*
            if(scrolling_passive()){
                window.removeEventListener("wheel", destroy_scrolling);
            }else{
                $(window).off("mousewheel DOMMouseScroll", destroy_scrolling);
            }
            */

            // Prevent memory leak
            clean_memory($(data.current.container));


            // After images are full loaded process the transition
            $new_dom.imagesLoaded(function() {

                $new_dom.css({visibility : 'visible'});

				//if($('html').hasClass('mobile')){
                    //new TweenMax.to('#barba-wrapper', .2, { autoAlpha:1 });
                //}else{
                    //transition_end_tween.restart();
				    transition_fade_end_tween.restart();
                //}

                JT.ui.init();

				$("html, body").stop().animate({scrollTop: 0}, 0); /* IE scroll fix*/

                /* / Google Analytics
                if (typeof gtag == 'function' && barba.history.size > 1) {
                    gtag('config', 'UA-*********-1', {'page_path': window.location.pathname});
                    gtag('config', 'UA-*********-1', {'page_path': window.location.pathname});
                }*/

            }); // imagesLoaded



        }); // barba enter hook

    } // is push state

}



// CLEAN THE MEMORY
function clean_memory(oldContainer){

    //var $old = $(oldContainer);

    //if(typeof gasp.kill !== "undefined"){
        //gasp.kill(null, $old); // killtween
    //}

    // Kill nicescroll
    $('#barba-wrapper .nicescroll_area').getNiceScroll().remove();

    // Kill function attached to events
    if(typeof JT.globals.jt_fullvid_resize == "function"){
		$(window).off('resize', JT.globals.jt_fullvid_resize);
	}

	if(typeof JT.globals.jt_category_swip_resize == "function"){
		$(window).off('resize', JT.globals.jt_category_swip_resize);
	}

	if(typeof JT.globals.jt_category_swip_resize == "function"){
		$(window).off('resize', JT.globals.jt_category_swip_resize);
	}

	if(typeof JT.globals.jt_equal_height == "function"){
		$(window).off('resize', JT.globals.jt_equal_height);
	}

	if(typeof JT.globals.sub_tab_nav_clone_sticky == "function"){
		$(window).off('scroll', JT.globals.sub_tab_nav_clone_sticky);
	}

	if(typeof JT.globals.main_fullpage_ie_scroll == "function"){
		$(window).off('scroll', JT.globals.main_fullpage_ie_scroll);
	}

}


// Transition timeline init
function transition_init(){

    var $container = $('#transition_container');
    var $transition = $('.transition_mask');
    var $artboard = $('#transition_layer');

    // Start
    transition_start_tween = new TimelineMax({paused:true});
    transition_start_tween.fromTo($transition, 0.4, {
        y: '100%'
    }, {
        y: '0%',
        ease : Sine.in,
        //ease: CustomEase.create("custom", "M0,0 C0,0 0.00311,0.05585 0.01418,0.08256 0.02604,0.11119 0.04248,0.13348 0.06489,0.15663 0.08954,0.18211 0.11144,0.19545 0.14358,0.21628 0.25271,0.28702 0.3214,0.32011 0.42877,0.39253 0.49201,0.43519 0.52885,0.46268 0.58463,0.51379 0.67044,0.59239 0.72198,0.64193 0.79757,0.73041 0.88146,0.82861 1,1 1,1"),
        onStart: function(){
            TweenMax.set($transition, {autoAlpha:1});
            TweenMax.set($container, {autoAlpha:1});
            gsap.to('#main', {duration:0.2 , y: '-150px', autoAlpha:0, ease : Sine.in,onComplete:function(){
                // remove minimize style just before leave
                $('body').removeClass('minimize_header');
            }});
        }
    });

    // End
	//gsap.set('.article_header',{autoAlpha:0})
    transition_end_tween = new TimelineMax({paused:true});
    transition_end_tween.to($transition, 0.2, {
        autoAlpha:0,
        ease: Power2.easeOut,
        //delay: .45,
        onStart: function(){
            TweenMax.to($artboard, 0.5, {height: 0,ease: Power2.easeOut});
            gsap.from('.breadcrumb,.article_title,.picto_ball', { duration:0.8 ,y: '50%',autoAlpha:0,stagger: 0.03,onComplete:function(){
                $('body').addClass('transition_tween_ended');
				business_toggle_picto();
            }});
            gsap.from('.article_body', { duration:0.8 ,delay:0.2, y: '100px', autoAlpha:0});
            gsap.from('.jt_grid_list_item ', { duration:0.8 ,delay:0.4, y: '100px',stagger: 0.1, autoAlpha:0});
			//gsap.set('.article_header',{autoAlpha:1})
        },
        onComplete: function(){
            TweenMax.set($container, {autoAlpha:0});
        }
    });

}

// Transition timeline init
function transition_fade_init(){

    var $container = $('#transition_container');
    var $transition = $('.transition_mask');
    var $artboard = $('#transition_layer');


    // Start
    transition_fade_start_tween = new TimelineMax({paused:true});
	/*
	transition_fade_start_tween.fromTo($transition, 0.05, {
        autoAlpha: 1
    }, {
        autoAlpha: 0,
        ease : Sine.in,
        onStart: function(){
            TweenMax.set($transition, {autoAlpha:1});
            TweenMax.set($container, {autoAlpha:1});
            gsap.to('#main', {duration:0.2 , autoAlpha:0, ease : Sine.in,onComplete:function(){
                // remove minimize style just before leave
                $('body').removeClass('minimize_header');
            }});
        }
    });
	*/
	transition_fade_start_tween.to('#main', 0.1, {
        autoAlpha: 0,
        ease : Sine.in,
        //ease: CustomEase.create("custom", "M0,0 C0,0 0.00311,0.05585 0.01418,0.08256 0.02604,0.11119 0.04248,0.13348 0.06489,0.15663 0.08954,0.18211 0.11144,0.19545 0.14358,0.21628 0.25271,0.28702 0.3214,0.32011 0.42877,0.39253 0.49201,0.43519 0.52885,0.46268 0.58463,0.51379 0.67044,0.59239 0.72198,0.64193 0.79757,0.73041 0.88146,0.82861 1,1 1,1"),
        onComplete: function(){
                // remove minimize style just before leave
                $('body').removeClass('minimize_header');
        }
    });

    // End
    transition_fade_end_tween = new TimelineMax({paused:true});
    transition_fade_end_tween.to($transition, 0.2, {
        autoAlpha:0,
        ease: Power2.easeOut,
        //delay: .45,
        onStart: function(){

			TweenMax.set('.article_header, .article_body',{autoAlpha:1}) // fix IE11 text flash
			TweenMax.to($artboard, 0.5, {height: 0,ease: Power2.easeOut});
            gsap.from('.breadcrumb,.article_title,.picto_ball', { duration:0.8 ,y: '50%',autoAlpha:0,stagger: 0.03,onComplete:function(){
                $('body').addClass('transition_tween_ended');
				business_toggle_picto();
            }});
            gsap.from('.article_body', { duration:0.8 ,delay:0.2, y: '100px', autoAlpha:0});
            gsap.from('.jt_grid_list_item ', { duration:0.8 ,delay:0.4, y: '100px',stagger: 0.1, autoAlpha:0});

        },
        onComplete: function(){
            TweenMax.set($container, {autoAlpha:0});
        }
    });

}



/* **************************************** *
* JT Default Functions
* **************************************** */

/* INTRO ANIMATION */
function intro_init(){

    if(!$('body').hasClass('home')) { return; }

	if(intro_done) { return; }

    $('.intro').prependTo('.main_visual_item_01');

    $('body').addClass('intro_step_01');

	//$('.intro_mask').css('background','green')

	var tl = null;
	var ratio = get_ratio();
	var $win = $(window);
    var w_width = $win.width();
	var w_height = $win.height();
    var w_width_half = ($win.width()/2)/ratio; // ratio to fix qhd scaler issue (>= 2000)

    var $txt = $('.intro_text');
    var $bm_1 = $('.intro_mask_01, .intro_ball_01');
    var $bm_2 = $('.intro_mask_02, .intro_ball_02');
    var $b_1 = $('.intro_ball_01');
    var $b_2 = $('.intro_ball_02');
    var $b_rotate = $('.intro_ball_rotate');
    var $b_r_1 = $('.intro_ball_rotate_01');
    var $b_r_2 = $('.intro_ball_rotate_02');
    var $b_r_3 = $('.intro_ball_rotate_03');
    var $b_r_4 = $('.intro_ball_rotate_04');
    var $b_mask = $('.intro_ball_mask');
	var ball_width = 50;
	var ball_width_half = 0;
	var b_translate = 155;
	var mask_scale = w_width < 2000 ? 50 : 90 ;
	var top_pos = 60;
	var left_pos = 78;
	var margin = 64

	if(w_width < 1660){
		left_pos = 58;
	}
	if(w_width < 1023){
		left_pos = 31;
	}
	if(w_width < 767){
		top_pos = 32;
	}
	if(w_width <= 520){
		ball_width = 28;
	    b_translate = 110;
		margin = 30;
	}

	top_pos = (w_height/ratio) - (top_pos + (margin/2));
	left_pos = (w_width/ratio) - (left_pos + (margin/3));
	ball_width_half = ball_width/2;

    tl = gsap.timeline({repeat: 0, delay: 1.7, paused:1, onComplete:function(){

		// Finish by open and close button (detach to the timeline)
		$('.ad_contact_btn').addClass('open')
		gsap.to('.ad_contact_btn',{delay: 2,onComplete:function(){
		    $('.ad_contact_btn').removeClass('open');
		}});

		// Play visual slideshow
		if($('.main_visual_item').length > 1){
			main_visual_progress.play();
		}
		intro_done = true;

		// enable full page scroll
		main_fullpage_slider.mousewheel.enable();
		main_fullpage_slider.keyboard.enable();
		main_fullpage_slider.allowTouchMove = true;

		// set local session
		sessionStorage.setItem('intro', '1');

	}});

    //gsap.to($txt,{delay: .1,duration: 0.8, autoAlpha:1});

	tl.to($bm_1, {duration: 1.2,x: (w_width_half)+100 ,ease:Sine.easeInOut});
    tl.to($bm_2, {duration: 1.2, x: -((w_width_half)+100),ease:Sine.easeInOut}, "-=1.2");
    tl.to($bm_1, {duration: .4,x: (w_width_half)+ball_width_half,ease:Power2.easeIn });
    tl.to($bm_2, {duration: .4, x: -((w_width_half)+ball_width_half),ease:Power2.easeIn}, "-=.4");
    tl.to([$txt], {duration: 0, autoAlpha:0});
    tl.to($b_2, {duration: 0, autoAlpha:0});
    tl.to($b_1, {duration: .4,width: 110, left: -37.5,ease:Power2.easeOut});
    tl.to($b_1, {duration: .3,width: ball_width,left: 0,ease:Power2.easeIn});

    tl.to([$bm_1,$bm_2], {duration: 0, autoAlpha:0});
    tl.to($b_rotate, {duration: 0, autoAlpha:1});
    tl.to($b_rotate, {duration: 1.4, rotation:400,ease: "slow(0.5, 0.5, false)"});
    tl.to($b_r_1, {duration: .5, x:'-'+b_translate+'px',scale :1.2,ease:Expo.easeOut},"-=1.4"); //(x = 130 + (50/2)
    tl.to($b_r_2, {duration: .5, x:b_translate+'px',scale :1.2,ease:Expo.easeOut},"-=1.4");
    tl.to($b_r_3, {duration: .5, y:'-'+b_translate+'px',scale :1.2,ease:Expo.easeOut},"-=1.4");
    tl.to($b_r_4, {duration: .5, y:b_translate+'px',scale :1.2,ease:Expo.easeOut},"-=1.4");

    tl.to([$b_r_1, $b_r_2, $b_r_3, $b_r_4], {duration: .5, x:0 ,y:0,ease:Expo.easeOut},"-=.1");
	tl.to($b_rotate, {duration: .5,scale :0.6,ease:Expo.easeOut},"-=.5");
    tl.to([$b_r_1, $b_r_2, $b_r_3, $b_r_4], {duration: 0, autoAlpha:0,onComplete:function(){
        $('body').addClass('intro_step_02');
    }});
    tl.to($b_mask, {duration: .6, scale:mask_scale,ease:Power3.easeOut, onComplete:function(){
        $('body').addClass('intro_step_03');
    }});
    tl.to($b_mask, {duration: .5, scale:0, top: top_pos, left: left_pos,ease:Power3.easeOut, onComplete:function(){
        $('body').addClass('intro_step_finish');
    }},"+=.9");

    /*
	tl.to($bm_1, {duration: 1.2,x: w_width_half+100 ,ease:Power2.easeInOut});
    tl.to($bm_2, {duration: 1.2, x: -(w_width_half+100),ease:Power2.easeInOut}, "-=1.2");
    tl.to($bm_1, {duration: .4,x: w_width_half+25,ease:Power2.easeIn });
    tl.to($bm_2, {duration: .4, x: -(w_width_half+25),ease:Power2.easeIn}, "-=.4");
    tl.to([$txt], {duration: 0, autoAlpha:0});
    tl.to($b_2, {duration: 0, autoAlpha:0});
    tl.to($b_1, {duration: .4,width: 110, left: -37.5,ease:Power2.easeOut});
    tl.to($b_1, {duration: .3,width: 50,left: 0,ease:Power2.easeIn});

    tl.to([$bm_1,$bm_2], {duration: 0, autoAlpha:0});
    tl.to($b_rotate, {duration: 0, autoAlpha:1});
    tl.to($b_rotate, {duration: 2, rotation:400,ease: "slow(0.2, 0.7, false)"});
    tl.to($b_r_1, {duration: .5, x:'-'+b_translate+'px',scale :1.2,ease:Expo.easeOut},"-=2"); //(x = 130 + (50/2)
    tl.to($b_r_2, {duration: .5, x:b_translate+'px',scale :1.2,ease:Expo.easeOut},"-=2");
    tl.to($b_r_3, {duration: .5, y:'-'+b_translate+'px',scale :1.2,ease:Expo.easeOut},"-=2");
    tl.to($b_r_4, {duration: .5, y:b_translate+'px',scale :1.2,ease:Expo.easeOut},"-=2");

    tl.to([$b_r_1, $b_r_2, $b_r_3, $b_r_4], {duration: .5, x:0 ,y:0,ease:Expo.easeOut},"-=.1");
	tl.to($b_rotate, {duration: .5,scale :0.6,ease:Expo.easeOut},"-=.5");
    tl.to([$b_r_1, $b_r_2, $b_r_3, $b_r_4], {duration: 0, autoAlpha:0,onComplete:function(){
        $('body').addClass('intro_step_02');
    }})
    tl.to($b_mask, {duration: .8, scale:mask_scale,ease:Power2.easeOut, onComplete:function(){
        $('body').addClass('intro_step_03');
    }})
    tl.to($b_mask, {duration: .4, scale:0, top: top_pos, left: left_pos,ease:Power2.easeOut, onComplete:function(){
        $('body').addClass('intro_step_finish');
    }})
	*/

    tl.resume();

}


/**
 * FIX HEADER ANIMATION
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (KMS, Nico)
 * @requires TweenMax.min.js
 */
function minimize_header() {

    var $window = $(window);
    var $header = $('#header, .pop_menu_container');
    var didScroll     = null;
    var currentScroll = 0;
    var lastScroll    = 0;
    var moveScroll    = 10;

    $window.on('scroll', function() {

		if($('body').hasClass('home')) { return;}

        didScroll = true;

        if ($window.scrollTop() > $header.height()) {
            $header.addClass('minimize');
            $('body').addClass('minimize_header');

			// scroll inside iframe
			if(self !== top){
				$('body', window.parent.document).addClass('iframe_minimize_header');
			}


        } else {
            $header.removeClass('minimize');
            $('body').removeClass('minimize_header');

			// scroll inside iframe
			if(self !== top){
				$('body', window.parent.document).removeClass('iframe_minimize_header');
			}

        }
    });

    setInterval(function() {

        if (didScroll && !$('body').hasClass('open_menu')) {
            hasScrolled();
            didScroll = false;
        }

    }, 50);

    function hasScrolled(){

        var has_3_depth   = $('.sub_tab_nav_container').length > 0 ? true : false;

		currentScroll = $(this).scrollTop();

        // Make sure they scroll more than moveScroll
        if(Math.abs(lastScroll - currentScroll) <= moveScroll) return;

        if(currentScroll > lastScroll){ // ScrollDown
            if(currentScroll > $(window).height()){
                if(!has_3_depth){
				    TweenMax.to( $header, 0.4, { autoAlpha:0, y: -60, ease: Power3.easeOut });
				}
                $('body').addClass('hiddenize_header');
            }
        }
        else { // ScrollUp
            if(!has_3_depth){
			    TweenMax.to( $header, 0.4, { autoAlpha:1, y: 0, ease: Power3.easeOut });
			}
            $('body').removeClass('hiddenize_header');
        }

        lastScroll = currentScroll;

    }

}




function nav_open_mask(){

    var $html = $('html');
    var $body = $('body');

    //gsap.set('#pop_menu_circle_overlay',{scale:0});


    var $menu_container = $('#global_menu_outer');
	var $menu_container_inner = $('.global_menu_inner');

	var flag_close = true;

    $('.pop_menu_button').on('click', function(){

        // open menu
        if(!$body.hasClass('open_menu')){

            $body.addClass('open_menu');
			$body.addClass('open_btn_close_state');


			TweenMax.set($menu_container, {autoAlpha: 0})
            TweenMax.fromTo($menu_container, .6, {autoAlpha: 0}, {
				autoAlpha: 1,
				force3D: true,
				ease: Power3.easeOut,
				onStart: function() {
					//$('html, body').on('mousewheel DOMMouseScroll');
					scroll_disable_init();
					$menu_container.show();

				}
			});
			//TweenMax.fromTo($menu_container_inner, .6, {x: '-100%'}, {x: '0%',force3D: true,ease: Power3.easeOut});

			//gsap.to('.primary_menu_inner',{duration:.3,autoAlpha:1});
            //gsap.to('.primary_menu_bg',{duration:.3,autoAlpha:1});

        }else{

            // Close

            $body.removeClass('open_btn_close_state');
            $body.removeClass('open_menu');
            //$body.removeClass('open_menu_layer');
            // gsap.to('.primary_menu_inner,.primary_menu_bg',{ duration:.3, autoAlpha:0});
            //gsap.to('#pop_menu_circle_overlay',{ duration:.4, scale:0});
            //TweenMax.to($menu_container, .6, {x: '100%',force3D: true,ease: Power3.easeOut});
			TweenMax.to($menu_container, .6, {autoAlpha: 0,force3D: true,ease: Power3.easeOut,onComplete:function(){
				$menu_container.hide();
			}});
			/*
			TweenMax.to($menu_container_inner, .6, {x: '-100%',force3D: true,ease: Power3.easeOut,onComplete:function(){
				$body.removeClass('open_menu');
			}});
			*/


            scroll_disable_destroy();

        }

    });


    // Close menu if move to another page
    $('.primary_menu, #logo').on('click','a',function(){

        // Remove overlay
        //$body.removeClass('open_menu');

		//$menu_container.hide();

        // restore scroll
		scroll_disable_destroy();

    });

}



/**
 * small screen navigation
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (KMS)
 * @requires TweenMax.min.js
 */
function nav_open(){

    var $html = $('html');
    var $body = $('body');
    // $header = $('#header'),
    //$menu_container = $('.primary_menu_container'),
    //$menu_overlay = $('#small_menu_overlay'),
    // $menu_close_btn = $('#small_menu_close');
    gsap.set('#pop_menu_circle_overlay',{scale:0});
    gsap.set('.primary_menu_inner',{autoAlpha:0,display:'table'});
    gsap.set('.primary_menu_bg',{autoAlpha:0,display:'block'});

    // open menu
    $('.pop_menu_button').on('click', function(){

        if(!$body.hasClass('open_menu')){

            // Open
            $body.addClass('open_menu');

            gsap.to('#pop_menu_circle_overlay',{ duration:.4, scale:1, onComplete : function(){

                $body.addClass('open_menu_layer');
                if($html.hasClass('desktop')){

                    JT.smoothscroll.destroy();
                    //$('html, body').on('mousewheel DOMMouseScroll', function(){ return false; });
					$('html, body').off('mousewheel DOMMouseScroll');
                }
            }});
            gsap.to('.primary_menu_inner,.primary_menu_bg',{ duration:.6, delay:.3, autoAlpha:1});


        }else{

            // Close
            $body.removeClass('open_menu');
            $body.removeClass('open_menu_layer');
            gsap.to('.primary_menu_inner,.primary_menu_bg',{ duration:.3, autoAlpha:0,onComplete : function(){

            }});
            gsap.to('#pop_menu_circle_overlay',{ duration:.4, scale:0});


            if($html.hasClass('desktop')){
                $('html, body').off('mousewheel DOMMouseScroll');
                JT.smoothscroll.init();
            }

        }


    });



    // close menu
    /*
    $('.primary_menu a').on('click',function(){

            // Close
            $body.removeClass('open_menu');
            if($html.hasClass('desktop')){
                $('html, body').off('mousewheel DOMMouseScroll');
                JT.smoothscroll.init();
            }

    });
    */

}


// window scroll event on/off
function scroll_disable_init(){
	JT.smoothscroll.destroy();

	if(scrolling_passive()){
		window.addEventListener("wheel",destroy_scrolling,{passive: false});
	}else{
		$(window).on("mousewheel DOMMouseScroll", destroy_scrolling);
	}
}

function scroll_disable_destroy(){
	JT.smoothscroll.init();

	if(scrolling_passive()){
		window.removeEventListener("wheel", destroy_scrolling);
	}else{
		$(window).off("mousewheel DOMMouseScroll", destroy_scrolling);
	}
}

// scroll passive mode check
function scrolling_passive(){
    var supportsPassive = false;
    try {
        document.addEventListener("test", null, { get passive() { supportsPassive = true }});
    } catch(e) {}

    return supportsPassive;
}

// disabled scroll
function destroy_scrolling(event){
	event.preventDefault();
}



// Top menu active
function top_menu(){

	$('#top_menu a').on('click',function(){

        if ( $( this ).closest( '.ad_contact_btn_helper' ).length > 0 ) { return; }

		$('#top_menu li').removeClass('current-page-ancestor');
	    $(this).parent().addClass('current-page-ancestor');
	})

}

function primary_menu_init_active(){


    if($('body').hasClass('single')){
		var $curr = $('.primary_menu').find('.current-menu-item')
		//console.log($curr )
		var $curr_parent = $curr.parent().parent(); // closest('li'); not working
		$curr_parent.addClass('over_active');
    }

}

// Menu hover
function primary_menu(){

	// set active state
	$('.primary_menu .current-menu-parent, .primary_menu .current-page-ancestor').addClass('over_active');

	if ($('html').hasClass('desktop')) {
		// First child item
		var timer = null;

        if( typeof $.fn.hoverIntent == 'function' ){
    		$('.primary_menu > ul > li').hoverIntent(function(){
    				if(timer != null) {
    					clearTimeout(timer);
    				}
    				$('.primary_menu .current-menu-parent, .primary_menu .current-page-ancestor').removeClass('over_active');
    				$(this).addClass('over_active');
    			},function(){
    				timer = setTimeout(function(){
    					$('.primary_menu .current-menu-parent, .primary_menu .current-page-ancestor').addClass('over_active');
    				},500);
    				$(this).removeClass('over_active');
    			}
    		);
        }

		// Sub item
		$('.primary_menu .sub-menu a').on({
			'mouseenter':function(){
				$(this).closest('ul').addClass('over_active');
			},
			'mouseleave':function(){
				$(this).closest('ul').removeClass('over_active');
			}
		});
	} else {

		$('.primary_menu > ul > li > a').on('click', function(e){

			var $this = $(this);
			var $li = $this.closest('li');

			if ( $li.find('> ul').length > 0 ) {
				e.preventDefault();
				e.stopPropagation();

				var $child = $li.find('> ul');

				TweenMax.to($('.primary_menu .sub-menu') , .3, {autoAlpha: 0, onStart: function(){$child.show();}});
				TweenMax.to($child, .3, {autoAlpha: 1, onStart: function(){$child.show();}});

				$('.primary_menu > ul > li').removeClass('over_active');
				$this.parent().addClass('over_active');

			}

		});

	}

}



/**
 * small screen 2depth menu
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (KMS)
 * @requires TweenMax.min.js
 */
function small_screen_nav_toggle(){

    // menu top level link
    $('.small_screen_menu').on('click', 'li.menu-item-has-children > a', function(e){

        e.preventDefault();

        var $parent = $(this).closest('ul');
        var $li = $(this).closest('li');

        if( !$parent.hasClass('sub-menu') ) { // 2depth

            $('.small_screen_menu > li.active > ul > li').removeClass('active').find('> ul').stop().slideUp(); // 3depth close

            if($(this).closest('li').hasClass('active')) { // �����ִ� menu Ŭ���� �ݱ�

                $(this).closest('li').removeClass('active').find('> ul').stop().slideUp();

            } else {

                $('.small_screen_menu > li').removeClass('active').find('> ul').stop().slideUp();

                $li.addClass('active');
                $li.find('> ul').stop().slideDown();

            }

        } else { // 3depth

            if($(this).closest('li').hasClass('active')) { // �����ִ� menu Ŭ���� �ݱ�

                $(this).closest('li').removeClass('active').find('> ul').stop().slideUp();

            } else {

                $('.small_screen_menu > li.active > ul > li').removeClass('active').find('> ul').stop().slideUp();

                $li.addClass('active');
                $li.find('> ul').stop().slideDown();

            }

        }

    });

}



/**
 * GNB layout setting
 *
 * @version 1.0.0
 * @since 2019-11-05
 * @author STUDIO-JT (NICO)
 */
function menu_layout(){

    // add small menu markup
    /*
    $('#small_menu_container').append('<div class="small_menu_container_inner"></div>');
    $('.small_menu_container_inner').append($('#menu').clone().removeAttr('id').addClass('small_screen_menu'));
    */
	// fix back home

	$('#logo a').on('click',function(){
		$('body').attr('data-slide-index',0);
	});
	//var href = '';
    //href.indexOf(window.location.host) > 0

    //$('.primary_menu_container').insertBefore('#header');
    $('.pop_menu_container').insertBefore('#header');
    $('.logo_img_container').clone().prependTo('.primary_menu_container');
	$('.lang_container').clone().insertAfter('.primary_menu_container .logo_img_container');

}



/**
 * GNB layout Bg vimeo
 *
 * @version 1.0.0
 * @since 2019-11-05
 * @author STUDIO-JT (NICO)
 */
function menu_layout_bg_video(){

	// Bg video
	if(!$('html').hasClass('mobile')){

		var $primary_menu_bg = $('.primary_menu_bg')
		var vimeo_id = $primary_menu_bg.attr('data-vimeo-id'); //"386661161"
		var vimeo_width = '1920';
		var vimeo_height = '1080';
		var iframe_html = '<iframe title="��� ������" id="menu_bg_iframe" src="https://player.vimeo.com/video/'+vimeo_id+'?controls=0&amp;muted=1&amp;autoplay=1&amp;autopause=0&amp;loop=1&amp;background=1" width="'+vimeo_width+'" height="'+vimeo_height+'" frameborder="0" allow="fullscreen" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>'
		$primary_menu_bg.html(iframe_html);
		jt_fullvid('#menu_bg_iframe');

		$primary_menu_bg.find('iframe').addClass('loaded'); // prevent FOUC

	}


}


/**
 * GNB menu ally setting
 *
 * @version 1.0.0
 * @since 2018-12-19
 * @author STUDIO-JT (sumi)
 */
function screen_nav_a11y() {

    $('#menu .menu-item, .pop_menu_button').on('focusin', function(){
        $(this).addClass('focusin');
    }).on('focusout', function(){
        $(this).removeClass('focusin');
    });

}


/**
 * Lang bar navigation
 *
 * @version 1.0.0
 * @author STUDIO-JT (NICO)
 * @requires TweenMax.min.js
 */
function lang_nav(){

    $('.lang_menu li').each(function(){

        var $this = $(this);
        var $container = $this.closest('nav');
        var $bar = $container.find('.lang_bar');
        var $curr = $container.find('.current');
        var from_pos = $curr.position().left;
        var to_pos = $this.position().left;


        $this.hover(function(){

            $bar.stop().animate({left: to_pos}, 300);

        },function(){

            $bar.stop().animate({left: from_pos}, 300);

        })


    });

}

/**
 * Footer menu
 *
 * @version 1.0.0
 * @author STUDIO-JT (NICO)
 * @requires TweenMax.min.js
 */
function footer_menu(){

	if($('body').hasClass('single')){
		var $container = $('.footer_primary_menu');
		var $bar = $container.find('.footer_primary_menu_bullet');
		var $curr = $('.footer_primary_menu').find('.current-menu-item')
		var $curr_parent = $curr.parent().parent(); // closest('li'); not working
		var to_pos = 0;

		if($curr_parent.length > 0){
			to_pos = $curr_parent.position().top;
		}else{
			$bar.hide();
		}

		//clearTimeout($this.length);

		//$bar.stop().animate({top: to_pos}, 300);
		$curr_parent.addClass('current-menu-parent current-page-ancestor');
		gsap.to($bar,{ duration : 0.1, top: to_pos});

		//if($(window).width() > 520){
		    $curr_parent.find('.sub-menu').stop().fadeIn();
		//}

		$bar.fadeIn(200);
    }

	// Hover
	if ($('html').hasClass('desktop')) {

		var timer;

		// Mouse over
		$(document).on('mouseenter','.footer_menu > li',function(){

			var $container = $('.footer_primary_menu');
			var $bar = $container.find('.footer_primary_menu_bullet');
			var $curr = $container.find('.current-menu-parent, .current-page-ancestor');

			var $this = $(this);
			var to_pos = $(this).position().top;


			//clearTimeout($this.length);

			//$bar.stop().animate({top: to_pos}, 300);
			gsap.to($bar,{ duration : 0.1, top: to_pos});
			$container.find('.sub-menu').hide();
			$this.find('.sub-menu').stop().fadeIn();

			$bar.fadeIn(200);

		 });

		 $(document).on('mouseleave','.footer_menu > li',function(){

			var $container = $('.footer_primary_menu');
			var $bar = $container.find('.footer_primary_menu_bullet');
			var $curr = $container.find('.current-menu-parent, .current-page-ancestor');

			if($curr.length> 0) {
				var from_pos = $curr.position().top;
				gsap.to($bar,{ duration : 0.1, top: from_pos});
			}

			$container.find('.sub-menu').hide();

			//timer = setTimeout(function(){
				if($curr.length> 0) {
					$curr.find('.sub-menu').stop().fadeIn();
				}else{
					//$bar.stop().fadeOut(200);
				}
			//},0);

		 });


		$(document).on('mouseenter','.footer_primary_menu .sub-menu a',function(){
			$(this).closest('ul').addClass('over_active');
		});

		$(document).on('mouseleave','.footer_primary_menu .sub-menu a',function(){
		   $(this).closest('ul').removeClass('over_active');

		});

	} else {

		//if($(window).width() > 520){
			$('.sub_page_footer, .main_footer').on('click','.footer_menu > li > a', function(e){

				var $this = $(this);
				var $li = $this.closest('li');

				if ( $li.find('> ul').length > 0 ) {
					e.preventDefault();
					e.stopPropagation();

					var $child = $li.find('> ul');

					TweenMax.to($('.footer_menu  .sub-menu') , .3, {autoAlpha: 0, onStart: function(){$child.show();}});
					TweenMax.to($child, .3, {autoAlpha: 1, onStart: function(){$child.show();}});

					// move active dot
					var $container = $this.closest('.footer_primary_menu');
					var $bar = $container.find('.footer_primary_menu_bullet');
					var to_pos = $li.position().top;
					//console.log(to_pos);
					gsap.to($bar,{ duration : 0.1, top: to_pos});

				}

			});
		//}

	}

}


function footer_menu_init_state(){
	var $container = $('.footer_primary_menu');
	var $bar = $container.find('.footer_primary_menu_bullet');
	var $curr = $container.find('.current-menu-parent, .current-page-ancestor');
	var timer;

	// Setting initial state
	if($curr.length> 0) {
		$bar.show().css('top', $curr.position().top);
		//if($(window).width() > 520){
		    $curr.find('.sub-menu').show();
		//}
	}
}

/**
 * search popup setting
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (KMS)
 * @requires TweenMax.min.js
 */
function global_search_setting() {

    var $body = $('body');
    var $open_btn = $('#global_search_open_btn');
    var $close_btn = $('#global_search_popup_close');
    var $popup = $('#global_search_popup');
    var $form = $('#global_search_form');
    var $input = $('#global_search_field');
    var search_open = true;

    // open
    $open_btn.on('click', function(e){

        e.preventDefault();

        if(search_open) {

            $body.addClass('search_open');
            search_open = false;

            new TweenLite.fromTo($popup, .5, {y: '-100%'}, {y: '0%',ease: Power4.easeOut,onStart: function() {$popup.css('display', 'block');},onComplete: function() {$input.focus();}});
            new TweenLite.fromTo ($close_btn, .2, {autoAlpha: 0,}, {autoAlpha: 1,ease: Power0.easeNone,delay: .1,onStart: function(){$close_btn.css('display', 'block');}});

        } else {
            search_close_action();
        }

    });

    // close
    $close_btn.on('click', function(e){

        e.preventDefault();
        search_close_action();

    });

    // input
    $input.keydown(function(){
        $form.addClass('active');
    });

    $input.keyup(function(){
        if( $input.val() == '' ){
            $form.removeClass('active');
        } else {
            $form.addClass('active');
        }
    });

    $input.focusout(function(){
        if( $input.val() == '' ){
            $form.removeClass('active');
        } else {
            $form.addClass('active');
        }
    });

    // search close action
    function search_close_action() {

        new TweenLite.to($popup, .4, {
            y: '-100%',
            ease: Power4.easeOut,
            onComplete: function() {
                $popup.css('display', 'none');
                $close_btn.css('display', 'none');
                $input.val('');
                $input.blur();
                $body.removeClass('search_open');

                search_open = true;
            }
        });

    }

}



/**
 * fixed scroll top button, animate scroll top
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (KMS)
 */
function scroll_top(){

    $(document).on('click','.go_top',function(e){

		e.preventDefault();

		if($('body').hasClass('home')){
			main_fullpage_slider.slideTo(0);
		}else{
			$("html, body").stop().animate({
				scrollTop: 0
			}, 600);
		}

    });

}



/**
 * animate scroll down
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (KMS)
 */
function scroll_down(){

    $('.scroll_down').on('click',function(){

        var target = $(this).attr('href');
        var target_top = $(target).offset().top;
        var header_height = $('#header').height();
        var space = 0;

        if(!$('#header').hasClass('minimize')) {
            if(!is_screen(1023)) {
                space = 15;
            } else if(!is_screen(768)) {
                space = 10;
            }
        }

        $('html,body').animate({
            scrollTop : target_top - header_height + space
        }, 600);

        return false;

    });

}



/**
 * ������ ���ԵǾ��ִ� �̹��� �̵�� ������ Ŭ��������� ���������� �˾����� �����մϴ�.
 * magnific-popup.js �÷����� ������ �ʿ��մϴ�.
 *
 * @version 1.0.0
 * @since 2016-12-14
 * @author STUDIO-JT (KMS)
 * @see {@link http://dimsemenov.com/plugins/magnific-popup/|magnific-popup API}
 * @requires jquery.magnific-popup.js
 */
function media_image_popup() {

    // ����Ʈ Ÿ�� ����
    var $popup_image_target = $("a:has(img)").filter( function() { return /\.(jpe?g|png|gif|bmp)$/i.test($(this).attr('href')); });
    $popup_image_target.addClass("js_popup_media").attr( 'data-barba-prevent' , true );;


    // �˾� ����
    if( typeof $.magnificPopup == 'object' ){
        $('a.js_popup_media').magnificPopup({
            type            : 'image',
            image           : {
                                markup: '<div class="mfp-figure">'+
    									'<button title="close button" type="button" class="mfp-close"><span>�ݱ�</span></button>'+
                                        '<div class="mfp-img"></div>'+
                                        '</div>', // '.mfp-img' div will be replaced with img tag
                                cursor: 'mfp-zoom-out-cur',
                                verticalFit: true,
                                tError: '�̹����� �ҷ����µ� �����߽��ϴ�.'
                            },
            mainClass       : 'mfp-with-zoom',
            zoom            : {
                                enabled: true,
                                duration: 300,
                                easing: 'ease-in-out'
                            },
            midClick        : true,
            showCloseBtn    : false,
            fixedContentPos : false,
            autoFocusLast   : false,
            callbacks       : {
                                open: function() {
                                    $('html').addClass('js_popup_scroll_evnet');
    								JT.smoothscroll.destroy();
                                },
    			                close: function() {
                                    JT.smoothscroll.init();
                                },
                                afterClose: function() {
                                    $('html').removeClass('js_popup_scroll_evnet');
                                }
                            }
        });
    }

}



/**
 * JT basic tabs component
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (Nico)
 * @requires jt-strap.css
 * @requires jt-strap-rwd.css
 */
function tabs(el){

    $(el).each(function(){

        var $this = $(this);

        // Hide tabs if not already hidden
        $this.find('> div > div').hide();

        // Init display the right tab
        if (location.hash !== "") {
            var current_hash = 	location.hash;
            var current_hash_index = $(current_hash).index();
            $this.find('> div > div').hide();
            $this.find('> div > div:eq('+current_hash_index+')').show();
            $this.find('> ul > li:first').removeClass('active');
            $this.find('> ul > li:eq('+current_hash_index+')').addClass('active');
        } else{
            $this.find('> div > div:first').show();
            $this.find('> ul > li:first').addClass('active');
        }

        // Add click event
        $this.find('> ul li').on('click',function(){
            $('html,body').animate({scrollTop: $this.offset().top - $('#header').outerHeight()});

            var $that = $(this).find('a');
            var hash = $that.attr('href');
            $this.find('> ul li').removeClass('active');
            $that.parent().addClass('active');

            var target_index = $that.parent().index();
            $this.find('> div > div').hide();
            $this.find('> div > div:eq('+target_index+')').show();

            // add hash
            if ('history' in window && 'pushState' in history) {
                history.pushState(null, null, hash)
            }

            return false;
        });

        // Listner hash change
        // TODO DRY THIS CODE !!!
        if ("onhashchange" in window) {
            window.onhashchange = function locationHashChanged() {
                var _current_hash = location.hash;
                var _current_hash_index = $(_current_hash).index();
                $this.find('> div > div').hide();
                $this.find('> div > div:eq('+_current_hash_index+')').show();
                $this.find('> ul > li').removeClass('active');
                $this.find('> ul > li:eq('+_current_hash_index+')').addClass('active');
            }
        }

    });

}



/**
 * isotope plugin init �Լ�
 *
 * @version 1.0.0
 * @since 2016-12-14
 * @author STUDIO-JT (KMS)
 * @see {@link http://isotope.metafizzy.co/|isotope API}
 * @requires isotope.pkgd.js
 * @requires imagesloaded.pkgd.min.js
 * @requires jt-strap.css
 * @requires jt-strap-rwd.css
 */
function isotope_init() {

    // init setting
    var $container = $('.jt_isotope');

    if( !$container.length ){ return; }

    // Lazyload (Set Padding-top)
    $container.find('.jt_lazyload_masonry').each(function(){
        var $this = $(this);
        var $img = $this.find('img');
        var w = $img.attr('width');
        var h = $img.attr('height');
        var padding_top = (h/w)*100;
        $this.css('paddingTop',padding_top+"%");
    });

    // isotope init
    var $isotope_target = $container.isotope({
        itemSelector: '.isotope_item',
        masonry: {
            columnWidth: '.isotope_grid_sizer',
            gutter: '.isotope_gutter_sizer',
            horizontalOrder: true
        },
        percentPosition: true
    });

    // If hidden with css, display it
    $container.css({'visibility': 'visible'});

    // layout Isotope after each image loads
    $isotope_target.imagesLoaded(function(){
        $isotope_target.isotope('layout');
    });

    $(window).on('load',function(){
        $isotope_target.isotope('layout');
    })

}



/**
 * icheck plugin init �Լ�
 * checkbox�� radio Ŀ���� ��Ÿ���� �����մϴ�.
 * �� ����Ʈ�� ���� skin css ������ �����մϴ�. (ex. minimal.css)
 *
 * @version 1.0.0
 * @since 2016-12-14
 * @author STUDIO-JT (KMS)
 * @see {@link http://icheck.fronteed.com|icheck API}
 * @requires icheck.js
 * @requires /icheck/*.css
 *
 * @example
 * // markup sample
 * <label class="jt_icheck_label"><input class="jt_icheck" type="checkbox" /> <span>üũ�ڽ�</span></label>
 * <label class="jt_icheck_label"><input class="jt_icheck" type="radio" /> <span>����</span></label>
 */
function icheck_init() {

    $('.jt_icheck').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal'
    });

}



/**
 * selectbox custom plugin init �Լ�
 * selectbox Ŀ���� ��Ÿ���� �����մϴ�.
 *
 * @version 1.0.0
 * @since 2016-12-14
 * @author STUDIO-JT (KMS)
 * @see {@link http://selectric.js.org/|selectric API}
 * @requires jquery.selectric.js
 * @requires jt-strap.css
 * @requires jt-strap-rwd.css
 *
 * @example
 * markup sample
 * <select class="jt_selectric">
 *     <option value="op1">OP1</option>
 *     <option value="op2">OP2</option>
 *     <option value="op3">OP3</option>
 * </select>
 */
function selectric_init() {

    $('.jt_selectric').selectric({
        disableOnMobile: true,
		maxHeight: 320
    });

}


function contact_field(){

    // mail select
    $('.mail_selectric').selectric({
        disableOnMobile: true
    });

    $('.mail_selectric').on('change', function(){
        var domain = $(this).val();
        var $input = $(this).closest('.form_content').find('.field_mail_02');

        if ( $input.length > 0 ) {
            if ( domain == '�����Է�' || domain == '' ) {
				//$input.focus(); // don't use focus (tab �̵��̽�)
				$input.removeAttr('readonly');
            } else {
                $input.val(domain);
				$input.attr('readonly','readonly');
            }
        }
    });


}




/**
    * input file custom plugin init �Լ�
    * fileŸ�� input ��Ÿ���� �����մϴ�.
    *
    * @version 1.0.0
    * @since 2016-12-14
    * @author STUDIO-JT (KMS)
    * @requires jquery.customFile_jt-custom.js
    * @requires jt-strap.css
    * @requires jt-strap-rwd.css
    *
    * @example
    * markup sample
    * <input class="jt_custom_file" type="file" />
    */
function custom_input_file(){

    $('.jt_custom_file').customFile({
        input_class: 'customfile_input', // input text�� �߰��� class
        // input_placeholder: '���õ� ���� ����', // input text placeholder
        btn_text: 'ã�ƺ���', // btn�� �� value
        btn_class: 'customfile_btn' // btn�� �߰��� class
    });

    $( 'a.file_list_del' ).on( 'click', function () {

        var $this   = $( this );
        var $wrap   = $this.parents( 'div.file_upload_list:first' );
        var $target = $wrap.find( 'input[name="jt_board[del_file][]"]' );

        $wrap.fadeOut( 'fast', function () {

            $target.prop( 'disabled', false );

        } );

        return false;

    } );

    $( 'a.add_file' ).on( 'click', function () {

        var $this       = $( this );
        var $wrap       = $this.parents( 'div.form_control_wrap:first' ).parents( 'div:first' );
        var file_cnt    = $( 'div.file_wrapper', $wrap ).length + $( 'input[name="jt_board[del_file][]"]:disabled', $wrap ).length;
        var $file       = $( 'input[type=file]', $wrap ).eq( 0 );

        if ( parseInt( '-1' ) < 0 || file_cnt < parseInt( '-1' ) ) {

            var $target = $(
                '<div class="form_control_wrap">' +
                    '<div class="file_wrapper">' +
                        '<input type="file" ' + ( $file.attr( 'name' ) == 'jt_board[]' ? 'id="jt_board_file_' + file_cnt + '"' : '' ) + ' name="' + $file.attr( 'name' ) + '" class="' + $file.attr( 'class' ) + '" data-ext="' + $file.attr( 'data-ext' ) + '" data-size="' + $file.attr( 'data-size' ) + '" />' +
                        '<a href="#" class="del_file"><span>����</span></a>' +
                    '</div>' +
                '</div>'
            );

            $( 'div.file_upload_list', $target ).remove();
            $( 'input[type=file]', $target ).customFile( {
                input_class: 'customfile_input', // input text�� �߰��� class
                // input_placeholder: '���õ� ���� ����', // input text placeholder
                btn_text: 'ã�ƺ���', // btn�� �� value
                btn_class: 'customfile_btn' // btn�� �߰��� class
            } );

            $( 'a.del_file', $target ).on( 'click', remove_file_action );

            $target.hide().appendTo( $wrap ).fadeIn( 'fast' );
            // $target.css( 'opacity', 0 );
            // $wrap.append( $target );
            // $target.animate( { opacity: 1 }, 'fast' );

        } else {

            alert( '÷�������� �ִ� -1������ ��ϰ����մϴ�.' );

        }

        return false;

    } );

    $( 'a.del_file' ).on( 'click', remove_file_action );

    function remove_file_action() {

        var $this   = $( this );
        var $wrap   = $this.parents( 'div.form_control_wrap:first' );

        $wrap.fadeOut( 'fast', function () {

            $wrap.remove();

        } );

        return false;

    }

}



/**
    * nicescroll plugin init �Լ�
    * Ŀ���� ��ũ�ѹٸ� �����մϴ�.
    *
    * @version 1.0.0
    * @since 2016-12-14
    * @author STUDIO-JT (KMS)
    * @see {@link https://github.com/inuyaksa/jquery.nicescroll|nicescroll API}
    * @requires jquery.nicescroll.js
    * @requires jt-strap.css
    * @requires jt-strap-rwd.css
    *
    * @example
    * // markup sample
    * <div class="nicescroll_area_outer">
    *     <div class="nicescroll_area"></div>
    * </div>
    */
function nicescroll_init() {

    // settimeout to fix position calculation issue during page motion
    setTimeout(function(){
        $('.nicescroll_area').not('.dark').niceScroll({
            autohidemode       : false,
            cursorborder       : "0px solid #0a0a0a",
            cursorcolor        : "#0a0a0a",
            background         : "#ddd",
            cursorwidth        : "4px",
            railwidth          : 4,
            cursorborderradius : "5px",
            railoffset		   : { top: 0, left: 10 },
            railpadding        : { top:  0, right: 0, left: 0, bottom: 0 }
        });
    },800)

    $('.nicescroll_area.dark').niceScroll({
        autohidemode       : false,
        cursorborder       : "0px solid #fff",
        cursorcolor        : "#fff",
        background         : "#555",
        cursorwidth        : "4px",
        railwidth          : 4,
        cursorborderradius : "5px",
        railoffset		   : { top: 0, left: 10 },
        railpadding        : { top:  0, right: 0, left: 0, bottom: 0 }
    });

}



// ��� open/close
function comment_toggle(){

    var $form_input = $(".jt_comment_text textarea");

    $('.jt_comment_item_inner .btn_comment, .jt_re_comment_item .btn_comment').on('click', function(){
        $form_input.focus();

        $("html, body").stop().animate({
            scrollTop: $('.jt_comment_insert').offset().top - ( $('#header').height() + 100 )
        }, 600);

        return false;
    })

    /*
    $('.jt_comment_item_inner .btn_comment').on('click', function(){

        var $this = $(this);
        var $group = $this.closest('.jt_comment_item');
        var $reply = $group.find('> .jt_re_comment_wrap');

        $this.toggleClass('open');
        $reply.slideToggle();

    });

    $('.jt_re_comment_item .btn_comment').on('click', function(){

        var $this = $(this);
        var $group = $this.closest('.jt_re_comment_item');
        var $reply = $group.find('> .jt_re_comment_write');

        $this.toggleClass('open');
        $reply.slideToggle();

    });
    */



}



/**
    * �Խ��� ����Ʈ fullclick ȿ���� �߰��մϴ�
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (KMS)
    */
function jt_board_list_fullclick() {

    $('.js_full_click').on('click', function(e){

		var target = e.target;

		if ( $(target).closest('a.jt_board_download').length > 0) {return}

        e.stopPropagation();
		e.preventDefault();

		//console.log(target)

        var url = $(this).find('a:first').attr('href');
        if(url != undefined){

			if($('.js_full_click').hasClass('js_full_click_blank')){
				var openNewWindow = window.open("about:blank");
                openNewWindow.location.href = url;
			}else{
                window.location.href = url;
			}
        }

    });

}


/**
    * JT POPUP action
    *
    * @version 1.0.0
    * @since 2019-12-02
    * @author STUDIO-JT (JDY)
    */
function jt_popup() {

    // popup open action
    if( $('.jt_popup_btn').length > 1 ){

        $( '.jt_popup_btn' ).on( 'click', function(e){

        	e.preventDefault();

            var $this = $(this)
        	var $popup_id = $this.attr('href');
        	var $container = $($popup_id).find('.jt_popup_container')

			scroll_disable_init();

			gsap.set($popup_id, {autoAlpha:0, display:'block'});
			gsap.to($popup_id, {duration:.8, autoAlpha:1, ease:Power3.easeOut});

			if (!$('html').hasClass('ratio1_5')) {
				gsap.set($container, {autoAlpha:0, y:100 });
				gsap.to($container, {duration:.8, delay:0.4, autoAlpha:1, y:0 ,ease:Power3.easeOut});
			} else {
				gsap.set($container, {autoAlpha:0 });
				gsap.to($container, {duration:.8, delay:0.4, autoAlpha:1 ,ease:Power3.easeOut});
			}

			$container.find('.nicescroll_area').getNiceScroll().resize();

        })

    } else {

		$( '.jt_popup_btn' ).on( 'click', function(e){
			e.preventDefault();

			scroll_disable_init();

			gsap.set(".jt_popup_overlay", {autoAlpha:0, display:'block'});
			gsap.to(".jt_popup_overlay", {duration:.8, autoAlpha:1, ease:Power3.easeOut});

			if (!$('html').hasClass('ratio1_5')) {

				gsap.set(".jt_popup_container", {autoAlpha:0, y:100 });
				gsap.to(".jt_popup_container", {duration:.8, delay:0.4, autoAlpha:1, y:0 ,ease:Power3.easeOut});

			} else {

				gsap.set(".jt_popup_container", {autoAlpha:0 });
				gsap.to(".jt_popup_container", {duration:.8, delay:0.4, autoAlpha:1 ,ease:Power3.easeOut});

			}

			$('.jt_popup_overlay .nicescroll_area').getNiceScroll().resize();

		});

    }

    // popup close action
    $( '.jt_popup_close' ).on( 'click', function(e){
        e.preventDefault();
		scroll_disable_destroy();
        gsap.to(".jt_popup_overlay", {duration:.8, autoAlpha:0, ease:Power3.easeOut});
    });

}



/**
    * Split word and wrap into a span to simplify rwd �۾�
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (Nico)
    */
function split_word_helper(){

    $(".split_word_txt").each(function(){

        var $this = $(this);
        var words = $this.text().split(" ");

        $this.empty();

        $.each(words, function(i, v) {
            $this.append(jQuery("<span>").text(v));
        });

    });

}



/**
    * element height matching function
    * v1.0 notice: inner �������� �ƴ� ����Ʈ outer wrap�� �����ؾ� �մϴ�.
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (KMS)
    * @see {@link https://codepen.io/micahgodbolt/pen/FgqLc|Reference}
    */
function match_height(el){

    // element
    if(typeof el == "undefined"){
        el = '.js_match_height > li'
    }
    var $item = $(el);

    if($item.length <= 0 ) { return; }

    // init
    jt_equal_height();

    // Add closures to keep the $item alive
    function jt_equal_height(){

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;

        $item.each(function() {
            $el = $(this);
            $el.height('auto');
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }

            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });

    } // jt_equal_height()

}

function component_match_height(el,container){

    // element
    if(typeof el == "undefined" || typeof container == "undefined"  ){
        return;
    }

    if($(container).length <= 0 ) { return; }

    // init
    jt_equal_height();

    // Add closures to keep the $item alive
    function jt_equal_height(){

        $(container).each(function() {

			var currentTallest = 0,
				currentRowStart = 0,
				rowDivs = new Array(),
				$el,
				topPosition = 0,
			    $item = $(this).find(el);

			$item.each(function() {
				$el = $(this);
				$el.height('auto');
				topPostion = $el.position().top;

				if (currentRowStart != topPostion) {
					for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
						rowDivs[currentDiv].height(currentTallest);
					}
					rowDivs.length = 0;
					currentRowStart = topPostion;
					currentTallest = $el.height();
					rowDivs.push($el);
				} else {
					rowDivs.push($el);
					currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
				}

				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
			});
        });

    } // jt_equal_height()

}

/**
    * JT ACCORDION
    *
    * @version 1.0.0
    * @since 2017-03-03
    * @author STUDIO-JT (KMS, NICO)
    * @requires jt-strap.css
    * @requires jt-strap-rwd.css
    *
    * @example
    * Markup sample
    * <table class="jt_accordion">
    * 	 <caption>���</caption>
    * 	 <thead>
    * 		<tr>
    * 		    <th scope="col" class="state">����</th>
    * 		    <th scope="col" class="title">����</th>
    * 		    <th scope="col" class="control">��ġ��</th>
    * 		</tr>
    * 	 </thead>
    * 	 <tbody>
    * 		<tr class="jt_accordion_title">
    * 			<td class="state"><span lang="en">Q</span></td>
    * 			<td class="title"><p>TITLE</p></td>
    * 			<td class="control"><i>��ġ��/����</i></td>
    * 		</tr>
    * 		<tr class="jt_accordion_content">
    * 			<td class="state"><div class="jt_accordion_content_inner"><span lang="en">A</span></div></td>
    * 			<td colspan="2" class="title"><div class="jt_accordion_content_inner">CONTENT</div></td>
    * 		</tr>
    * 		.....
    *   </tbody>
    * </table>
    */
function jt_accordion() {

    // ù �Խù��� active Ŭ���� �߰�
    $('.jt_accordion_title').first().addClass('active');
    $('.jt_accordion_content').first().addClass('active');

    // Toggle the accordion
    // Delegate click event to keep alive after adding content via ajax
    $('.jt_accordion').on('click', '.jt_accordion_title', function(){

        var $title = $('.jt_accordion_title');
        var $content = $('.jt_accordion_content');
		var ratio = get_ratio();
		var $this = $(this)

        $title.not($(this)).removeClass('active');

		//console.log($(this).offset().top);
		/*
		$content.not($(this).next()).removeClass('active').find('.jt_accordion_content_inner').slideUp();
        $(this).toggleClass('active').next().toggleClass('active').find('.jt_accordion_content_inner').slideToggle(400,function(){
            // scroll to
            $('html,body').animate({scrollTop: $(this).offset().top - 220});
        });
		*/
		var offset = 90;
		if($(window).width() < 768){
		    offset = 60
		}
		$content.not($(this).next()).removeClass('active').find('.jt_accordion_content_inner').hide();
        $(this).toggleClass('active').next().toggleClass('active').find('.jt_accordion_content_inner').toggle();
		$('html,body').animate({scrollTop: ($this.offset().top/ratio) - (offset/ratio) });

        return false;

    });

}



/**
    * Category swip
    *
    * @version 1.0.0
    * @since 2019-03-14
    * @author STUDIO-JT (KMS)
    *
    * @example
    * Markup sample
    * <div></div>
    */
function jt_category_swip(){

    $('.jt_category').each(function(){

        var $outer = $(this);
        var $list = $(this).find('> ul');

        $outer.append('<button style="display: none;" class="jt_category_btn jt_category_prev"><span class="sr_only">����</span></button>');
        $outer.append('<button style="display: none;" class="jt_category_btn jt_category_next"><span class="sr_only">����</span></button>');

        // active check
        if( $list.find('> li.active').length > 0 ){
            var current_item_pos = $list.find('> li.active').offset().left + $list.find('> li.active').outerWidth();

            if(current_item_pos >= $outer.outerWidth()){
                var current_pos = $list.find('> li.active').offset().left - (($(window).width() - $outer.outerWidth()) / 2) - parseInt($outer.css('padding-left'));
                $list.scrollLeft(current_pos);
            }
        }

        // ScrollTo on click to the arrow
        $outer.find('.jt_category_btn').on('click', function(){

            var size = '200';

            if($(this).hasClass('jt_category_prev')){
                size = '-='+size;
            } else {
                size = '+='+size;
            }

            $list.animate({
                scrollLeft : size
            },500);

            return false;

        });

        // scroll pos check function
        JT.globals.jt_category_swip_resize = function(){
            //console.log(2222)
            var el_width = 0;

            $.each($list.children(), function(){
                el_width += parseFloat($(this).outerWidth());
            });

            if($('html').hasClass('desktop')) {
                if(el_width > $outer.outerWidth() - parseInt($outer.css('padding-left')) - parseInt($outer.css('padding-right'))){
                    $outer.find('.jt_category_btn').show();
                } else {
                    $outer.find('.jt_category_btn').hide();
                }
            }

        }

        JT.globals.jt_category_swip_resize();
        $(window).resize(JT.globals.jt_category_swip_resize);

    });

}



/**
    * JT embed fullvid
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (Nico)
    */
function jt_fullvid(iframe_selector){

    if(typeof iframe_selector == "undefined") return;

	var w_width = $(window).width();
    var w_height = $(window).height();
    var $iframe = $(iframe_selector);
    var iframe_width = $iframe.width();
    var iframe_height = $iframe.height();
    var ratio = iframe_height / iframe_width;

    //
    var new_iframe_width =  w_width;
    var new_iframe_height = w_width * ratio;

    if(new_iframe_height < w_height){
        new_iframe_height = w_height;
        new_iframe_width = w_height / ratio;
    }

    //
    $iframe.css({width:new_iframe_width, height:new_iframe_height, position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', display:'block'})
        .wrap('<div class="jt_fullvid_container" style="overflow:hidden; position:relative; width:'+w_width+'px; height:'+w_height+'px" />');

    // Resize
    JT.globals.jt_fullvid_resize = function(){
        //console.log(3333)
        var w_width = $(window).width();
        var w_height = $(window).height();

        var new_iframe_width =  w_width;
        var new_iframe_height = w_width * ratio;

        if(new_iframe_height < w_height){
            new_iframe_height = w_height;
            new_iframe_width = w_height / ratio;
        }

        $iframe.css({width:new_iframe_width, height:new_iframe_height});
        $('.jt_fullvid_container').css({width:w_width, height:w_height});

    };

    $(window).on('resize',JT.globals.jt_fullvid_resize);

}



/**
    * Vimeo custom play
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (KMS,NICO)
    * @see {@link https://developer.vimeo.com/|API}
    * @requires https://player.vimeo.com/api/player.js
    */
function vimeo_play(){

    // play if click on the poster
    $('.jt_video_vimeo .jt_video_poster').each(function () {

        var $poster = $(this);
        var $wrap = $poster.closest('.jt_video_wrap');
        var $parent = $poster.closest('.jt_video_container');
        var $iframe = $parent.find('iframe');
        var iframe_id = $iframe.attr('id');
        var js_iframe = $parent.find('iframe')[0];

        if($wrap.hasClass('jt_video_vimeo')){
            // Vimeo
            $poster.on('click', function () {
                if(!$('html').hasClass('ie9')) {
                    var video = new Vimeo.Player(js_iframe);
                    new TweenMax.set($iframe, {autoAlpha: 1, force3D: true});
                    new TweenMax.to( $poster, .6, {autoAlpha: 0, onStart: function(){ video.play(); }});
                } else {
                    alert('���� ����� �������� �ʴ� �������� ��� ���Դϴ�.');
                }
            });
        }

    });

}



/**
    * Youtube custom play
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (NICO)
    * @see {@link https://developers.google.com/youtube/iframe_api_reference}
    */
function youtube_play(){

    // load youtube if necessary
    if($('.jt_video_youtube').length <= 0) return;

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // if youtube api ready do your stuff
    window.onYouTubeIframeAPIReady = function() {

        // play if click on the poster
        $('.jt_video_youtube .jt_video_poster').each(function () {

            var $poster = $(this);
            var $wrap = $poster.closest('.jt_video_wrap');
            var $parent = $poster.closest('.jt_video_container');
            var $iframe = $parent.find('iframe');
            var iframe_id = $iframe.attr('id');
            var js_iframe = $parent.find('iframe')[0];

            new YT.Player(iframe_id,{
                events: {
                    'onReady': function(event){

                        $poster.on('click',function(){
                            event.target.playVideo();
                            $poster.fadeOut(800,function(){
                            $poster.remove();
                            });

                            return false;
                        })
                    }
                }
            });

        });

    }

}



/**
    * custom map plugin (mapbox)
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (NICO, KMS)
    * @requires https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css
    */
function mapbox_init(){

    if($('.location_map').length > 0){

        var map_url = "https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js";

        $.getScript( map_url ).done(function( script, textStatus ) {

            $('.location_map').each(function(){

                var $el = $(this);
                var el_id = $el.attr('data-id');
                var $el_obj = $('#'+el_id);

                var id           = el_id;
                var image_w      = '94';
                var image_h      = '100';
                var image        = $el_obj.attr('data-marker');
                var lat          = $el_obj.attr('data-lat');
                var lng          = $el_obj.attr('data-lng');
                var zoom         = $el_obj.attr('data-zoom');
                var map_type     = $el_obj.attr('data-type');

                L.mapbox.accessToken = 'pk.eyJ1Ijoic2VvbGppc2VvayIsImEiOiJjajJ1Nm9tOGowMDc5MzJtcjRvdzdxZm91In0.-UAvk7ElQFu0u8Ahf8LI9Q';

                var map = L.mapbox.map(id)
                .setView([lat, lng], zoom);

                map.scrollWheelZoom.disable();

                // disable draggable Mobile only
                if($('html').hasClass('mobile')){
                    map.dragging.disable();
                }

                // Use styleLayer to add a Mapbox style created in Mapbox Studio
                L.mapbox.styleLayer('mapbox://styles/seoljiseok/cjcaeim2o0bba2sp658uj84z7').addTo(map);
                var myLayer = L.mapbox.featureLayer().addTo(map);

                var geoJson = {
                    type: 'FeatureCollection',
                    features: [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [lng, lat]
                        },
                        properties: {
                            //title: 'title',
                            //description: 'addr',
                            icon: {
                                iconUrl: image,
                                iconSize: [image_w, image_h], // size of the icon
                                iconAnchor: [53, image_h], // point of the icon which will correspond to marker's location
                                popupAnchor: [0, -image_h], // point from which the popup should open relative to the iconAnchor
                                className: "jt-marker"
                            }
                        }
                    }]
                };

                // Set a custom icon on each marker based on feature properties.
                myLayer.on('layeradd', function(e) {
                    var marker = e.layer,
                    feature = marker.feature;

                    marker.setIcon(L.icon(feature.properties.icon));
                });

                // Add features to the map.
                myLayer.setGeoJSON(geoJson);
            }); // each

        }).fail(function( jqxhr, settings, exception ) {

            // Handle Error

        });

    } // ENDIF

}

/**
    * custom google map  init
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (NICO, KMS)
    * @requires https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css
    */

function googlemap_init(){

    if($('.location_map_google').length > 0){


		if(typeof google == "undefined"){
            var map_url = "https://maps.google.com/maps/api/js?key=AIzaSyDaxFUMvDcG7NlMFF4H4pHOtq59PxzWaWo&region=KR";
            $.getScript( map_url ).done(function() {
                init();
            });
        }else{
            init();
            //console.log('no need google map');
        }

        function init(){

            $('.location_map_google').each(function(){

                var $this   = $(this);
                var id      = $this.attr('id');
                var image   = $this.attr('data-marker');
                var lat     = parseFloat($this.attr('data-lat'));
                var lng     = parseFloat($this.attr('data-lng'));
                var zoom    = parseInt($this.attr('data-zoom'));

				if($('html').hasClass('ie')){
					image = image.replace('svg','png');
				}

                var mapOptions = {
                    zoom            : zoom,
                    center          : new google.maps.LatLng(lat+0.0005, lng),
                    scrollwheel     : false,
                    mapTypeControl  : false
                };

                // No need for this project
                //if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
                // mapOptions.draggable = false;
                //}

                var map = new google.maps.Map(document.getElementById(id), mapOptions);

                var marker = new google.maps.Marker({
                    map      : map,
                    position : map.getCenter(),
                    icon     : image
                });

                // ������
                google.maps.event.addDomListener(window, "resize", function() {
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(center);
                    //console.log(4444)
                });

            }); // END each

        } // END init closure

    } // END if element exist

}




/**
    * ios safari link click issue debugging
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (KMS)
    */
function ios_debugging(){

    var target = $('.jt_ios_debugging_btn');

    if( $('html').hasClass('ipad') || $('html').hasClass('iphone') || $('html').hasClass('ipod') ){

        target.on('click touchend',function(e){
            window.location = this.href;
        });

    }

}



/**
    * Ajax loadmore function
    *
    * @version 1.0.0
    * @since 2018-02-03
    * @author STUDIO-JT (Nico)
    */
function loadmore(){

    var is_loading = false;

    $('#jt_loadmore a').off().on('click',function(e){

        e.preventDefault();

        if(is_loading) return;

        var $this = $(this);
        var $loadmore = $this.parent();
        var list_selector = $this.attr('data-loadmore-list');
        var $list = $(list_selector);
        var url = $this.attr('href');

        is_loading = true;

        $loadmore.addClass('loading');

        $.get( url, function(response) {
            var next_url = $(response).find('#jt_loadmore a').attr('href');
            var $more_items = null;

            if($list.length > 0) {

                // add here

            } else if($(response).find('.jt_isotope').length > 0) {

                // isotope
                $more_items = $(response).find('.isotope_item');

                // lazyload check
                $more_items.find('.jt_lazyload_masonry').each(function(){
                    var $this = $(this);
                    var $img = $this.find('img');
                    var w = $img.attr('width');
                    var h = $img.attr('height');
                    var padding_top = (h/w)*100;
                    $this.css('paddingTop',padding_top+"%");

                    $img.attr('src', $img.attr('data-src')).addClass('loaded');
                });

                $('.jt_isotope').isotope('remove', $('.jt_isotope').data('isotope').$allAtoms );
                $('.jt_isotope').isotope('insert', $more_items );
                $('.jt_isotope').imagesLoaded( function() {
                    $('.jt_isotope').isotope('layout');
                });

            } else if($(response).find('.jt_history').length > 0) {

                // history
                $more_items = $(response).find('.jt_history_year, .jt_history_item');

                // check duplication year
                var more_items_first_year = $more_items[0].innerText;
                var exist_items_last_year = $('.jt_history').children('.jt_history_year').last().text();
                if(more_items_first_year === exist_items_last_year){
                    $more_items.splice(0,1);
                }

                $more_items.imagesLoaded(function() {
                    new TweenMax.set($more_items,{autoAlpha:0, scale:0.5});
                    $('.jt_history').append($more_items);
                    new TweenMax.staggerTo($more_items,.3,{autoAlpha:1, scale:1},.1);
                });

            } else {

                // Nothing

            }

            // Update URL
            if ('history' in window && 'pushState' in history) {
                window.history.pushState(null, null, url);
            }

            // Remove loading class after some delay to avoid
            setTimeout(function(){
                $loadmore.removeClass('loading');
            },300);

            if(next_url !== undefined){
                // Update url
                $this.attr('href', next_url);

                // Update flag
                is_loading = false;
            }else{
                $('#jt_loadmore').fadeOut(500,function(){
                    $this.remove()
                });
                return;
            }

        });
    });

}



/**
    * ���ټ� & UX ���� (Ű���� ����Ҷ��� ��Ŀ�� ������)
    *
    * @version 1.0.0
    * @since 2018-07-16
    * @author STUDIO-JT (Nico)
    */
function focus_on_tab_only(){

    var $body = $('body');

    $body.on('mousedown', function(){

        $body.addClass('use_mouse');

    }).on('keydown', function() {

        $body.removeClass('use_mouse');

    });

}



/**
    * Image Lazyload
    *
    * @version 1.0.0
    * @since 2018-11-30
    * @author STUDIO-JT (KMS)
    *
    * @example
    * Markup sample
    * <figure class="jt_lazyload_wrap">
    * 	 <span class="jt_img_color_preview"></span>
    * 	 <img width="120" height="120" data-src="some_img_url.jpg" src="blank.gif" alt="" />
    * 	 <noscript><img src="some_img_url.jpg" alt="" /></noscript>
    * </figure>
    *
    * @description masonry Ÿ���ϰ�� jt_lazyload_wrap�� jt_lazyload_masonry class�� �߰��� �ٿ��ּ���
    */
function unveil_init(){

    // lazyload
    $("img[data-unveil]").unveil(300, function() {
        $(this).on('load',function() {
            $(this).addClass('loaded');
        });
    });

}



/**
    * Broken Image Process
    *
    * @version 1.0.0
    * @since 2018-11-30
    * @author STUDIO-JT (KMS)
    *
    * @example
    * Markup sample
    * <figure>
    *   <img class="jt_broken_image_check" src="some_img_url.jpg" alt="" />
    * </figure>
    *
    * @description Broken Image�� ��ũ�� ������� �ش� a �±׿� 'jt_broken_image_link' class �߰�
    */
function broken_image(){

    // broken image check
    $('img.jt_broken_image_check').on("error", function() {

        var $html = '<div class="broken_image_wrap">' +
                        '<div class="broken_image_inner">' +
                            '<p><span>�̹����� �ҷ����µ� �����߽��ϴ�</span></p>' +
                            '<i class="broken_image_reload">�̹��� ���ΰ�ħ</i>' +
                        '</div>' +
                    '</div>';

        $(this).addClass('is_broken');
        $(this).parent().append($html);

    });

    // reload ��ư�� ���콺�� �ִ��� üũ
    $(document).on('mouseenter', '.broken_image_reload', function () {
        $(this).closest('.jt_broken_image_link').addClass('reload_hover');
    });
    $(document).on('mouseleave', '.broken_image_reload', function () {
        $(this).closest('.jt_broken_image_link').removeClass('reload_hover');
    });

    // reload ��ư�� ��Ŀ�� �Ǿ�������� ��ũ�̵����� ����
    $('.jt_broken_image_link').on('click', function(e){
        if($(this).hasClass('reload_hover')){
            e.preventDefault();
        }
    });

    // �̹��� reload
    $(document).on('click', '.broken_image_reload', function(){

        var $this = $(this);
        var $broken = $this.closest('.broken_image_wrap');
        var $original_img = $broken.parent().find('img');

        $broken.hide();

        $.ajax({
            type: "get",
            // url: $original_img.attr('src'),
            url: "http://jtpress.studio-jt.co.kr/wp-content/uploads/2018/11/flower.jpg",
            mimeType: "text/plain; charset=x-user-defined",
            success: function(response){
                var $new_image = $('<img />').attr('src', 'data:image/jpeg;base64,' + base64encode(response));
                $new_image.attr('width', $original_img.attr('width'));
                $new_image.attr('heigh', $original_img.attr('height'));

                $original_img.after($new_image);
                $original_img.remove();
                $broken.remove();
            },
            error: function(){

                $broken.show();

            }
        });

    });

}

function base64encode(str) {
    var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out = "", i = 0, len = str.length, c1, c2, c3;
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
    }
    return out;
}



/**
    * infinite rotating
    *
    * @version 1.0.0
    * @since 2018-12-13
    * @author STUDIO-JT (JDY)
    *
    * @example
    * Markup sample
    *
    * <figure class="motion_rotate" data-direction="reverse" data-speed="100">
    *   <img class="jt_broken_image_check" src="some_img_url.jpg" alt="" />
    * </figure>
    * <figure class="motion_rotate" data-speed="100">
    *   <img class="jt_broken_image_check" src="some_img_url.jpg" alt="" />
    * </figure>
    *
    * data-direction="reverse"�� ������ ȸ���� ������ �����մϴ�.
    */
function motion_rotate(){

    $('.motion_rotate').each(function(){

        var $this = $(this);
        var speed = parseFloat($this.attr('data-speed'));
        var direction = $this.attr('data-direction');
        var deg = 360;

        if(direction == "reverse"){
            deg = -deg;
        }

        new TweenMax.to($this, speed, {rotation: deg, repeat:-1, repeatDelay:0, ease: Power0.easeNone});

    });

}




/* **************************************** *
* Other Functions
* **************************************** */
// main fullpage
function main_fullpage(){

    if($('.main_fullpage_slider').length <= 0) return;

    var $body = $('body');
    var $fullpage = $('.main_fullpage_slider');
    var visual_progress_flag = true;
	var speed = 1000;
	var allowtouchmove = true;

	var $window       = $(window);
	var didScroll     = true;
	var currentScroll = 0;
	var lastScroll    = $window.scrollTop();
	var moveScroll    = 10;

    if($body.hasClass('home')){
        $('body').addClass('invert')
    }

	if($(window).width() <= 767){

		// fix ios address bar vh
		if(window.screen.height === window.innerHeight){
			 //  WITHOUT Address bar  (fullscreen)
			$('.main_fullpage_slider').height(window.screen.height)
		}else{
			 // WITH Address bar
			 $('.main_fullpage_slider').height(window.innerHeight)
		}

		// custom spee on mobile
		speed = 500;
	}

	// IE scrollbug fix
	if( $('html').hasClass('ie') && $('html').hasClass('desktop') ) {
    	allowtouchmove = false;

        $('.main_container').append('<div class="main_fullpage_slider_helper"></div>');
		var $fakewrap = $('.main_container').find('.main_fullpage_slider_helper');
		for( i=0 ; i<$fullpage.find('.main_section').length ; i++ ){
			$fakewrap.append('<div class="main_fullpage_slider_helper_item"></div>');
		}
    }

	//console.log(allowtouchmove);

    // init
    main_fullpage_slider = new Swiper($fullpage, {
		init: false,
        direction: "vertical",
        effect: "slide",
        autoplay: false,
        speed: speed,
        parallax: true,
		preventInteractionOnTransition: true,
		simulateTouch: false,
		resistanceRatio : 0.75,
		allowTouchMove: allowtouchmove,
		//followFinger: followfinger,
		longSwipesRatio : 0.1,
		//touchAngle:80,
		//longSwipes :false,
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        mousewheel: {
            forceToAxis: true,
            invert: true,
            releaseOnEdges: true // fix scroll fail
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable : true,
			renderBullet: function (index, className) {
				var tooltip = [
					'Main',
					'Our Value',
					'What We Do',
					'Fill the blank',
					'Let’s be Together'
				];
				if($('body').hasClass('lang_en')){
					tooltip = [
						'Main',
						'Our Value',
						'What We Do',
						'Let’s be Together'
					];
				}
				return '<span class="' + className + '"><i>'+tooltip[index]+'</i></span>';
			}
        }
    });

	// pop - item index
	main_fullpage_slider.on('init', function(){
		if( home_list_idx != null && home_list_back_flag ) {
			main_fullpage_slider.slideTo(home_list_idx, 0,function(){
				var current_index = this.activeIndex;
				set_invert_class(current_index);
			});
		}

		// IE scrollbug fix
		if( $('html').hasClass('ie') && $('html').hasClass('desktop') && lastScroll / $window.height() != 0 ) {
            didScroll = false;

            var current_slider_idx = lastScroll / $window.height();
            main_fullpage_slider.slideTo(current_slider_idx, main_fullpage_slider.passedParams.speed);
		}
	});
	main_fullpage_slider.init();

	// push - item index
	$('.main_fullpage_slider a').on('click', function(){
		home_list_idx = main_fullpage_slider.activeIndex;
	});

    // Fix scroll swiper bug
    //setTimeout(function(){
        //main_fullpage_slider.mousewheel.enable();
    //}, 100);

	// immediatly disable mousewheel (enable after intro finish)
	if(!intro_done){
	    main_fullpage_slider.mousewheel.disable();
		main_fullpage_slider.keyboard.disable();
		main_fullpage_slider.allowTouchMove = false;
	}

    // add custom body class
    if(!$('html').hasClass('mobile')){
		main_fullpage_slider.on('slideNextTransitionStart', function(){

			var current_index = this.activeIndex;
			//console.log('next');
			if(typeof current_index != 'undefined'){
				$('body').attr('data-slide-index',current_index);

				setTimeout(function(){
					set_invert_class(current_index);
				},600)
			}

		});

		// add custom body class
		main_fullpage_slider.on('slidePrevTransitionStart', function(){
			//console.log('prev');
			var current_index = this.activeIndex;

			if(typeof current_index != 'undefined'){
				$('body').attr('data-slide-index',current_index);
				set_invert_class(current_index);
			}

		});

		// IE scrollbug fix
		if( $('html').hasClass('ie') && $('html').hasClass('desktop') ) {
			main_fullpage_slider.on('transitionStart', function(){
				didScroll = false;

				$("html, body").stop().animate({
					scrollTop: $window.height() * main_fullpage_slider.realIndex
				}, main_fullpage_slider.passedParams.speed, 'swing', function(){
					lastScroll = $window.scrollTop();
				});
			});

			main_fullpage_slider.on('transitionEnd', function(){
				didScroll = true;
			});

			JT.globals.main_fullpage_ie_scroll = function(){

				if(!intro_done) { return; }

				if(didScroll) {
					//console.log('didScroll');

					currentScroll = $window.scrollTop();

					// Make sure they scroll more than moveScroll
					if(Math.abs(lastScroll - currentScroll) <= moveScroll) return;

					if(currentScroll > lastScroll){ // ScrollDown
						main_fullpage_slider.slideNext();
					}
					else { // ScrollUp
						main_fullpage_slider.slidePrev();
					}
				}

			};
			$(window).on('scroll', JT.globals.main_fullpage_ie_scroll);
		}
	}else{
		main_fullpage_slider.on('slideChange', function(){
			//console.log('prev');
			var current_index = this.activeIndex;
            if(typeof current_index != 'undefined'){
				$('body').attr('data-slide-index',current_index);
			    set_invert_class(current_index);
			}

		});
	}

}

function set_invert_class(current_index){

	if($('body').hasClass('lang_ko')){
		if(current_index == 0 || current_index == 2 || current_index == 4 || current_index == 5){
			$('body').addClass('invert');
		}else{
			$('body').removeClass('invert');
		}
	}else{
		if(current_index == 0 || current_index == 2 || current_index == 3 || current_index == 4){
			$('body').addClass('invert');
		}else{
			$('body').removeClass('invert');
		}
	}

}

// main visual slider
function main_visual(){

    if($('.main_visual').length <= 0) return;

    var $visual = $('.main_visual');
    var $state = $visual.find('.swiper_play_state');

    var main_visual = new Swiper('.main_visual_wrap', {
        init: false,
        loop: true,
        speed: 1000,
		followFinger : false,
        preloadImages: false,
        lazy: {
            loadOnTransitionStart: true
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.main_visual .swiper-button-next',
            prevEl: '.main_visual .swiper-button-prev'
        },
        pagination: {
            el: '.main_visual .swiper-pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<span lang="en" class="' + currentClass + '"></span>' +
                    '<span class="swiper_progress_hidden_space"></span>' +
                    '<span lang="en" class="' + totalClass + '"></span>';
            }
        }
    });

    if($('.main_visual_item').length > 1){

		main_visual.on('init', function(){
			if( !$('#intro_container').length ) {
				main_visual_video_check(true);
				main_visual_transition();
			}
		});
		main_visual.init();

		main_visual.on('slideChangeTransitionStart', function(){

			TweenMax.set( $(main_visual.slides[main_visual.activeIndex]).find('.main_section_content') , {autoAlpha: 0});
			main_visual_video_check(false);
			main_visual_transition();

		});

	}

    // Play, Pause
    $state.on('click', function(){
        if($state.hasClass('play')){
            $state.removeClass('play').addClass('pause');
            $state.find('.swiper_state_play').focus();
        } else {
            $state.removeClass('pause').addClass('play');
            if( $state.hasClass('progress_max') ){ main_visual.slideNext(); }
            $state.find('.swiper_state_pause').focus();
        }
    });



}


// main visual slider helper
function main_visual_video_check(first){

    if(typeof $('.main_visual_wrap')[0] == "undefined") return;

    var main_visual = $('.main_visual_wrap')[0].swiper;

    // previous slide pause
    if( !first ) {

        var $prev_iframe = $(main_visual.slides[main_visual.previousIndex]).find('iframe');
        if( $prev_iframe.attr('src') == undefined ) { $prev_iframe.attr('src', $prev_iframe.attr('data-vmsrc')); }

        if( !!$prev_iframe.length ){

            var prev_video = new Vimeo.Player($prev_iframe[0]);
            prev_video.pause();

        }
    }

    // current slide play
    var $curr_iframe = $(main_visual.slides[main_visual.activeIndex]).find('iframe');
    if( $curr_iframe.attr('src') == undefined ) { $curr_iframe.attr('src', $curr_iframe.attr('data-vmsrc')); }

    if( !!$curr_iframe.length ){

        var curr_video = new Vimeo.Player($curr_iframe[0]);
        curr_video.getDuration().then(function(duration){
            curr_video.setCurrentTime(0);
            curr_video.play();

            var $poster = null;
			if($curr_iframe.parent().next().length > 0){
				$poster = $curr_iframe.parent().next();
			}else{
				$poster = $('.jt_vid_poster');
			}

            curr_video.on('timeupdate', function(data) {
				if(data.seconds > 0) {
					curr_video.off('timeupdate');

					if( $poster.is(':visible') ){
						TweenMax.to($poster, .3, {autoAlpha: 0, delay: .3, onComplete: function(){$poster.hide();}});
					}
				}
			});

            // setTimeout(function(){
            //     var $poster = null;
			// 	if($curr_iframe.parent().next().length > 0){
			// 		$poster = $curr_iframe.parent().next();
			// 	}else{
			// 		$poster = $('.jt_vid_poster');
			// 	}
            //     if( $poster.is(":visible") ) { $poster.hide(); }
            // }, 500);

            main_visual_state(duration*1000);
        });

    } else {

        main_visual_state(6000);

    }

}

function main_visual_state(speed){

    // progress
    var $state = $('.main_visual').find('.swiper_play_state');
    var $progress = $('.main_visual').find('.swiper_progress');

    if( main_visual_progress != null ) { main_visual_progress.kill(); }

    main_visual_progress = TweenMax.fromTo($progress, parseInt(speed/1000), {
        width: '0%'
    }, {
        width: '100%',
        ease: Power0.easeNone,
		paused : true,
        onStart: function(){
            $state.removeClass('progress_max');
        },
        onComplete: function(){
            $state.addClass('progress_max');

            if($state.hasClass('play') && typeof $('.main_visual_wrap')[0] != "undefined"){

                $('.main_visual_wrap')[0].swiper.slideNext();

            }
        }
    });
	if(intro_done){
	    main_visual_progress.play();
	}

}

function main_visual_transition(){

    if(typeof $('.main_visual_wrap')[0] == "undefined") return;

    var main_visual = $('.main_visual_wrap')[0].swiper;
    var $curr = $(main_visual.slides[main_visual.activeIndex]);

    // var blur_counter = { blur: 40 };
    var blur_counter = { blur: 24 };
    TweenMax.to(blur_counter, 2, {
        blur: 0,
        onStart: function() {
            TweenMax.fromTo($curr.find('.main_section_content'), .4, {autoAlpha: 0}, {autoAlpha: 1});
        },
        onUpdate: function() {
            // TweenMax.set($curr.find('.main_visual_title'), {
            // 	textShadow: '0 0 '+ blur_counter.blur +'px rgb(255,255,255)'
            // });


            //TweenMax.set($curr.find('.main_visual_title'), {
                //webkitFilter: "blur(" + blur_counter.blur + "px)",
                //filter: "blur(" + blur_counter.blur + "px)"
            //});
        }
    });

    // $(item).css('text-shadow', "0 0 #{blur}px black")

}

function main_visual_focus_check(type){

    if(typeof $('.main_visual_wrap')[0] == "undefined") return;

    var main_visual = $('.main_visual_wrap')[0].swiper;
    var $iframe = $(main_visual.slides[main_visual.activeIndex]).find('iframe');

    if(type){ // play

        if( main_visual_progress.paused() ) {
            main_visual_progress.play();

            if( !!$iframe.length ){
                var video = new Vimeo.Player($iframe[0]);
                video.play();
            }
        }

    } else { // pause

        if( !main_visual_progress.paused() ) {
            main_visual_progress.pause();

            if( !!$iframe.length ){
                var video = new Vimeo.Player($iframe[0]);
                video.pause();
            }
        }

    }

}

// Family select
function family_select(){

    $(document).on('click','.family_select_title, .family_select_overlay',function(){

        var is_home = $('body').hasClass('home');

		if(!$('.family_select').hasClass('open')){
            $('.family_select_list_container').fadeIn(200);
            $('.family_select').addClass('open');

			if(is_home){
				main_fullpage_slider.mousewheel.disable();
				main_fullpage_slider.allowTouchMove = false;
			}
        }else{
            $('.family_select_list_container').fadeOut(200);
            $('.family_select').removeClass('open');
			if(is_home){
				main_fullpage_slider.mousewheel.enable();
				main_fullpage_slider.allowTouchMove = true;
			}
        }

        $('.family_select_list_container .nicescroll_area').getNiceScroll().resize();

    });

}

//Small screen reorder dom
function small_screen_footer(){

	if($('.main_footer .small_copyright').length <= 0 ){
		var $copy_clone = $('.sub_page_footer .copyright').first().clone();
		$copy_clone.addClass('small_copyright');
		$('.main_footer .footer_lang_and_family').after($copy_clone);
	}

	if($('.sub_page_footer .small_copyright').length <= 0 ){
		var $copy_clone_2 = $('.sub_page_footer .copyright').first().clone();
		$copy_clone_2.addClass('small_copyright');
	    $('.sub_page_footer .footer_lang_and_family').after($copy_clone_2);
	}

	if($('.main_footer .small_footer_info').length <= 0 ){
		var $info_clone = $('.sub_page_footer .footer_info').first().clone();
		$info_clone.addClass('small_footer_info');
		$('.main_footer .small_copyright').before($info_clone);
	}

	if($('.sub_page_footer .small_footer_info').length <= 0 ){
		var $info_clone_2 = $('.sub_page_footer .footer_info').first().clone();
		$info_clone_2.addClass('small_footer_info');
        $('.sub_page_footer .small_copyright').before($info_clone_2);
	}

}


// cursor custom
function custom_cursor(){

    if( $('html').hasClass('mobile') ) { return; }

    var cursor = '<div id="custom_cursor"><div class="custom_cursor_inner"><div class="custom_cursor_circle"></div></div></div>';
    cursor += '<div id="custom_cursor_text"><div class="custom_cursor_inner"><div lang="en" class="custom_cursor_text"><span></span></div></div></div>';
    $('body').append(cursor);

    var $cursor_primary = $('#custom_cursor');
    var $cursor_secondary = $('#custom_cursor_text');
    var $circle = $cursor_primary.find('.custom_cursor_circle');
    var $txt = $cursor_secondary.find('.custom_cursor_text');

    // default moving
    $('body').mousemove(function(e) {
        if( !$cursor_primary.is(":visible") ) {
            TweenMax.set($cursor_primary, {x: e.clientX,y: e.clientY,display: 'block'});
            TweenMax.set($cursor_secondary, {x: e.clientX / 2.0,y: e.clientY});
            TweenMax.to($circle, .3, {width: '10%',height: '10%',ease: Power0.easeNone});
        } else {
            TweenMax.to($cursor_primary, 1.3, {x: e.clientX,y: e.clientY,ease: Power3.easeOut});
            TweenMax.to($cursor_secondary, 1.6, {x: e.clientX,y: e.clientY,ease: Power3.easeOut});
        }
    });

    $(document).mouseleave(function () {
        $('html').addClass('remove_cursor');
    });

    $(document).mouseenter(function () {
        //if(flag_moved) {
            $('html').removeClass('remove_cursor');
        //}
    });

}



// custom element cursor
function element_cursor(selectors){

    $(selectors).each(function(){

        var $this = $(this);
        var is_border_hover = $this.hasClass('element_cursor');
        if(is_border_hover){
            $this.append('<span class="element_cursor_point"><i></i></span>');

            var $pointer = $this.find('.element_cursor_point');
            var $pointer_icon = $this.find('.element_cursor_point > i');
            var pointer_size = ( $this.data('size') != undefined ) ? $this.data('size') : parseInt($this.width());

            var $pointer_extend = null;
            if( $this.find('.element_cursor_extend').length > 0 ) {
                $pointer_extend = $this.find('.element_cursor_extend');
            }

        }

        $this.on({
            mouseenter: function(){
                TweenMax.to('#custom_cursor, .custom_cursor_text', .3, {autoAlpha: 0});

                if(is_border_hover){
                    TweenMax.to($pointer, .3, {width: pointer_size,height: pointer_size,autoAlpha: 1,ease: Power0.easeNone});

                    var ratio = get_ratio();

					$this.bind('mousemove', function(e){
                        var center_x = $pointer.offset().left + $pointer.width()/2;
                        var center_y = $pointer.offset().top + $pointer.height()/2;
                        var tween_x = e.pageX - (center_x * ratio);
                        var tween_y = e.pageY - (center_y * ratio);

                        TweenMax.to($pointer_icon, 1.3, {x: tween_x / 2.0,y: tween_y / 2.0,ease: Power3.easeOut});

                        if( $pointer_extend != null ) {
                            TweenMax.to($pointer_extend, 1.3, {x: tween_x / 8.0,y: tween_y / 8.0,ease: Power3.easeOut});
                        }
                    });
                }
            },
            mouseleave: function(){
                TweenMax.to('#custom_cursor, .custom_cursor_text', .3, {autoAlpha: 1});
                if(is_border_hover){
                    TweenMax.to($pointer, .3, {width: 0,height: 0,autoAlpha: 0,ease: Power0.easeNone});

                    if( $pointer_extend != null ) {
                        TweenMax.to($pointer_extend, .3, {x: 0,y: 0,ease: Power0.easeNone});
                    }

                    $this.unbind('mousemove');
                }
            }
        });

    });

}

// Button point motion
function button_motion(){

    //if($('html').hasClass('ie11')) return;

	$(".jt_btn_point").each(function(){

		var offset = 3;
		if($(window).width() <= 1660){
			offset = 5;
		}

        var $btn = $(this);
        var btn_width = $btn.outerWidth() - offset;
        var $bg =  $btn.find('i');
        var tl = new TimelineMax({paused:true});
		var dotted_width = $btn.find('i').width();
		var dotted_left = (btn_width - dotted_width);

        tl.to($bg, .3, { width: btn_width+'px', left: '0'});
        tl.to($bg, .3, { width: dotted_width+'px', left: dotted_left+'px'});

        $btn.mouseenter(function(){

        tl.play();

        }).mouseleave(function(){

        var currentTime = tl.time();
        tl.reverse(currentTime);

        });

    });

}


// Main ball motion
function ball_motion(){

//if(!$('body').hasClass('home')) return;

$('.mask_ball').each(function(){

        var speed        = 30;
        var $container   = $(this);
        var slide_index  = $container.closest('.main_section').index();
        var $balls       = $container.find( "> .ball" );
        var $ball_01     = $container.find('.ball_01');
        var $ball_02     = $container.find('.ball_02');
        var $ball_stroke = $container.find('.ball_stroke');
        var ball_size    = $ball_01.width();
        //var win_w        = window.innerWidth;
        var win_w        = $container.parent().width()
        var wall_left_pos   = 0 - ball_size;
        var wall_right_pos  =  win_w //+ ball_size;

        //console.log($ball_01);

        // Tween
        // Note : use left instead of x to move inner ball relative to the screen
        var ball_tween_01 = gsap.fromTo($ball_01,{
            left:wall_left_pos
        },{
            id: "ball_01",
            duration:speed/1.5,
            left:wall_right_pos,
            ease:Linear.easeNone,
            repeat:-1,
            onUpdate:function () {
                var x_parent = gsap.getProperty($ball_01[0], "left");
                var x_clone = gsap.getProperty($ball_02[0], "left");
                var x_clone_stroke = gsap.getProperty($ball_stroke[0], "left");

                gsap.set($ball_01.find('.ball_inner'),{
                    left: x_clone - x_parent
                });

                gsap.set($ball_01.find('.ball_stroke_inner'),{
                    left: x_clone_stroke - x_parent
                });

            }
        });

        var ball_tween_02 = gsap.fromTo($ball_02,{
            left:wall_left_pos
        },{
            id: "ball_02",
            duration:speed*2,
            left:wall_right_pos,
            ease:Linear.easeNone,
            repeat:-1,
            onUpdate:function () {
                var x_parent = gsap.getProperty($ball_02[0], "left");
                var x_clone_stroke = gsap.getProperty($ball_stroke[0], "left");

                gsap.set($ball_02.find('.ball_stroke_inner'),{
                    left: x_clone_stroke - x_parent
                });

            }

        });

        var ball_tween_03 = gsap.fromTo($ball_stroke,{
            left:wall_right_pos,
        },{
            id: "ball_stroke",
            duration:speed,
            left:wall_left_pos,
            repeat:-1,
            ease:Linear.easeNone

        });

        // Set default tween ball pos
        ball_tween_01.progress(0.1).pause();
        ball_tween_02.progress(0.5).pause();
        ball_tween_03.progress(0.2).pause();

        // Acceleration on mouse hove
        $balls.each(function(){
            var $this = $(this);
            var tween_id = $this.attr('data-tween-id');
            var current_tween = gsap.getById(tween_id);
            var over_flag = false

            $this.mouseenter(function() {
                if(over_flag) return;
                over_flag = true;
                gsap.to(current_tween,{duration:0,timeScale:10});
            }).mouseleave(function() {
                gsap.to(current_tween,{duration:1,timeScale:1,onComplete:function(){
                    over_flag = false;
                }});
            });
        });

        // Play Pause in view
		if (main_fullpage_slider !== null){
			main_fullpage_slider.on('slideChange', function(){

				var current_index = this.activeIndex;

				if(typeof current_index != 'undefined'){
					if(current_index === slide_index){
						ball_tween_01.play();
						ball_tween_02.play();
						ball_tween_03.play();
					}else{
						ball_tween_01.pause();
						ball_tween_02.pause();
						ball_tween_03.pause();
					}
				}

			});
		} else {
			ball_tween_01.play();
			ball_tween_02.play();
			ball_tween_03.play();
		}

        // if from Back button
        if(home_list_back_flag){

        	$('body').attr('data-slide-index',home_list_idx)

        	if(home_list_idx == 1 || home_list_idx == 4){
				ball_tween_01.play();
				ball_tween_02.play();
				ball_tween_03.play();
        	}

        	if($('body').hasClass('lang_ko')){
				if(home_list_idx == 1 || home_list_idx == 3){
				   $('body').removeClass('invert');
				}
			}else{
				if(home_list_idx == 1){
				   $('body').removeClass('invert');
				}
			}
        }

	    // Fix CI load from home
	    if($('body').hasClass('page-template-company-ci')){
        		ball_tween_01.play();
				ball_tween_02.play();
				ball_tween_03.play();
        }

	    // Show in email template ( avoid flash)
	    if($('body').hasClass('page-template-email')){
			gsap.to('.mask_ball',{autoAlpha:1})
		}

    }); // END each

}

function ci_slide_color(){

    $('.ci_wordmark_slide').on('click', function(){

        var $this = $(this);
        var $view = $(this).siblings('.ci_wordmark_view');

        if($this.hasClass('light')){

            $this.removeClass('light').addClass('dark');
            $view.removeClass('light').addClass('dark');

        }else if($this.hasClass('dark')){

            $this.removeClass('dark').addClass('light');
            $view.removeClass('dark').addClass('light');

        }
    })
}

// Button Motion over
function btn_spread_motion(){

    if($('html').hasClass('mobile')) { return; }

    $(document).on('mouseenter','.jt_btn_spread',function(e){
		var parentOffset = $(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        $(this).find('.jt_btn_overlay').css({top:relY, left:relX});
    });

    $(document).on('mouseout','.jt_btn_spread', function(e){
        var parentOffset = $(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        $(this).find('.jt_btn_overlay').css({top:relY, left:relX});
    });

}

// sub tab
function sub_menu_tab(){

    var loading = false;

    $( '.sub_tab_nav a' ).off().on( 'click', function () {

        if(loading){
            return;
        }else{
            loading = true;
        }

        var $this = $( this );
        var wrap_selector = '.sub_tab_content' ;
        var $wrap = $( wrap_selector );
        var link  = $this.attr( 'href' );
		var new_index = $this.parent('li').index();

        // If no content wrapper do nothing
        if($wrap.length <= 0 ) {return;}

        // Update navigation
        $('.sub_tab_nav_container').each(function(){
			$(this).find('li').removeClass('active');
            $(this).find('li').eq(new_index).addClass('active');
		});

        // scroll to
        var win_width = $(window).width();
		var offset = 63;
		var ratio = get_ratio();
		var scroll_target = 0;

		if(win_width > 2000 ){
			scroll_target = $('.article_header').outerHeight(true) + parseInt($('.main_container').css('paddingTop')) + parseInt($('.article_title').css('marginBottom'));
		}else{
			scroll_target = $('.article_body').offset().top;
		}

		if(win_width < 1023 ){
			offset = 100;
		}else if(win_width < 1660 ){
			offset = 35;
		}else{
            // do nothing
		}

		// scroll to
        $('html,body').stop().animate({scrollTop: (scroll_target*ratio) - (offset*ratio)});

        // Update content
        gsap.to($wrap,{
            duration:0.1,
            autoAlpha:0
        });

        $.get( link, function ( response ) {

            var $new_article = $( response ).find( wrap_selector);
			var data = response.replace('<body', '<body><div id="body"').replace('</body>','</div></body>');
			var body_class =  $(data).filter('#body').attr('class');
			var new_class =  $( response ).find('.article').attr('class');

            // Update body + article class
            $('body').attr('class',body_class);
			$('.article').attr('class',new_class);
			$('body').addClass('minimize_header');

            // update container content
            $wrap.replaceWith( $new_article );

			// Show ad contact btn
			$('body').addClass('transition_tween_ended');

            JT.ui.init();

            // window.history.pushState( null, null, link );
            try { history.pushState( null, null, link ); } catch ( e ) { }

			// Update title meta
            document.title = $(response).filter('title').text();

			// Update edit button
			if($('#wp-admin-bar-edit').length > 0){
			    var edit_link = $( response ).find('#wp-admin-bar-edit a').attr('href');
			    $('#wp-admin-bar-edit a').attr('href',edit_link);
			}

            // show tab
            gsap.to($wrap,{
                duration:0.2,
                autoAlpha:1,
                onComplete:function(){
                    loading = false;
					unveil_init();
					other_business_slider_init();
                }
            });

			// animate bar
			/*
			var $bar = $('.sub_tab_nav_bar');
			var new_width =  $this.parent('li').width()-28;
			var to_pos = $this.parent('li').position().left;
			gsap.set($bar,{ left: to_pos, width:new_width});
			*/
            if($('.sub_tab_nav_clone').length > 0){
			    $('.sub_tab_nav_clone .wrap').scrollLeft($('.article_body .sub_tab_nav li.active').offset().left);
			}

			// re init fix tab
			if ($window.scrollTop() > ($('.sub_tab_nobarba .sub_tab_nav_container').offset().top - 63)) {
                $('body').addClass('fix_sub_tab_nav');
            } else {
                $('body').removeClass('fix_sub_tab_nav');
            }

        } );

        return false;

    } );

    //init_sub_nav_bar();


    // Clone and Make it sticky
    var $clone_nav = $('.sub_tab_nobarba .sub_tab_nav_container').clone(true,true);
    var $window = $(window);
    var $header = $('#header, .pop_menu_container');

    if($('.main_container > .sub_tab_nav_clone').length <= 0 ){
        $clone_nav.addClass('sub_tab_nav_clone').wrapInner('<div class="wrap"></div>');

        $('.main_container').prepend($clone_nav);

        JT.globals.sub_tab_nav_clone_sticky = function() {
            if($('.sub_tab_nobarba .sub_tab_nav_container').length <= 0) return;

            if ($window.scrollTop() > ($('.sub_tab_nobarba .sub_tab_nav_container').offset().top - 63)) {
                $('body').addClass('fix_sub_tab_nav');
            } else {
                $('body').removeClass('fix_sub_tab_nav');
            }
        };
        $(window).on('scroll', JT.globals.sub_tab_nav_clone_sticky);
    }

    if($('.article_body .sub_tab_nav li.active').length > 0){
	    $('.article_body .sub_tab_nav_container').scrollLeft($('.article_body .sub_tab_nav li.active').offset().left - 20);
        $('body').addClass('fix_sub_tab_nav');
	    $('.sub_tab_nav_clone .wrap').scrollLeft($('.article_body .sub_tab_nav_container').scrollLeft());
	    $('body').removeClass('fix_sub_tab_nav');
    }

}

// init_sub_nav_bar
function init_sub_nav_bar(){

	// Init bar width
    $('.sub_tab_nav_bar').width($('.sub_tab_nav').find('.active a').width());

    // Animate bar
    $('.sub_tab_nav li').each(function(){

        if($(this).length <= 0) return;

        var $this = $(this);
        var $bar = $('.sub_tab_nav_bar');

        if($bar.length > 0) {

            var $curr = $('.sub_tab_nav').find('.active');
            var from_pos = $curr.position().left;

            //var curr_width =  $container.find('.active a').width();
            //var new_width =  $this.find('a').width();

            $bar.css({left: from_pos});

            /*
            $this.hover(function(){
                $bar.stop().animate({left: to_pos}, 300);
                $bar.width(new_width);
            },function(){
                $bar.stop().animate({left: from_pos}, 300);
                $bar.width(curr_width);
            });
            */
           //$this.on('click',function(){
			if($(this).hasClass('active')){
			    var new_width =  $this.find('a').width();
				var to_pos = $this.position().left;
                $bar.css({left: to_pos});
                $bar.width(new_width);
			}
            //});

        }

    });

	// show bar
	$('.sub_tab_nav_container').addClass('sub_tab_bar_dimension_init');

}


// ����繫��ǥ chart init
function financial_chart_init(){

    if(!$('#financial_chart').length) { return; }

    // chart element
    var $this = $('#financial_chart');

    // chart data
    var financial_labels = [];
    var financial_data = [];

    // labels
    for(var i=0 ; i<=3 ; i++){
        if(i==0) {
            var labels_data = 'year';
        } else {
            var index = i-1;
            var labels_data = $this.attr('data-labels'+index);
        }

        financial_labels.push(labels_data);

    }


    // data
    for(var i=0 ; i<3 ; i++){
        var loopdata = [
                            $this.attr('data-year'+i),
                            $this.attr('data-sales'+i),
                            $this.attr('data-profit'+i),
                            $this.attr('data-net_profit'+i),
                        ]

        financial_data.push(loopdata);
    }

    // init
    $this.jtChart({
        labels: financial_labels,
        data: financial_data
        // title: $this.attr('data-title')
    });

}

// Stock tab
function stock_tab(){

    $('.jtstock_table_tab_menu li a').on('click',function(e){

        e.preventDefault();

        var $this = $(this);
        var $parent = $this.parent();
        var index = $parent.index();
        $('.jtstock_table_tab_content > div').stop().hide();
        $('.jtstock_table_tab_content > div').eq(index).stop().fadeIn();

        // update class
        $('.jtstock_table_tab_menu li a').parent().removeClass('active');
        $parent.addClass('active');

        // scroll to
        $('html,body').animate({scrollTop: $this.offset().top - ($('#header').outerHeight() + 40)});

        if( typeof $.fn.spidochescaler == 'function' ) {
            $('.jtstock_info_table_02').spidochescaler('load');
        }

    })
}

// IR accordion
function ir_accordion() {

    // ù �Խù��� active Ŭ���� �߰�
    var content_class = '.ir_accordion_content';

    $('.ir_list li').first().addClass('active');
    $('.ir_list li').first().find(content_class).show();

    // Toggle the accordion
    // Delegate click event to keep alive after adding content via ajax
    $('.ir_accordion_header').on('click', function(e){

        e.preventDefault();

        var $this = $(this);
        var $li = $('.ir_list li');
        var $li_content = $li.find(content_class)
        var $current_li = $this.parent();
        var $current_content = $current_li.find(content_class);
		var offset = 96;

        $li.not($current_li).removeClass('active');
        $current_li.toggleClass('active');


		if($(window).width() < 768){
		    offset = 66;
		}
		$current_content.toggle();
		$li_content.not($current_content).hide();
		$('html,body').animate({scrollTop: $this.offset().top - offset});

    });

}



// Animate by adding a simple class
// Todo : add optional parameter using data attribute
function motion_with_class(){

	// nothing on mobile
    //if(is_mobile()) return;
    // Fade
    $('.jt_animate_fade').each(function() {

        var $this = $(this);
        var tl = new TimelineLite({paused:true});
		var clear = "all";

		if(($this).hasClass('facebook_partner_badge')) {
			clear = "none";
		};

        TweenMax.set($this, {autoAlpha:0}); // avoid ie fouc
        tl.to($this, 2.2, { autoAlpha:1, ease:Power3.easeOut,clearProps: clear,onComplete : function(){
			$this.addClass('animate_done');
		}});

        $this.waypoint(function() {
            tl.play();
            this.destroy();
        }, {
            offset: "110%"
        });

    });

    // Block
    $('.jt_animate_block').each(function() {

        var $this = $(this);
        var tl = new TimelineLite({paused:true});

		if($(window).width() > 1400){
		    TweenMax.set($this, {autoAlpha:0,y:80}); // avoid ie fouc
			tl.to($this, 2.2, { autoAlpha:1,y:0, ease:Power3.easeOut,clearProps: 'all',onComplete : function(){
				$this.addClass('animate_done');
			}});
		}else{
			TweenMax.set($this, {autoAlpha:0}); // avoid ie fouc
			tl.to($this, 2.2, { autoAlpha:1, ease:Power3.easeOut,clearProps: 'all',onComplete : function(){
				$this.addClass('animate_done');
			}});
		}


        $this.waypoint(function() {
            tl.play();
            this.destroy();
        }, {
            offset: "110%"
        });

    });

    // Text
    $('.jt_animate_lines').each(function() {

        var $this = $(this);
        var tl = new TimelineLite({paused:true});

        if($(window).width() > 1400){

            var txt_original = $this.html();
            var txt_split = new SplitText($this , {type:"lines"});
            var lines = txt_split.lines; //an array of all the divs that wrap each character

            // Avoid ie fouc
            TweenMax.set(lines, {autoAlpha:0, y:30});

            // Animate
            tl.staggerTo(lines, 2.2, motion_args({autoAlpha:1, y:0, ease:Power3.easeOut, clearProps: 'all'}), 0.1, "+=0");

        }else{

             // simple motion on medium screen
            // 9br issue, remove br from the dom not working)
            TweenMax.set($this, {autoAlpha:0, y:0});
            tl.to($this, 2.2, motion_args({ autoAlpha:1, y:0, ease:Power3.easeOut,clearProps: 'all',}));

        }

        $this.waypoint(function() {
            tl.play();
            this.destroy();
        }, {
            offset: "110%"
        });

    });

    $('.jt_animate_letters').each(function() {

        var $this = $(this);
        var tl = new TimelineLite({paused:true});

        if($(window).width() > 1400){

            var txt_original = $this.html();
            var txt_split = new SplitText($this , {type:"chars"});
            var lines = txt_split.chars; //an array of all the divs that wrap each character

            // Avoid ie fouc
            TweenMax.set(lines, {autoAlpha:0, y:15});

            // Animate
            tl.staggerTo(lines, 2.2, motion_args({autoAlpha:1, y:0, ease:Power3.easeOut,clearProps: 'all', onComplete : function(){
                $this.html(txt_original);
            }}), 0.02, "+=0");

        }else{

             // simple motion on medium screen
            // 9br issue, remove br from the dom not working)
            TweenMax.set($this, {autoAlpha:0, y:0});
            tl.to($this, 2.2, motion_args({ autoAlpha:1, y:0, ease:Power3.easeOut,clearProps: 'all'}));

        }

        $this.waypoint(function() {
            tl.play();
            this.destroy();
        }, {
            offset: "110%"
        });

    });

    $('.jt_animate_list').each(function() {

        var $this = $(this);
		var stragger_delay = 0.2;
        var tl = new TimelineLite({paused:true});

		if(typeof $this.attr('data-delay') != "undefined"){
			stragger_delay = $this.attr('data-delay');
		}

        if($(window).width() > 1400){

            var items = $(this).children('*');

            // Avoid ie fouc
            TweenMax.set(items, {autoAlpha:0, y:15});

            // Animate
            tl.staggerTo(items, 2.2, motion_args({autoAlpha:1, y:0, ease:Power3.easeOut,clearProps: 'all', onComplete : function(){
                $this.html(txt_original);
            }}), stragger_delay, "+=0");

        }else{

             // simple motion on medium screen
            // 9br issue, remove br from the dom not working)
            TweenMax.set($this, {autoAlpha:0, y:0});
            tl.to($this, 2.2, motion_args({ autoAlpha:1, y:0, ease:Power3.easeOut,clearProps: 'all'}));

        }

        $this.waypoint(function() {
            tl.play();
            this.destroy();
        }, {
            offset: "110%"
        });

    });

}


// Debug ie not smoothy text motion
function motion_args(args){

    if($('html').hasClass('ie')){
        args.rotation = 0.1;
    }

    return args

}


// jt_draw_line
function jt_draw_line(){

	// nothing on mobile
	if($('html').hasClass('mobile')) return;

	$('.jt_draw_line svg').each(function() {

		var $svg = $(this);
		var $parent =$svg.closest('.jt_draw_line');
		var $paths = $svg.find('path');
		var delay = 0;

		if(typeof $parent.attr('data-delay') != "undefined"){
			delay = $parent.attr('data-delay');
		}

		var tl = new TimelineLite({paused:true, delay:delay});

		TweenMax.set($paths,{drawSVG:"0%"});
		tl.staggerTo($paths, 2, {drawSVG:"100%", ease: Power3.easeOut}, .2);

		$svg.waypoint(function() {
			tl.play();
			this.destroy();
		}, {
			offset: "90%"
		});

	});

}




// Single Slider
function single_slider_init(){

	var $slider = $('.single_slider');

    if($slider.length <= 0) return;

	$slider.each(function(){

		var $this = $(this);
		var $inner_container = $(this).find('.swiper-wrapper');
		var $items = $(this).find('.swiper-slide');
		var item_num = $items.length;
		var item_width = $items.first().outerWidth(true);

		// init
		var single_slider = new Swiper($slider, {
			slidesPerView: 3,
			spaceBetween: 0,
			navigation: {
				nextEl: '.components_list_single_nav.swiper-button-next',
				prevEl: '.components_list_single_nav.swiper-button-prev'
			},
			breakpoints: {
				1023: {
					slidesPerView: 2
				},
				680: {
					slidesPerView: 1
				}
			}
		});

		if(item_num*item_width > $inner_container.width()){

			// show ui
			$this.siblings('.components_list_single_nav ').show();
			$this.parent().addClass('components_list_single_slide_active');

			var $target = $('.jt_single_slider');

			$('.single_slider_container .components_list_single_nav').on('click',function(){

				TweenMax.to($(window), .8, {
					scrollTo : { y: $target.offset().top + $target.outerHeight() - $(window).height(), autoKill:true , offsetY:0},
					ease: Power3.easeOut,
					overwrite: 1
				});

			});

		}
	});

}




// Other business
function other_business_slider_init(){

	var $slider = $('.business_other_slider');

    if($slider.length <= 0) return;

	$slider.each(function(){

		var $this = $(this);
		var $inner_container = $(this).find('.swiper-wrapper');
		var $items = $(this).find('.swiper-slide');
		var item_num = $items.length;
		var item_width = $items.first().outerWidth(true);

		// init
		var other_business_slider = new Swiper($slider, {
			slidesPerView: 3,
			spaceBetween: 0,
			navigation: {
				nextEl: '.components_list_other_nav.swiper-button-next',
				prevEl: '.components_list_other_nav.swiper-button-prev'
			},
			breakpoints: {
				860: {
					slidesPerView : 2
				},
				540: {
					slidesPerView : 1
				}
			}
		});

		if(item_num*item_width > $inner_container.width()){

			// show ui
			$this.siblings('.components_list_other_nav ').show();
			$this.parent().addClass('components_list_other_slide_active');

			//other_business_slider();
		}
	});

}


// business components logo slider
function component_logo_slider_init(){

	var $slider = $('.components_list_logo');

    if($slider.length <= 0) return;

	$slider.each(function(){
		var $this = $(this);
		var $inner_container = $(this).find('.swiper-wrapper');
		var $items = $(this).find('.swiper-slide');
		var item_num = $items.length;
		var item_width = $items.first().outerWidth(true);

		if(item_num*item_width > $inner_container.width()){

			// show ui
			$this.siblings('.components_list_logo_nav ').show();
			$this.parent().addClass('components_list_logo_slide_active');

			// init
			new Swiper($this, {
				slidesPerView: "auto",
				spaceBetween: 0 ,
				navigation: {
					nextEl: '.components_list_logo_nav.swiper-button-next',
					prevEl: '.components_list_logo_nav.swiper-button-prev'
				},
			});

		}
	})

}

function ad_request_btn_scroll_sniff(){

	if( $('body').hasClass('home')){ return; }

    var $window   = $(window);
    var $document = $(document);
	var $body     = $('body');
    var $footer   = $('.sub_page_footer');
    var ad_btn   = '.ad_contact_btn, .ad_contact_btn_helper a, .ad_contact_show_btn';
	var $ad_btn_close   = $('.ad_modal_close_btn');
	var win_height = $window.height();
	var doc_height = $document.height();
    var ratio = get_ratio();

	//console.log($document.height());
	//if($window.width() > 2000){
	    //doc_height = original_doc_height;
	//}

	if(window.screen.height === window.innerHeight){
	    win_height = window.screen.height;
	}else{
		win_height = window.innerHeight;
	}

	if ($window.scrollTop() < doc_height - win_height - ($footer.outerHeight() * ratio) ) {
		$body.removeClass('js_ad_static');
	} else {
		$body.addClass('js_ad_static');
	}

	if ($window.scrollTop() < $document.height() - $footer.outerHeight() - ($footer.outerHeight()/3)){
		$body.removeClass('js_hide_tabnav');
	} else {
		$body.addClass('js_hide_tabnav');
	}

}

function ad_request_btn_scroll_sniff_init(){
	var $window   = $(window);
    $window.off('scroll', ad_request_btn_scroll_sniff);
	$window.on('scroll', ad_request_btn_scroll_sniff);

}

function ad_request_popup(){

    if($('#ad_modal').length <= 0) { return;}

    var $window   = $(window);
    var $document = $(document);
	var $body     = $('body');
    var $footer   = $('.footer');
    var ad_btn   = '.ad_contact_btn, .ad_contact_btn_helper a, .ad_contact_show_btn';
	var $ad_btn_close   = $('.ad_modal_close_btn');
	var current_url = '';
	var current_title = '';

	$('.ad_contact_btn_helper').find('a').attr('data-barba-prevent',true);

	var w_width = $(window).width()*1.2;
	if(window.innerWidth < window.innerHeight){
	    w_width = $(window).height()*1.3;
	}

	tl_ad = new TimelineMax({
		paused:true,
		onStart : function(){
            var $frame = $('#ad_modal_frame');

            if( $frame.length > 0 && $frame.attr('src') == '') {
                $frame.attr('src', $frame.attr('data-src'));
            }

			$('#ad_modal,.ad_modal_overlay').show();
		},
		onComplete:function(){
			if(!$('body').hasClass('home')){
				$('#ad_modal_frame').contents().find('html').addClass('js_ad_sub_open');
			}
		},
		onReverseComplete:function(){
			if($('body').hasClass('home')){
				$('#ad_modal_frame').contents().find('html').removeClass('js_ad_sub_open');
			}
			$('#ad_modal_frame').contents().find('html').removeClass('js_ad_sub_close');
			$('html').removeClass('js_ad_open');
			$('#ad_modal,.ad_modal_overlay').hide();
		}
	});

	tl_ad.to('#ad_modal',0.1,{autoAlpha:0});
	tl_ad.to('#ad_modal_overlay_01',0,{autoAlpha:1});

	if($('html').hasClass('android')){
		tl_ad.to('#ad_modal_overlay_01',.5,{'scale':1,ease: Sine.easeOut});
	}else{
	    tl_ad.to('#ad_modal_overlay_01',.5,{width:w_width+'px',height:w_width+'px',ease: Sine.easeOut});
	}

	//tl_ad.to('.ad_modal_overlay_logo',.6,{'scale':1,ease: Sine.easeOut},"-=0.6");
	tl_ad.to('#ad_modal_overlay_02',.5,{'scale':1,ease: Sine.easeOut});
	tl_ad.to('.ad_modal',0,{autoAlpha:0,onComplete:function(){
		$('html').addClass('js_ad_open');
	}},"-=0.1")
	tl_ad.to('.ad_modal',.2,{autoAlpha:1,ease: Sine.easeOut,onComplete: function(){
		TweenMax.to('#ad_modal_close_btn',.5,{rotation:180});
	}},"-=0.1");

	// Open up
    $(document).on('click',ad_btn,function(e){

		if($('body').hasClass('lang_en')){return;}

		e.preventDefault();

		// Animate
		tl_ad.timeScale(1).restart();

		// Change url and title
		var url = $(this).attr('href');

		current_url = location.href;
		current_title = $('head').find('title').text();
		url = url.replace('?modal=1','');
		$('head').find('title').text('�������� | NASMEDIA');
		//history.pushState( null, null, url);
		if ('history' in window && 'pushState' in history) {
		    //window.history.replaceState(null, null, url);
			history.pushState( null, null, url);
		}

    });

	// Close
    $ad_btn_close.on('click',function(){

		// Animate
		ad_request_popup_close(current_title);
		if(typeof current_url != 'undefined'){
			history.replaceState( null, null, current_url);
		}
		return false;

    });

    // Back button click
    $( window ).on( 'popstate', function () {

		if ( $( '#ad_modal' ).is( ':visible' ) && location.pathname != '/%EA%B4%91%EA%B3%A0%EB%AC%B8%EC%9D%98/' ) {

			ad_request_popup_close(current_title);
			//history.replaceState( null, null, current_url);

		}
	});

}

// Close ad request pop
function ad_request_popup_close(current_title){

	var is_home = $('body').hasClass('home');

    $('html').removeClass('js_ad_open');

	if(!is_home){
	    $('#ad_modal_frame').contents().find('html').removeClass('js_ad_sub_open').addClass('js_ad_sub_close');
	}

	tl_ad.timeScale(1.5).reverse();

    if(typeof current_title != 'undefined'){
	    $('head').find('title').text(current_title);
    }
}





// Animate Favicon
function animate_favicon() {

	if($('html').hasClass('ios') || $('html').hasClass('android')) { return;}

	var is_ie = $('html').hasClass('ie') ? true : false;
	var domain = location.origin;
	var favicon_location = domain + '/wp-content/themes/nasmedia/images/favicon/';
	var favicon_focus = [favicon_location + 'r-00.png',
						favicon_location + 'r-01.png',
						favicon_location + 'r-02.png',
						favicon_location + 'r-03.png',
						favicon_location + 'r-04.png',
						favicon_location + 'r-05.png',
						favicon_location + 'r-06.png',
						favicon_location + 'r-07.png',
						favicon_location + 'r-08.png',
						favicon_location + 'r-09.png',
						favicon_location + 'r-10.png',
						favicon_location + 'r-11.png',
						favicon_location + 'r-12.png',
						favicon_location + 'r-13.png',
						favicon_location + 'r-14.png',
						favicon_location + 'r-15.png',
						favicon_location + 'r-16.png',
						favicon_location + 'r-17.png',
						favicon_location + 'r-18.png',
						favicon_location + 'r-19.png',
						favicon_location + 'r-20.png',
						favicon_location + 'r-21.png',
						favicon_location + 'r-22.png',
						favicon_location + 'r-23.png',
						favicon_location + 'r-24.png',
						favicon_location + 'r-25.png',
						favicon_location + 'r-26.png',
						favicon_location + 'r-27.png',
						favicon_location + 'r-28.png',
						favicon_location + 'r-29.png',
						favicon_location + 'r-30.png',
						favicon_location + 'r-31.png',
						favicon_location + 'r-32.png',
						favicon_location + 'r-33.png',
						favicon_location + 'r-34.png',
						favicon_location + 'r-35.png',
						favicon_location + 'r-36.png',
						favicon_location + 'r-37.png',
						favicon_location + 'r-38.png',
						favicon_location + 'r-39.png',
						favicon_location + 'r-40.png',
						favicon_location + 'r-41.png',
						favicon_location + 'r-42.png',
						favicon_location + 'r-43.png',
						favicon_location + 'r-44.png',
						favicon_location + 'r-45.png',
						favicon_location + 'r-46.png',
						favicon_location + 'r-47.png']
	var favicon_blur = [favicon_location + 'k-00.png']

	if(is_ie){
		favicon.change(favicon_focus[0]);
	}else{
		favicon.animate(favicon_focus,84);
	}

	$(window).on("blur focus", function(e) {
		var prevType = $(this).data("prevType");

		if (prevType != e.type) {
			switch (e.type) {
				case "blur":
					favicon.change(favicon_blur);
					break;
				case "focus":
					if(is_ie){
						favicon.change(favicon_focus[0]);
					}else{
						favicon.animate(favicon_focus,84);
					}
					break;
			}
		}

		$(this).data("prevType", e.type);
	});

}


// Flipbook custom download btn
function flipbook_download_btn(){

	$('.real3dflipbook').each(function(){

		var $this = $(this);
		var svg_icon ='<svg class="icon_download" x="0px" y="0px" width="10px" height="14.5px" viewBox="0 0 10 14.5" enable-background="new 0 0 10 14.5" xml:space="preserve"><path d="M10,14.5H0v-2h10V14.5z"></path><path d="M5,10.414L0.793,6.207l1.414-1.414L5,7.586l2.793-2.793l1.414,1.414L5,10.414z"></path><path d="M6,9H4V0h2V9z"></path></svg>';
		var download_url = "";
		//var data = $this.data('flipbook-options');
		//console.log(data);

		// add container
		$this.wrap('<div class="real3dflipbook_jt_container"></div>');

		// Add download button
		if($('.download_files_list').length > 0){
			download_url = $('.download_files_list a').attr('href');
		    var blank = "";
			if($('html').hasClass('ie')){
				blank = ' target="_blank"';
			}
		    $('.real3dflipbook_jt_container').append('<a'+blank+' data-barba-prevent download class="jt_btn_icon jt_icon_download jt_type_03 jt_btn_spread" href="'+download_url+'"><i class="jt_btn_overlay"></i><span>�ٿ�ε�</span>'+svg_icon+'</a>');
		}
	});

	$('#jt_npr_list_wrap .jt_grid_list_meta button, #jt_pr_list_wrap .jt_grid_list_meta button, .npr_slide_item button, .reports_pr_slide_item button').on('click',function(e){
		e.preventDefault();
		e.stopPropagation();

		var url = $(this).attr('data-download');

		if($('#download_clone_btn').length <= 0){

			var blank = '';
			if($('html').hasClass('ie')){
				blank = ' target="_blank"';
			}
			$('.main_container').append('<a'+blank+' download href="#" id="download_clone_btn"></a>');

		}
		$('#download_clone_btn').attr('href',url);
		$('#download_clone_btn')[0].click();

		//window.location.href = url;

	})

}

// Ajax ���⺸���� search
function pr_ajax_list () {

    if($('#jt_pr_list_wrap').length <= 0) return;

	var scroll_target_pos = ($('#jt_pr_list_wrap').offset().top) - ($('#header').height() * 2);

	$(document).on( 'change', '#jt_pr_search .jt_search_subcategory', function () {

    //  console.log( $( this ).attr('#pr_form'));

	var $form = $( '#jt_pr_search' );
	var url= "/��������Ʈ/���⺸����/";
	var data  = $form.serialize();


	$.get( url, data , function ( res ) {

		var $res = $( res );
		var $target = $( $( '#jt_pr_list_wrap', $res ).html() );

        // $( '#jt_pr_list_wrap' ).html( $target );

		if ( $( '.jt_list_nothing_found', $res ).length > 0 ) {

			$( '.jt_list_nothing_found' ).remove();
			$( '.jt_list_nothing_found', $res ).insertAfter( $( '#jt_pr_search' ) );
			$( '.jt_grid_list' ).hide();

		} else {

			$( '.jt_list_nothing_found' ).remove();
			$( '.jt_grid_list' ).html( $( '.jt_grid_list', $res ) ).show();

		}

		$( '.jt_pagination' ).html( $( '.jt_pagination', $res ) );

		if ('history' in window && 'pushState' in history) {
			window.history.pushState(null, null, url + '?' + data);
		}

		unveil_init();
		selectric_init();

		// scroll top
		$('html,body').animate({
			scrollTop : scroll_target_pos
		});

		} );

		return false;

	} );
}

// Platform hash go to
function platform_goto(){

	if(!$('body').hasClass('page-template-business-components')) { return; }

	var target_hash = window.location.hash;

	if(typeof target_hash != "undefined"){

        var target_index = parseInt(target_hash.replace('#','')) - 1;
		var $target = $('.components_section_numbering').eq(target_index);
		var offset = 240;
		var nav_height = 0;

        if (!!$('html').find('.sub_tab_nav_container').length) {
        	nav_height = $('.sub_tab_nav_container').height();
        }

		if($(window).width() < 1480){
			if(target_index == 0 || target_index == 1){
				offset = 165;
			}else{
				offset = 100;
			}
		}

		if($target.length > 0){
			setTimeout(function(){

				$('html, body').animate({
					scrollTop : $target.offset().top - offset - nav_height
				},0)
			},0)
		}

	}

}

function jt_share_open() {

	var $share = $('.jt_share_wrap');

	$share.on('click', '.jt_share_btn', function(e){

		e.preventDefault();
		e.stopPropagation();

		var $btn = $(this);
		var $this = $btn.closest('.jt_share_wrap');
		var $close = $this.find('.jt_share_close');
		var $list = $this.find('#jt_share_list');

		TweenMax.to($btn, .2, {
			autoAlpha: 0,
			ease: Power0.easeNone,
			onStart: function() {

				$this.addClass('open');

				TweenMax.to($close, .2, {autoAlpha: 1,delay: .2,ease: Power2.easeOut});
				TweenMax.to($list, .2, {autoAlpha: 1,delay: .2,ease: Power2.easeOut});

			}
		});

	});

	$share.on('click', '.jt_share_close', function(e){

		e.preventDefault();
		e.stopPropagation();

		var $close = $(this);
		var $this = $close.closest('.jt_share_wrap');
		var $btn = $this.find('.jt_share_btn');
		var $list = $this.find('#jt_share_list');

		$this.removeClass('open');

		TweenMax.to($close, .2, {autoAlpha: 0,ease: Power2.easeOut});
		TweenMax.to($list, .2, {autoAlpha: 0,ease: Power2.easeOut,onComplete: function() {TweenMax.set($btn, {autoAlpha: 1});}});

	});

}

// Business toggle picto
function business_toggle_picto(){

	if($('.article_body .sub_tab_nav_container').length <= 0) return;

	$('.article_body .sub_tab_nav_container').waypoint({
		handler: function(direction) {

			if(direction == 'down'){
				$('.article_header .business_picto').addClass('hide_picto');
			}else{
				$('.article_header .business_picto').removeClass('hide_picto');
			}

		},
		offset: 100,
	});

}


// Main whate we to slide
function whatwedo_smallscreen_slide(){

	if($('.main_what_list').length <= 0) return;
	if($(window).width() > 1023) return;

	$('.main_what_list_item').addClass('swiper-slide');
	$('.main_what_list').addClass('swiper-wrapper').wrap('<div class="main_what_list_container swiper-container"></div>');
	$('.main_what_list_container').append('<div class="what-swiper-pagination"></div>');

	var whatwedo_swiper = new Swiper('.main_what_list_container', {
      slidesPerView: 'auto',
      spaceBetween: 0,
	  //freeMode: true,
      pagination: {
        el: '.what-swiper-pagination',
        clickable: true,
      },
    });

}



// spidochescaler init
function spidochescaler_init(){

    // start point : maxWidth
    // destroy point : destroyAt

    if( typeof $.fn.spidochescaler != 'function' ) return;

    // �繫����
    $('.financial_graph_wrap').spidochescaler({ maxWidth: 500 });
    $('.financial_table').spidochescaler({ maxWidth: 500 });
    $('.financial_data_wrap .financial_table_unit').spidochescaler({ maxWidth: 500 });

    //�ְ�����
	if($(window).width() <= 1128) {
    	$('.jtstock_info_table_02').spidochescaler({ maxWidth: 1000 });
	}

    //ä���
    //$('.offer_jobs_table_wrap_inner, .single_offer_inner').spidochescaler({ maxWidth: 580 });

    //��������ó����ħ
    $('.privacy_table').spidochescaler({ maxWidth: 580 });

    $('.privacy_container .ir_accordion_header').on('click', function(e){
        $('.privacy_table').spidochescaler('load');
    });

	    //�̻�ȸ �� ����ȸ
    $('.sub_company_committees .jtstock_table').spidochescaler({ maxWidth: 700 });

    //������ȸ
    $('.sub_company_shareholder_meeting .jtstock_table').spidochescaler({ maxWidth: 660 });

    //����ȯ��
    $('.sub_investor_return .jtstock_table').spidochescaler({ maxWidth: 500 });

}


// Pdf viewer scroll fix
function pdf_viewer_scroll(){

	if($('.real3dflipbook_jt_container').length <= 0 ){ return; }

	$(window).on('load',function(){
		$('.flipbook-menu span[data-name="btnSearch"],.flipbook-menu span[data-name="btnThumbs"]').on('click',function(){
			JT.smoothscroll.destroy();
		});

		/*
		$('.flipbook-nav').on('click',function(){
			if($(window).width() <= 1024){
				$('html,body').animate({scrollTop: $('.real3dflipbook_jt_container').offset().top - 40});
			}
		});
		*/
	})

}

// @viewport polyfill
// For simple site var $target = $('body') it's enought  )
// IE 11 zoom is buggy (transform origin issue) so please use prefix viewport :
/*
 @media (min-width: 2000px){
	@-ms-viewport {
		width: 2000px auto;
	}
 }
 */
function qhd_viewport_zoom(){

	if(!$('body').hasClass('home')){
		TweenMax.set($('.ad_contact_btn'),{clearProps: 'zoom'});
	}

    var $window = $(window);
    var $target = $('#intro, body:not(.home) .main_container, .main_fullpage_slider .mask_ball, .header_container,.sub_page_footer,.primary_menu_inner,.main_section_content, #global_menu_outer .lang_container, #global_menu_outer .logo_img_container,.home .go_top,.home .ad_contact_btn,.ad_modal_overlay_logo,#ad_modal_close_btn,.ad_modal_logo,  .home .swiper_control, .home .swiper_navigation, .home .main_fullpage_slider > .swiper-pagination');
    var $invert_target = $('.facebook_partner_badge, .google_partners_badge');
	//var $target = $('body');

	var win_width = $window.width();
    //var wrap_width =  1920; //pc sian size
    var min_width = 2000; // scale start breakpoints

    if(win_width >= min_width){

		var ratio = get_ratio();
		$target.css('zoom',ratio);
		$invert_target.css('zoom',1/ratio);

		if(!$('body').hasClass('home')){
			TweenMax.set('.go_top',{clearProps: 'zoom'});
		}

		$('body').addClass('qhd_load');

    }else{

		TweenMax.set($target,{clearProps: 'zoom'});
		TweenMax.set($invert_target,{clearProps: 'zoom'});

    }

}

// Get ratio elper
function get_ratio(){
    var $window = $(window);
	var win_width = $window.width();
    var wrap_width =  1920; //pc sian size
    var min_width = 2000; // scale start breakpoints
    var ratio = 1;

    if(win_width > min_width){

	    ratio = win_width/wrap_width;
		//console.log(ratio);

    }

    return ratio

}

// Research  history component toggle item
function research_history_loadmore(){

	if($('.research_history_section').length <= 0) { return; }

	$('.research_history_section').each(function(){

	   var $this = $(this);
	   var $items = $this.find('li');
	   var num_to_show = parseInt($this.attr('data-numtoshow')) + 1;

	   if($this.find('> li').length >= num_to_show){

		   var $hidden_items = $this.find('> li:nth-child(n+'+num_to_show+')');
		   var more = null;

		   // hide item
		   $hidden_items.hide();

		   // Add btn


		   if ($('body').hasClass('lang_ko')) {

			   $this.after('<button class="research_history_section_more"><span>�� ����</span></button>');

		   } else {

			   $this.after('<button class="research_history_section_more"><span>MORE</span></button>');

		   }
		   $more = $this.parent().find('.research_history_section_more');

		   // Show hidden item on click
		   $more.on('click',function(){
			   $hidden_items.show();
			   $(this).hide();
		   });

	   }// End if

	});

}


// Load google plaform  on demand
// require for partner badge
function google_partner_api(){

	if($('.g-partnersbadge').length <= 0){ return };

	if(typeof gapi == "undefined"){
        $.getScript("https://apis.google.com/js/platform.js",function(){
            google_partner_render();
        })
    }else{
		google_partner_render();
	}
}

function google_partner_render(){

	if(typeof gapi != "undefined"){

		gapi.partnersbadge.go();

	}

}




}); // End jQuery
