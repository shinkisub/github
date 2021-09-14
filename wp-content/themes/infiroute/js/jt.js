'use strict';

/**
 * JT javascript UI library
 * @namespace
 * @description UI library create to help front end developement
 */
var JT = JT || {};

(function(win, $) {

	/**
	 * Custom Alert helper
	 *
	 * @version 1.1.0
	 * @since 2018-02-12
	 * @author STUDIO-JT (NICO)
	 *
	 * @param {string|object} args - the message or an options object for more custom.
	 * @param {string} args.message - 알림 메시지 내용.
	 * @param {string} [args.title=false] - 알림 메시지 제목.
	 * @param {string} [args.is_confirm=false] - if need display confirm modal (with cancel button).
	 * @param {string} [args.ok=확인] - 확인 버튼 커스텀 텍스트.
	 * @param {string} [args.cancel=취소] - 취소 버튼 커스텀 텍스트.
	 * @param {string} [args.style=basic] - predefined style are "basic" or "classic" can bee extended by adding what ever classname you want.
	 * @param {string} [args.type=none] - predefined style are "info", "success", "warning", "error" can bee extended by adding what ever classname you want.
	 * @param {string} [args.primary_title=false]
	 * @param {string} [args.primary_button=true]
	 * @param {string} [args.button_icon=true]
	 * @param {string} [args.has_icon=false]
	 * @param {callback} [args.on_confirm] - callback if press confirm.
	 * @param {callback} [args.on_cancel] - callback if press cancel button for confirm modal.
	 * @param {callback} [cb] - on confirm callback for simple.
	 *
	 * @todo create custom ui
	 *
	 * @example
	 * // String minimal required option :
	 * JT.alert('Some alert message');
	 *
	 * // String type with callback :
	 * JT.alert('Some alert message', function(){
	 *     console.log('Alert 끝!');
	 * });
	 *
	 * // Object type parameter옵션 :
	 * JT.alert({
		   title    : '상태 변경 완료',
		   primary_title : true,
	 *     message  : '개인정보수집 및 이용안내에 동의하여 주십시오.',
	 *     ok       : '확인 버튼 커스텀 텍스트',
	 *     cancel   : '취소 버튼 커스텀 텍스트',
	 *     style    : 'classic',
	 *     type     : 'success',
	 *     button_icon : false,
     *     on_confirm : function(){
	 *         console.log('Alert 끝!');
     *     },
     *     on_cancel : function(){
	 *         console.log('Alert 취소!');
     *     }
	 * });
	 *
	 */
	JT.alert = function(args,cb){

        if(typeof args !== 'object' && typeof args !== 'string') return;

		if(typeof cb == 'undefined') {
			cb = '';
		}

        var title, message, on_confirm, on_cancel, ok, cancel, is_confirm, style, type, primary_title, primary_button, button_icon, has_icon;

        // string or object parameter
        if(typeof args == 'object'){
            message = args.message;
            on_confirm = args.on_confirm;
			on_cancel = args.on_cancel;
        }else{
            message = args;
        }

		// if has on_confirm callback second parameter  (TODO : improve the parameter 확인 logic)
		if(typeof cb == 'function' && typeof args != 'object'){
		    on_confirm = cb;
		}

		// set default value
        ok = (typeof args.ok != 'undefined') ? args.ok : '확인';
        cancel = (typeof args.cancel != 'undefined') ? args.cancel : '취소';
		is_confirm = (typeof args.is_confirm != 'undefined') ? args.is_confirm : false;
		title = (typeof args.title != 'undefined') ? args.title : false;
		style = (typeof args.style != 'undefined') ? args.style : 'basic';
		type = (typeof args.type != 'undefined') ? args.type : 'none';
		primary_title = (typeof args.primary_title != 'undefined') ? args.primary_title : false;
		primary_button = (typeof args.primary_button != 'undefined') ? args.primary_button : true;
		button_icon = (typeof args.button_icon != 'undefined') ? args.button_icon : true;
		has_icon = (type != 'none') ? true : false ;

        // Get a unique id
        var now  = new Date().getTime();
        var uid  = now / 1000 | 0;
        var id   = 'jt_alert_'+ uid ;

		// defined class
		var css_class = "jt_alert";

		css_class += " jt_alert_style_"+style;
		css_class += " jt_alert_type_"+type;

		if(is_confirm){
		    css_class += " jt_alert_confirm";
		}

		if(primary_title){
		    css_class += " jt_alert_primary_title";
		}

		if(primary_button){
		    css_class += " jt_alert_primary_button";
		}

		//if(button_icon){
		//    css_class += " jt_alert_button_icon";
		//}

		if(has_icon){
		    css_class += " jt_alert_has_icon";
		}

        // html 생성
        var html    = "";

        html +=  '<div id="'+ id +'" class="'+css_class+'" role="alert">';
            html +=  '<div class="jt_alert_container">';
                html +=  '<div class="jt_alert_content">';
				    if(title){
					html +=  '<h1>'+ title+'</h1>';
					}
					html +=  '<p>'+ message+'</p>';
				html +=  '</div> ';
                html +=  '<div class="jt_alert_actions">';
                    if(is_confirm){
				    html +=  '<button class="jt_alert_cancel">'+cancel+'</button>';
				    }
				    html +=  '<button class="jt_alert_ok">'+ok+'</button>';
                html +=  '</div>';
            html +=  '</div> ';
        html +=  '</div> ';

        // Body 안에 추가
        $('body').append(html);

        // 접근성 포커스
        $('#'+ id +' .jt_alert_ok').attr("tabindex", 0).focus();

        // 이벤트 추가
        $('#'+ id).find('.jt_alert_ok').on('click', function(e) {
            e.preventDefault();
            $('#'+ id).remove();

            if(typeof on_confirm === 'function'){
                on_confirm();
            }

        });

		$('#'+ id).find('.jt_alert_cancel').on('click', function(e) {
            e.preventDefault();
            $('#'+ id).remove();

            if(typeof on_cancel === 'function'){
                on_cancel();
            }

        });

        // Esc 키누르시면 알림 팝업
		var esc = function(e){
            if (e.which == '27') {
                $('#'+ id).remove();
            }
        };
        $(document).off('keyup', esc);
        $(document).on('keyup', function(e){
             esc(e);
        });

	};

	/**
	 * Custom confirm helper
	 *
	 * @version 1.0.0
	 * @since 2018-02-12
	 * @author STUDIO-JT (NICO)
	 *
	 * @todo create custom ui
	 *
	 * @example
	 * // Basic usage :
	 * JT.confirm('Some confirm message');
	 */
	JT.confirm = function(msg){
		confirm(msg);
	};

	/**
	 * Animated ScrollTo helper
	 *
	 * @version 1.0.0
	 * @since 2018-02-12
	 * @author STUDIO-JT (NICO)
	 *
	 * @todo Add call when transition ended
	 *
	 * @example
	 * // Basic usage :
	 * JT.scrollTo('#my_traget');
	 */
	JT.scrollTo = function(target,container){
		var $target = $(target);
		var offset = 10;
		var $container, container;

		if($target.length > 0){
			if(container == undefined || $(container).length <= 0){
				$container = $("html");
			} else {
				$container = $(container);
			}

			$container.stop().animate({
				scrollTop: ($target.offset().top - $container.offset().top + $container.scrollTop()) - offset
			},function(){
				//console.log('complete');
			});

		}
	};



	/**
	 * Smooth scroll with TweenMax (TODO : make a plugin)
	 *
	 * @version 1.0.0
	 * @since 2018-02-03
	 * @author STUDIO-JT (NICO)
	 * @requires TweenMax.min.js
	 * @requires ScrollToPlugin.min.js
	 */
	JT.smoothscroll = {

		passive : function(){
			var supportsPassive = false;
			try {
			  document.addEventListener("test", null, { get passive() { supportsPassive = true }});
			} catch(e) {}

			return supportsPassive;
		},
		init : function(){

			if($('html').hasClass('mobile') || $('html').hasClass('mac')) return;

			var $window = $(window);
			//var scrollTime = 1;
			var distance_offset = 2.5;
			//var scrollDistance = $window.height() / distance_offset;

			if(this.passive()){
			    window.addEventListener("wheel",this.scrolling,{passive: false});
			}else{
                $window.on("mousewheel DOMMouseScroll", this.scrolling);
			}

		},
		destroy : function(){

			if(this.passive()){
			    window.removeEventListener("wheel",this.scrolling);
			}else{
               $(window).off("mousewheel DOMMouseScroll", this.scrolling);
			}
			gsap.killTweensOf($(window),{scrollTo:true});

		},
		scrolling : function(event){

			event.preventDefault();

			var $window = $(window);
			var scrollTime = 1;
			var distance_offset = 2.5;
			var scrollDistance = $window.height() / distance_offset;
			var delta = 0;

			if(JT.smoothscroll.passive()){
			    delta = event.wheelDelta/120 || -event.deltaY/3;
			}else{
				if(typeof event.originalEvent.deltaY != "undefined"){
					delta = -event.originalEvent.deltaY/120;
				}else{
				    delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
				}
			}

			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);

			TweenMax.to($window, scrollTime, {
				scrollTo : { y: finalScroll, autoKill:true },
				ease: Power3.easeOut,
				overwrite: 5
			});


		},
        disable : function () {
            this.destroy();

            if ( this.passive() ) {

                window.addEventListener( 'wheel', this.scroll_destory, { passive: false } );

            } else {

                $( window ).on( 'mousewheel DOMMouseScroll', this.scroll_destory );

            }
        },
        enable : function () {

            JT.smoothscroll.init();

            if ( this.passive() ) {

                window.removeEventListener( 'wheel', this.scroll_destroy );

            } else {

                $( window ).off( 'mousewheel DOMMouseScroll', this.scroll_destroy );

            }

        },
        scroll_destory : function ( event ) {

            event.preventDefault();

        }

	};




	/**
	 * Check if screen is smaller than
	 *
	 * @description egal to css mediaqueries max-width
	 * @version 1.0.0
	 * @since 2018-02-12
	 * @author STUDIO-JT (NICO)
	 *
	 * @example
	 * // Basic usage :
	 * JT.is_screen('767');
	 */
	JT.is_screen = function(max_width){
		if(win.matchMedia){
			return win.matchMedia('(max-width:'+ max_width +'px)').matches;
		}else{
			return win.innerWidth <= max_width;
		}
	};



	/**
	 * Modal helper
	 *
	 * @description modal layer using maginific-popup.js
	 *
	 * @version 1.0.0
	 * @since 2018-02-12
	 * @author STUDIO-JT (NICO)
	 * @requires jquery.magnific-popup.js
	 * @see {@link http://dimsemenov.com/plugins/magnific-popup/|magnific-popup API}
	 * @todo Nedd to be implement
	 *
	 */
	JT.modal = function(){
		//todo
	};


	/**
	 * Empty object will store all custom global of the site
	 *
	 * @description Sometime variables or functions need to be accessible globally.
	 * Use this object to store them, it avoid potentiel conflict with third party script.
	 * Please use this functionality with wisdom you avoid memory issue
	 *
	 * @version 1.0.0
	 * @since 2018-02-12
	 * @author STUDIO-JT (NICO)
	 *
	 * @example
	 * // Add global variable :
	 * JT.globals.my_var = 'somthing';
	 *
	 * // Add global fucntion :
	 * JT.globals.my_function = function(){
	 *   // alert('something')
	 * };
	 */
	JT.globals = {};




	/**
	 * Cookies helper
	 *
	 * @Crud your cookies
	 *
	 * @version 1.0.0
	 * @since 2019-04-04
	 * @author STUDIO-JT (NICO)
	 * @see {@link https://www.quirksmode.org/js/cookies.html}
	 *
	 * @example
	 * // Cookie 추가 (7일):
	 * JT.cookies.create('jt_my_cookie_id','Cookie 내용',7);
	 *
	 * // Cookie 일기
     * JT.cookies.read('jt_my_cookie_id');
	 *
	 * // Cookie 삭제
     * JT.cookies.destroy('jt_my_cookie_id');
	 */
	JT.cookies = {

		create : function(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},

		read : function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},

		destroy : function(name) {
			JT.cookies.create(name,"",-1);
		}

	};

	/**
	 * Check Webgl support helper
     *
	 * @version 1.0.0
	 * @since 2019-07-25
	 * @author STUDIO-JT (NICO)
	 *
	 * @example
     * // Add webgl class
	 * function add_no_webgl_class() {
	 *     if(!is_webgl_support()){
	 *        $('html').addClass('no_webgl');
	 *     }
	 * }
	 */
	JT.has_webgl = function () {
		try {
		    var canvas = document.createElement('canvas');
		    return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
		} catch(e) {
		    return false;
		}
	};




    /**
     * UI Helper
     *
     * @description UI 관련 함수 관리용 헬퍼
     *
     * @version 1.0.0
     * @since 2018-04-12
     * @author STUDIO-JT (201)
     *
     * @example
     * // 등록된 모든 함수 실행하기
     * JT.ui.init();
     *
     * @example
     * // 함수 등록하기
     * JT.ui.add( function () {
     *   // alert('something')
     * };
     * JT.ui.add( test_func );
     * function test_func () {
     *     // alert( 'somethid' );
     * };
     *
     * @example
     * // 함수 삭제하기
     * JT.ui.del( index );
     *
     * @example
     * // 인덱스를 통해 함수 가져오기
     * JT.ui.get( idx );
     *
     * @example
     * // 인덱스를 통해 함수 실행하기
     * JT.ui.call( idx );
     */
    JT.ui = {

        list: [],

		init: function () {

            for ( var i = 0; i < this.list.length; i++ ) {
                try {
                    if ( typeof this.list[ i ] === 'function' ) {
                        this.list[ i ].call();
                    }
                } catch ( e ) {
                    console.log( e );
                }
            }

        },

		add: function ( func, exec_flag ) {

            try {
                if ( typeof func === 'function' ) {
                    this.list.push( func );
                    if ( typeof exec_flag !== 'undefined' && exec_flag === true ) {
                        func.call();
                    }
                }

            } catch ( e ) {
                console.log( e );
            }

        },

		del: function ( idx ) {
            try {
                this.list.splice( parseInt( idx ), 1 );
            } catch ( e ) {
                console.log( e );
            }
        },

		replace: function ( idx, func ) {

            try {
                if ( typeof func === 'function' ) {
                    this.list[ idx ] = func;
                }
            } catch ( e ) {
                console.log( e );
            }

        },

		get: function ( idx ) {

            try {
                return this.list[ idx ];
            } catch ( e ) {
                console.log( e );
                return null;
            }

        },

		call: function ( idx ) {

            try {
                this.list[ idx ].call();
            } catch ( e ) {
                console.log( e );
            }

        }

    };


})(window, jQuery);
