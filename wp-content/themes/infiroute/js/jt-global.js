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
 * SNS ���� �˾�â�� �����մϴ�.
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
                href        : this.href,    // �ּ�
                title       : '',           // Ÿ��Ʋ
                width       : '600',        // { number } ������ â�� ���� ũ��
                height      : '600',        // { number } ������ â�� ���� ũ��
                top         : '0',          // { number } ������ â�� ��ǥ ����
                left        : '0',          // { number } ������ â�� ��ǥ ����
                status      : 'no',         // { yes | no | 1 | 0 } ���� ǥ�ù� ���̰ų� �����
                fullscreen  : 'no',         // { yes | no | 1 | 0 } ��ü â (�⺻���� no)
                channelmode : 'no',         // { yes | no | 1 | 0 } ä�θ�� F11 Ű ����̶� ����
                location    : 'no',         // { yes | no | 1 | 0 } �ּ�â (�⺻���� yes)
                menubar     : 'no',         // { yes | no | 1 | 0 } �޴��� (�⺻���� yes)
                toolbar     : 'no',         // { yes | no | 1 | 0 } ���� (�⺻���� yes)
                resizable   : 'yes',        // { yes | no | 1 | 0 } â (�⺻���� yes)
                scrollbars  : 'yes'         // { yes | no | 1 | 0 } â ��ũ�ѹ� (�⺻���� yes)
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
