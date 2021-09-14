/*
 * File       : js/ad-inquiry.js
 * Author     : STUDIO-JT (201)
 * Guideline  : JTstyle.1.0
 *
 * SUMMARY:
 * 1) Global Variable
 */

jQuery( function ( $ ) {

    var $container = $( '.ad_inquiry_container' );

    if ( $container.length > 0 ) {

        ad_inquiry_click_action();
        ad_inquiry_form_submit();
		ad_scroll_sniff_action();

        // History Back 대응
        if ( $( '[name="ad_inquiry[type]"]' ).val() ) {

            var tmp_type = $( '[name="ad_inquiry[type]"]' ).val();

            if ( tmp_type.indexOf( 'ad' ) >= 0 ) {

                $( 'a[data-answer="type_ad"]' ).trigger( 'click' );


            } else if ( tmp_type.indexOf( 'af' ) >= 0 ) {

                $( 'a[data-answer="type_affiliate"]' ).trigger( 'click' );

            }

            $( 'a[data-answer="' + tmp_type + '"]' ).trigger( 'click' );


        }



        function ad_inquiry_click_action() {

            $container.on( 'click', '.ad_inquiry_confirm_btn_wrap a.modal_close', function () {

                var target = ( window.parent ? window.parent : window );

                target.$( '#ad_modal_close_btn' ).trigger( 'click' );
                target.$( '#ad_modal_frame' ).attr( 'src', location.pathname + '?iframe' );

                return false;

            } );

            $container.on( 'ifChanged', 'input.jt_icheck', function () {

                var $this   = $( this );
                var name    = $this.attr( 'name' );

                if ( $this.attr( 'type' ) == 'checkbox' ) {

                var cnt     = $( 'input[name="' + name + '"]:checked' ).length;

                    if ( cnt > 2 ) {

                        JT.alert( {
                            message     : '최대 2개 선택 가능합니다.',
                            on_confirm  : function () {

                                            $this.iCheck( 'uncheck' );

                                        }
                        } );
                        return false;

                    }

                }

                var etc = $this.data( 'etc' );

                if ( etc ) {

                    var $etc = $( 'input[name="' + etc + '"]' );

                    $etc.prop( 'disabled', ! $this.prop( 'checked' ) );

                    if ( $this.prop( 'checked' ) ) {

                        $etc.closest( '.jt_icheck_other_wrap' ).fadeIn( 'fast', function () { $etc.focus(); } );

                    } else {

                        $etc.closest( '.jt_icheck_other_wrap' ).fadeOut( 'fast', function () { $etc.focus(); } );

                    }

                }

            } );

            $container.on( 'click', '.ad_inquiry_btn_wrap a', function () {

                var $this   = $( this );
                var step    = parseInt( $this.data( 'step' ) );
                var answer  = $this.data( 'answer' );

                var $target = $( '#' + answer );

				$('.ad_inquiry_container').attr('data-current-step',step);

                $( '[name="ad_inquiry[step' + step + ']"]' ).val( $this.find( 'span' ).text() );

                if ( step == 2 ) {

                    $( '[name="ad_inquiry[type]"]' ).val( answer );

                }

                $this.closest( '.ad_inquiry_btn_wrap' ).find( 'a.active' ).removeClass( 'active' );
                $this.addClass( 'active' );

                // 기존 노출된 항목들 숨김 처리
                $( '.ad_inquiry_step_' + pad( step + 1, 2 ) ).hide();
                $( '.ad_inquiry_form' ).hide();
                $( '.ad_inquiry_contact' ).hide();

                if ( $target.length > 0 ) {

                    $target.find( '.ad_inquiry_btn_wrap a' ).removeClass( 'active' );
                    $target.fadeIn( 'slow' );

                    if ( step == 2 ) {

                        $( '.ad_inquiry_contact' ).fadeIn( 'slow' );

                    }

                    /*
					$("html, body").stop().animate({
                        scrollTop: $this.offset().top - 120
                    }, 600);
					*/
					
					// Scroll on click
					var scroll_offset = 360;					
				    var width_w = $(window).width();
					
					// start a rwd wtf logic
					if(width_w < 480){
						scroll_offset = 130;
					}					
					
					if(answer === "type_affiliate"){
						if(width_w < 480){
							scroll_offset = 190;
						}					
					}else if(answer === "ad_domestic" || answer === "ad_overseas"){
						if(width_w < 480){
							if(answer === "ad_overseas"){
								scroll_offset = 196;								
							}else{
							    scroll_offset = 140;	
							}								
						}else if(width_w < 1280){
						    scroll_offset = 150;
						}else{						    
							scroll_offset = 125;
							
						}
				    }else if(answer === "affilliate_ooh" ||answer === "affilliate_platform" || answer === "affilliate_online"  ){
						if(width_w < 480){							
							if(answer === "affilliate_ooh"){
							    scroll_offset = 399; 
							}else if(answer === "affilliate_platform"){
								scroll_offset = 339;
							}else{
							    scroll_offset = 280;
						    }
						}else if(width_w < 1280){
							scroll_offset = 240;						
						}else{
						    scroll_offset = 195;
						}
					}
					
					var scroll_target_top =  $this.offset().top - scroll_offset;
					
					gsap.to($('html, body'), {duration: 1.2, scrollTo: {y: scroll_target_top}, ease:"power3.out"});
					

                }

                return false;

            } );

            $container.on( 'change', 'input[type=file]', function () {

                var $this   = $( this );
                var file    = $this.val();
                var ext     = file.split( '.' ).pop().toLowerCase();
                var arr_ext = $this.data( 'ext' ).split( ',' );
				
                if ( file.length > 0 && arr_ext.indexOf( ext ) < 0 ) {

                    JT.alert( {
                        message : '허용되지 않은 파일 형식입니다.',
                        on_confirm  : function () {

                                        $this.val( '' ).trigger( 'change' );

                                    }
                    } );

                }

            } );

        }



        function ad_inquiry_form_submit() {

            $container.on( 'submit', '#frm_ad_inquiry', function () {

				try {

                var $form       = $( this );
                var reg_phone   = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
                var reg_email   = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
                var $target, type;

                $target = $( '[name="ad_inquiry[step1]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '문의 주실 서비스 유형을 선택해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

                $target = $( '[name="ad_inquiry[step2]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : ( $( '.ad_inquiry_step_01 a.active' ).data( 'answer' ) != 'type_ad' ? '제휴 문의하고 싶으신 매체를 선택해 주세요.' : '광고 집행 대상을 선택해 주세요.' ),
                        on_confirm  : function () { error_scroll( $( '.ad_inquiry_step_02:visible' ) ); }
                    } );

                    return false;

                }

                $target = $( '[name="ad_inquiry[type]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : ( $( '.ad_inquiry_step_01 a.active' ).data( 'answer' ) != 'type_ad' ? '제휴 문의하고 싶으신 매체를 선택해 주세요.' : '광고 집행 대상을 선택 해주세요.' ),
                        on_confirm  : function () { error_scroll( $( '.ad_inquiry_step_02:visible' ) ); }
                    } );

                    return false;

                }

                type = $target.val();

                if ( type == 'ad_domestic' ) {

                    $target = $( '[name="ad_inquiry[ad_domestic][step3]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '광고주/브랜드명을 입력해주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_domestic][step4][]"]', $form );
                    if ( ! check_validation( $target, { max_cnt: 2 } ) ) {

                        JT.alert( {
                            message     : '캠페인을 통해 어떤 성과를 얻고 싶으신지 선택해 주세요. (최대 2개 선택 가능합니다. )',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_domestic][step5]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '집행을 고려하고 있는 매체를 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_domestic][step6]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '캠페인 예산 규모를 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_domestic][step7]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '캠페인 예상 시기를 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                } else if ( type == 'ad_overseas' ) {

                    $target = $( '[name="ad_inquiry[ad_overseas][step3]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '광고주/브랜드명을 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_overseas][step4][]"]', $form );
                    if ( ! check_validation( $target, { max_cnt: 2 } ) ) {

                        JT.alert( {
                            message     : '캠페인을 통해 어떤 성과를 얻고 싶으신지 선택해 주세요. (최대 2개 선택 가능합니다. )',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_overseas][step5]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '주요 타깃 국가를 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_overseas][step6][]"]', $form );
                    if ( ! check_validation( $target, { max_cnt: 2 } ) ) {

                        JT.alert( {
                            message     : '집행을 고려하는 매체를 선택해 주세요. (최대 2개 선택 가능합니다. )',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_overseas][step7]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '캠페인 예산 규모를 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[ad_overseas][step8]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '캠페인 예상 시기를 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                } else if ( type == 'affilliate_online' ) {

                    $target = $( '[name="ad_inquiry[affilliate_online][step3]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '제휴 원하시는 매체명을 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[affilliate_online][step4]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '매체에 대한 소개를 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[affilliate_online][step5]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '매체 URL 혹은 앱스토어 정보를 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[affilliate_online][step6]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '매체 내 광고 상품을 보유하고 있으신지 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                } else if ( type == 'affilliate_platform' ) {

                    $target = $( '[name="ad_inquiry[affilliate_platform][step3]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '제휴 원하시는 매체명을 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[affilliate_platform][step4]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '매체에 대한 소개를 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[affilliate_platform][step5]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '메체 URL 혹은 앱스토어 정보를 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[affilliate_platform][step6]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '매체 내 광고 상품의 과금 유형을 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[affilliate_platform][step7]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '매체 연동 유형을 선택해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                } else if ( type == 'affilliate_ooh' ) {

                    $target = $( '[name="ad_inquiry[affilliate_ooh][step3]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '제휴 원하시는 매체명을 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                    $target = $( '[name="ad_inquiry[affilliate_ooh][step4]"]', $form );
                    if ( ! check_validation( $target ) ) {

                        JT.alert( {
                            message     : '매체에 대한 소개를 입력해 주세요.',
                            on_confirm  : function () { error_scroll( $target ); }
                        } );

                        return false;

                    }

                }

                $target = $( '[name="ad_inquiry[contact][name]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '이름을 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

                $target = $( '[name="ad_inquiry[contact][phone]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '연락처를 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

                if ( ! reg_phone.test( $target.val().trim() ) ) {

                    JT.alert( {
                        message     : '유효한 연락처를 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ) }
                    } );

                    return false;

                }

                var tmp_email = '';
                $target = $( '[name="ad_inquiry[contact][mail_id]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '이메일을 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

                tmp_email = $target.val().trim();

                $target = $( '[name="ad_inquiry[contact][mail_domain]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '이메일을 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }
                tmp_email += '@' + $target.val().trim();

                if ( ! reg_email.test( tmp_email ) ) {

                    JT.alert( {
                        message     : '유효한 이메일을 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

                $target = $( '[name="ad_inquiry[contact][company]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '회사명을 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

                $target = $( '[name="ad_inquiry[contact][group]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '부서를 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

                $target = $( '[name="ad_inquiry[contact][rank]"]', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '직함을 입력해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

                $target = $( '[name="ad_inquiry[contact][agree]"', $form );
                if ( ! check_validation( $target ) ) {

                    JT.alert( {
                        message     : '개인정보 수집 및 이용에 동의해 주세요.',
                        on_confirm  : function () { error_scroll( $target ); }
                    } );

                    return false;

                }

				$('.btn_ad_inquiry_result').prop('disabled', true );
                return true;

				} catch ( e ) {

					console.log( e );
					return false;

				}

            } );

        }



        function pad( n, width ) {

            n = ( parseInt( n ) ? parseInt( n ) : 0 ) + '';
            return n.length >= width ? n : new Array( width - n.length + 1 ).join( '0' ) + n;

        }



        function check_validation( target, args ) {

            try {

                var $target = $( target );
                var tagName = $target.prop( 'tagName' ).toLowerCase();
                var type    = $target.attr( 'type' );

                args = ( typeof args !== 'undefined' ? args : {} );

                if ( ( tagName == 'input' && ( type == 'text' || type == 'hidden' ) ) || tagName == 'textarea' ) {

                    if ( $target.length == 0 || $target.val().trim().length == 0 ) {

                        return false;

                    } else if ( typeof args.regex !== 'undefined' && ! args.regex.test( $target.val() ) ) {

                        return false;

                    }

                } else if ( tagName == 'input' && type == 'checkbox' ) {

                    var cnt = 0;
                    $target.each( function () {

                        if ( $( this ).is( ':checked' ) ) {

                            cnt++;

                        }

                    } );

                    if ( typeof args.max_cnt !== 'undefined' && cnt > args.max_cnt ) {

                        return false;

                    } else if ( cnt == 0 ) {

                        return false;

                    }

                } else if ( tagName == 'input' && type == 'radio' ) {

                    var cnt = 0;
                    $target.each( function () {

                        if ( $( this ).is( ':checked' ) ) {

                            cnt++;

                        }

                    } );

                    if ( cnt != 1 ) {

                        return false;

                    }


                }

                return true;

            } catch( e ) {

                console.log( e );
                return false;

            }

        }



        function error_scroll( target ) {

            var $target = $( target );
            var offset  = 130;
            var $wrap   = ( $target.closest( '.ad_inquiry_data' ).length > 0 ? $target.closest( '.ad_inquiry_data' ) : $target );

            $( 'body, html' ).stop().animate( {
                scrollTop: ( $wrap.offset().top ) - offset
            } );

        }

    }


	function scroll_sniff() {

        if ($(window).scrollTop() > 200) {
            $('body').removeClass('ad_force_show_title');
        } else {
            $('body').addClass('ad_force_show_title');
        }

    };

	function ad_scroll_sniff_action() {

        $(window).on('scroll', scroll_sniff);

    };

} );
