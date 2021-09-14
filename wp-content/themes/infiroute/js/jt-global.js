/*
 * File       : js/jt-global.js
 * Author     : STUDIO-JT (KMS)
 * Guideline  : JTstyle.1.0
 *
 * SUMMARY:
 * 1) INIT
 * 2) Functions
 */



jQuery(function($) {



/* **************************************** *
 * INIT
 * **************************************** */
JT.ui.add( sns_popup_init, true );
JT.ui.add( share_clipboard, true );
JT.ui.add( share_kakao, true );



/* **************************************** *
 * Functions
 * **************************************** */
/**
 * SNS 공유 팝업창을 생성합니다.
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (Jun)
 */
function sns_popup_init(){

    // SNS POPUP
    $('.jt_share_sns').each(function(){

        var element = this;
        var $element = $(element);

        $element.on('click', function(e){

            // return kakao share
            if($(this).hasClass('jt_share_kakao') || $(this).hasClass('jt_share_link')) { return; }

            e.preventDefault();
			e.stopPropagation();

            // OPTIONS
            var options = {
                href        : this.href,    // 주소
                title       : '',           // 타이틀
                width       : '600',        // { number } 열리는 창의 가로 크기
                height      : '600',        // { number } 열리는 창의 세로 크기
                top         : '0',          // { number } 열리는 창의 좌표 위쪽
                left        : '0',          // { number } 열리는 창의 좌표 왼쪽
                status      : 'no',         // { yes | no | 1 | 0 } 상태 표시바 보이거나 숨기기
                fullscreen  : 'no',         // { yes | no | 1 | 0 } 전체 창 (기본값은 no)
                channelmode : 'no',         // { yes | no | 1 | 0 } 채널모드 F11 키 기능이랑 같음
                location    : 'no',         // { yes | no | 1 | 0 } 주소창 (기본값은 yes)
                menubar     : 'no',         // { yes | no | 1 | 0 } 메뉴바 (기본값은 yes)
                toolbar     : 'no',         // { yes | no | 1 | 0 } 툴바 (기본값은 yes)
                resizable   : 'yes',        // { yes | no | 1 | 0 } 창 (기본값은 yes)
                scrollbars  : 'yes'         // { yes | no | 1 | 0 } 창 스크롤바 (기본값은 yes)
            };

            // ALIGN CENTER
            var align_center = {
                top : Math.round(($(window).height() / 2) - (options.height / 2)),
                left : Math.round(($(window).width() / 2) - (options.width / 2))
            };

            // WINDOW OPEN
            window.open(''+ options.href +'',''+ options.title +'','width='+ options.width +',height='+ options.height +',top='+ align_center.top +',left='+ align_center.left +',status='+ options.status +',fullscreen='+ options.fullscreen +', channelmode='+ options.channelmode+', location='+ options.location+', menubar='+ options.menubar +', toolbar='+ options.toolbar +', resizable='+ options.resizable +', scrollbars='+ options.scrollbars +'');

        });

    });

}



// clipboard
function share_clipboard(){

    $('.jt_share_link').each(function(){

        if(typeof Clipboard != "undefined"){

			var $this = $(this);
            var clipboard = new Clipboard($this[0]);
			var $clipboard_tooltip = $this.closest('.jt_share').next();
            
			$clipboard_tooltip.appendTo('.main_container');
			
            $this.on('click', function(e){

                e.preventDefault();
				e.stopPropagation();

                clipboard.on('success', function(e) {

                    e.clearSelection();
					TweenMax.fromTo($clipboard_tooltip, 0.2, {autoAlpha: 0}, {autoAlpha: 1});

					setTimeout(function(){

						TweenMax.fromTo($clipboard_tooltip, 0.2, {autoAlpha: 1}, {autoAlpha: 0});

					}, 3000);

                });

                clipboard.on('error', function(e) {

					// err

                });

            });

        }else{

			// not support

        }

    }); // end each

}



// kakao share
function share_kakao(){

	if ( $('.jt_share_kakao').length <= 0  ) return;

	/* Kakao */
	if(typeof Kakao == 'undefined'){

		$.getScript('//developers.kakao.com/sdk/js/kakao.min.js',function(){
			Kakao.init("a8ed4c2492d06368731d9d85a1e2e91e");
			run_kakao()
		});

	}else{
		run_kakao();
	}


	function run_kakao(){
		try {

			function kakaoDynamicShare(el){
				var $this = jQuery(el);

				Kakao.Link.sendCustom({
					templateId: 20443,
					templateArgs: {
						'title': $this.data('title'),
						'description': $this.data('description'),
						'param': $this.data('param'),
						'image': $this.data('image')
					},
					installTalk: true
				});
			}


			var $target = $('#kakao-link-btn');
// console.log( { 'title': $target.data('title'),'description': $target.data('description'),  'param': $target.data('param'), 'image': $target.data('image') } );	return false;
			Kakao.Link.createCustomButton({
				container: '#kakao-link-btn',
				templateId: 20443,
				templateArgs: {
					'title': $target.data('title'),
					'description': $target.data('description'),
					'param': $target.data('param'),
					'image': $target.data('image')
				},
				installTalk: true
			});


		} catch ( e ) {
			console.log( e );
		}

	}

}



}); // End jQuery
