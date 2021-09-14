/*
 * File       : js/inquiry.js
 * Author     : STUDIO-JT (MASON)
 * Guideline  : JTstyle.1.0
 *
 * SUMMARY:
 * 1) Global Variable
 */

jQuery( function ( $ ) {

	$( '.jt_ethics_popup' ).trigger('click');
	
	jt_board_comment_view();

	function jt_board_comment_view() {

		$('#comment').keyup(function (e){
			var content = $('#comment').val();
			$('#comment').height(((content.split('\n').length + 1) * 1.5) + 'em');
			$('.jt_comment_wordcounter').html(content.length + ' / 300');

			if (content.length > 300){

				alert("�ִ� 300�ڱ��� �Է� �����մϴ�.");
				$('#comment').val(content.substring(0, 300));
				$('.jt_comment_wordcounter').html("300 / 300");

			}
		  });

		  $('#comment').keyup();


		$( 'form#ethics_form' ).on('ifChecked', '[name="jt_board[option][report]"]', function(event){

				if ( $( this ).val() == "�͸�����") {

					$( 'span#jt_name' ).hide();
					$( 'span#jt_phone' ).hide();
					$( '.contact_row_result' ).hide();
//					$( 'span#jt_result' ).hide();
					$( 'input[name="jt_board[option][result]"]' ).iCheck('uncheck');


				} else {

					$( 'span#jt_name' ).show();
					$( 'span#jt_phone' ).show();
					$( '.contact_row_result' ).show();
//					$( 'span#jt_result' ).show();
					$( 'input[id="jt_board[option][result]"]' ).iCheck('check');

				}


		});

		$( 'form.jt_comment_form, form.jt_comment_form_edit' ).on( 'submit', function () {

			var $form   = $( this );
			var $target = $( 'textarea[name="jt_board_comment[comment]"]', $form );

			if ( $target.length == 0 || $target.val().trim().length == 0 ) {

				alert( '����� �Է����ּ���.' );
				if ( $target.length > 0 ) { $target.focus(); }
				return false;

			} else if ( $target.val().trim().length > 300 ) {

				alert( '����� 300�� �̳��� �ۼ��� �ּ���.' );
				if ( $target.length > 0 ) { $target.focus(); }
				return false;

			} else {

				var is_edit = $form.hasClass( 'jt_comment_form_edit' );

				if ( confirm( '����� ' + ( is_edit ? '����' : '���' ) + '�Ͻðڽ��ϱ�?' ) ) {

					$.post( jt_board.ajaxurl, $form.serialize(), function ( response ) {

						if ( response.success ) {

							alert( '����� ' + ( is_edit ? '����' : '���' ) + '�Ǿ����ϴ�' );
							location.reload();

						} else {

							alert( response.data ? response.data : '��� ' + ( is_edit ? '����' : '���' ) + ' �� ������ �߻��߽��ϴ�.' );

						}

					} );

				}

			}

			return false;
		});


		$( '.comment_modify' ).on( 'click', function () {

			var $this = $( this );
			var $wrap = $this.parents( '.jt_comment_item:first' );
			var $form = $( 'form.jt_comment_form_edit', $wrap );
			var $text = $( 'p.jt_admin_comment_text', $wrap );

			$text.fadeOut( 'slow', function () {

				$form.fadeIn( 'slow' );

			} );

			return false;

			} );


		$( '.btn_remove' ).on( 'click', function () {

			if ( confirm( '����� �����Ͻðڽ��ϱ�?' ) ) {

				var $this = $( this );
				var $wrap = $this.parents( '.jt_comment_item:first' );
				var $form = $( 'form.jt_comment_form_edit', $wrap );

				$( 'input[name="jt_board_comment[is_del]"]', $form ).val( 'Y' );

				$.post( jt_board.ajaxurl, $form.serialize(), function ( response ) {

					if ( response.success ) {

						alert( '����� �����Ǿ����ϴ�' );
						location.reload();

					} else {

						alert( response.data ? response.data : '��� ���� �� ������ �߻��߽��ϴ�.' );

					}

				} );

			}

			return false;

		} );

	}

    jt_board_confirm_proc();

    jt_validation_err();

    $( 'form#ethics_form' ).on( 'submit', function () {

        try {

            var $form     = $( this );
            var $target;
            var $err;
            var reg_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            var reg_phone = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
			var reg_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{9,16}/;

            $( 'span.jt_error_msg' ).hide();

            $target = $( 'input[name="jt_board[agree]"]:checked', $form );

            if ( $target.length == 0 || $target.val() != 'Y' ) {

                $target = $( 'input[name="jt_board[agree]"]', $form ).eq( 0 );
                // $err = jt_validation_err( $target, '�������� ���� �� �̿뿡 ���� ���Ǹ� üũ���ֽʽÿ�.', $err );

                JT.alert( '�������� ���� �� �̿뿡 ���� ���Ǹ� üũ�� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.offset().top - 200 }, 1000 );

                return false;

            }

            $target = $( 'input[name="jt_board[option][report]"]:checked', $form );
            if ( $target.length == 0 ) {

                $target = $( 'input[name="jt_board[option][report]"]', $form ).eq( 0 );
                // $err = jt_validation_err( $target, '��������� �������ֽʽÿ�.', $err );

                JT.alert( '��������� ������ �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            }

			$target = $( 'input:radio[name="jt_board[option][report]"]:checked', $form );

			if ( $target.val() != '�͸�����'){


				$target = $( 'input[name="jt_board[name]"]', $form );
				if ( $target.length == 0 || $target.val().trim().length == 0 ) {

					// $err = jt_validation_err( $target, '������ �Է����ֽʽÿ�.', $err );

					JT.alert( '������ �Է��� �ּ���.', function () { $target.focus(); } );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				}

				$target = $( 'input[name="jt_board[phone]"]', $form );
				//$target.val( $( 'input[name=field_tel_01]', $form ).val().trim() + '-' + $( 'input[name=field_tel_02]', $form ).val().trim() + '-' + $( 'input[name=field_tel_03]', $form ).val().trim() );
				$target.val( [ $( 'input[name=field_tel_01]', $form ).val().trim(), $( 'input[name=field_tel_02]', $form ).val().trim(), $( 'input[name=field_tel_03]', $form ).val().trim() ].join( '-' ).trim() );

				if ( $target.length == 0 || $target.val().trim().length == 0 || $target.val().trim() == '--' ) {

					// $err = jt_validation_err( $target, '����ó�� �Է����ֽʽÿ�.', $err );

					JT.alert( '����ó�� �Է��� �ּ���.', function () { $( 'input[name=field_tel_01]', $form ).focus(); } );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				} else if ( ! reg_phone.test( $target.val().trim() ) ) {

					// $err = jt_validation_err( $target, '����ó�� Ȯ�����ֽʽÿ�.', $err );

					JT.alert( '��ȿ�� ����ó�� �Է��� �ּ���.', function () { $( 'input[name=field_tel_01]', $form ).focus(); } );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				}

			}


            $target = $( 'input[name="jt_board[email]"]', $form );
            $target.val( [ $( 'input[name=field_mail_01]', $form ).val().trim(), $( 'input[name=field_mail_02]', $form ).val().trim() ].join( '@' ).trim() );
            if ( $target.length == 0 || $target.val().trim().length == 0 || $target.val().trim() == '@' ) {

                // $err = jt_validation_err( $target, '�̸����� �Է����ֽʽÿ�.', $err );

                JT.alert( '�̸����� �Է��� �ּ���.', function () { $( 'input[name=field_mail_01]', $form ).focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            } else if ( ! reg_email.test( $target.val().trim() ) ) {

                // $err = jt_validation_err( $target, '�̸����� Ȯ�����ֽʽÿ�.', $err );

                JT.alert( '��ȿ�� �̸����� �Է��� �ּ���.', function () { $( 'input[name=field_mail_01]', $form ).focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            }

            $target = $( 'input[name="jt_board[password]"]', $form );
            if ( $target.length == 0 || $target.val().trim().length == 0 ) {

                // $err = jt_validation_err( $target, '��й�ȣ�� �Է����ֽʽÿ�.', $err );

                JT.alert( '��й�ȣ�� �Է��� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            } else if ( $target.val().trim().length < 9 || $target.val().trim().length > 16 ) {

                // $err = jt_validation_err( $target, '��й�ȣ�� Ȯ�����ֽʽÿ�.', $err );

                JT.alert( '��ȿ�� ��й�ȣ�� �Է��� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            } else if ( ! reg_password.test( $target.val().trim() ) ) {

                JT.alert( '��ȿ�� ��й�ȣ�� �Է��� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            }

            $target = $( 'input[name="jt_board[password2]"]', $form );

            if ( $target.length == 0 || $target.val().trim().length == 0 ) {

                // $err = jt_validation_err( $target, '��й�ȣ�� �Է����ֽʽÿ�.', $err );

                JT.alert( '��й�ȣ�� �ѹ� �� �Է��� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            } else if ( $target.val().trim().length < 9 || $target.val().trim().length > 16 ) {

                // $err = jt_validation_err( $target, '��й�ȣ�� Ȯ�����ֽʽÿ�.', $err );

                JT.alert( '��ȿ�� ��й�ȣ�� �Է��� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            } else if ( ! reg_password.test( $target.val().trim() ) ) {

                JT.alert( '��ȿ�� ��й�ȣ�� �Է��� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            }

	        $target2 = $( 'input[name="jt_board[password]"]', $form );

			if ( $target.val() != $target2.val() ) {

                // $err = jt_validation_err( $target, '��й�ȣ�� Ȯ�����ֽʽÿ�.', $err );

                JT.alert( '��й�ȣ�� ��ġ���� �ʽ��ϴ�.', function () { $target2.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

			}

            $target = $( 'input[name="jt_board[title]"]', $form );
            if ( $target.length == 0 || $target.val().trim().length == 0 ) {

                // $err = jt_validation_err( $target, '������ �Է����ֽʽÿ�.', $err );

                JT.alert( '������ �Է��� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            }

            $target = $( 'textarea[name="jt_board[content]"]', $form );
            if ( $target.length == 0 || $target.val().trim().length == 0 ) {

                // $err = jt_validation_err( $target, '������ �Է����ֽʽÿ�.', $err );

                JT.alert( '������ �Է��� �ּ���.', function () { $target.focus(); } );
                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

                return false;

            }


            var file_cnt = 0;
            var file_ext = $( 'input[name="jt_board_file_ext"]', $form ).val();
            var option_file_size = $( 'input[name="jt_board_file_size"]', $form ).val();
            var option_file_count = $( 'input[name="jt_board_file_count"]', $form ).val();
            var file_error  = false;

            $( 'input[type=file][name="jt_board[]"]', $form ).each( function () {

                $target = $( this );
                if ( $target.val().length > 0 ) {

                    file_cnt++;

                    var arr_ext = $target.val();
                    var ext     = $target.val().split('.').pop().toLocaleLowerCase();

                    if ( file_ext.indexOf( ext ) < 0 ) {

                        // $err = jt_validation_err( $target, '������' +  file_ext + '������ ���ϸ� �����մϴ�.', $err );

                        JT.alert( '�߸��� ���� �����Դϴ�.' );
                        $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );
                        file_error = true;

                        return false;

                    } else {

                        try {

                            var file_size = $target.get( 0 ).files[ 0 ].size || $target.get( 0 ).files[ 0 ].fileSize;

                            if ( file_size > ( option_file_size * 1024 * 1024 ) ) {

                                // $err = jt_validation_err( $target, '����÷�δ� ' + option_file_size + ' MB������ ���ϸ� �����մϴ�.', $err );

                                JT.alert( '����÷�δ� ' + option_file_size + ' MB������ ���ϸ� �����մϴ�.' );
                                $( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );
                                file_error = true;

                                return false;

                            }

                        } catch( e ) {

                            console.log( e );
                            return false;


                        }

                    }

                }

            } );

            if ( file_error ) {

                return false;

            }

            if ( option_file_count  > 0 ) {

                if ( ( file_cnt + $( 'input[name="jt_board[del_file][]"]:disabled' ).length ) > parseInt( option_file_count ) ) {

                    // $err = jt_validation_err( $( 'input[type=file][name="jt_board[]"]:last', $form ), '����÷�δ� �ִ� ' + option_file_count + '���� �����մϴ�.', $err );

                    JT.alert( '����÷�δ� �ִ� ' + option_file_count + '���� �����մϴ�.' );
                    $( 'body,html' ).animate( { scrollTop: $( 'input[type=file][name="jt_board[]"]:last', $form ).closest( '.form_content' ).offset().top - 200 }, 1000 );

                    return false;

                }

            }

			$target = $( 'input:radio[name="jt_board[option][report]"]:checked', $form );

			if ( $target.val() != '�͸�����'){

				$target = $( 'input[name="jt_board[option][result]"]:checked', $form );
				if ( $target.length == 0 ) {

					$target = $( 'input[name="jt_board[option][result]"]', $form ).eq( 0 );
					// $err = jt_validation_err( $target, '����뺸 ��û�� �������ֽʽÿ�.', $err );

					JT.alert( '����뺸 ��û�� ������ �ּ���.' );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				}

			}

            if ( $err && 0 ) {

            //$( 'html,body' ).stop().animate( { scrollTop : ( $err.offset().top - 100 ) }, 500, 'swing' );
            //return false;
            $( 'body,html' ).animate( {
                    scrollTop: $err.offset().top - 200
                }, 1000 );

                return false;

            }

            $form.attr( 'target', 'ifrmInquiry' );
			$('.btn_ethics_result').prop('disabled', true );

            return true;

        } catch ( e ) {

            console.log( e );
            return false;

        }

        // return true;

    } );

    function jt_validation_err( $target, msg, $err ) {

        try {

            // ex) <span class="jt_error_msg">�������� ���� �� �̿뿡 ���� ���Ǹ� �������ֽʽÿ�.</span>
            $target = $( $target );

            var $wrapper = $target.parents( 'div.form_control_wrap:first' );

            if ( $target.attr( 'name' ) == 'jt_board[agree]' ) {

                $wrapper = $target.parents( 'div.jt_agree_check:first' );

            } else if ( $target.attr( 'type' ) == 'radio' ) {

                $wrapper = $target.parents( 'div.jt_radio_wrap:first' );

            }

            var $msg = $( 'span.jt_error_msg', $wrapper );

            if ( $msg.length == 0 ) {

                $msg = $( '<span />', { class: 'jt_error_msg' } ).appendTo( $wrapper );

            }

            $msg.text( msg ).show();

            return ( ! $err ? $wrapper : $err );

        } catch ( e ) {

            console.log( e );
            return $err;

        }

    }


    function jt_board_confirm_proc() {

        $( document ).on( 'submit', '#frm_ethics_confirm', function () {

            var $form   = $( this );
            var url     = $form.data( 'ajax' );
            var data    = $form.serialize();

            $.post( url, data, function ( res ) {

                if ( res.success ) {

                    // barba.go( res.data );
					location.href = res.data;


                } else {

                    JT.alert( res.data );

                }

            } );

            return false;

        } );

    }



} );
