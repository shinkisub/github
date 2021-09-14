jQuery( function ( $ ) {
JT.ui.add( subscribe_form, true );
JT.ui.add( unsubscribe_form, true );
	

	function subscribe_form () {

		$( 'form#subscribe_form' ).on( 'submit', function () {


			try {

				var $form     = $( this );
				var $target   = null;
				var $err      = null;
				var reg_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
				var reg_phone = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

				$( 'span.jt_error_msg' ).hide();

				$target = $( 'select[name="jt_report[affiliate]"]', $form );
				if ( $target.length == 0 || $target.val().trim().length == 0 ) {

	//                $err = jt_report_validation_err( $target, '�Ҽ��� �������ֽʽÿ�.', $err );

					JT.alert( '�Ҽ��� ������ �ּ���.' );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				}
				


				$target = $( 'input[name="jt_report[email]"]', $form );
				$target.val( [ $( 'input[name=field_mail_01]', $form ).val().trim(), $( 'input[name=field_mail_02]', $form ).val().trim() ].join( '@' ).trim() );
				if ( $target.length == 0 || $target.val().trim().length == 0 || $target.val().trim() == '@' ) {

					//$err = jt_report_validation_err( $target, '�̸����� �Է����ֽʽÿ�.', $err );
					JT.alert( '�̸����� �Է��� �ּ���.' );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				} else if ( ! reg_email.test( $target.val().trim() ) ) {

	//                $err = jt_report_validation_err( $target, '�̸����� Ȯ�����ֽʽÿ�.', $err );
					JT.alert( '�̸����� Ȯ���� �ּ���.' );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				}

				$target = $( 'input[name="jt_report[subscription]"]:checked', $form );

				if ( $target.length == 0 || $target.val() != 'Y' ) {

					$target = $( 'input[name="jt_report[subscription]"]', $form ).eq( 0 );
	//                $err = jt_report_validation_err( $target, '�������� ���� �� �̿뿡 ���� ���Ǹ� üũ���ֽʽÿ�.', $err );

					JT.alert( '�������� ���� �� �̿뿡 ���� ���Ǹ� üũ�� �ּ���.' );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;
					
				}
				
				if ( $err ) {

					$( 'body,html' ).animate( {
						scrollTop: $err.offset().top - 200
					}, 1000 );


					return false;

				}

				$form.attr( 'target', 'ifrmInquiry' );

				return true;

				} catch ( e ) {

				console.log( e );
				return false;

				}

				// return true;
		} );

		function jt_report_validation_err( $target, msg, $err ) {

			try {

				// ex) <span class="jt_error_msg">�������� ���� �� �̿뿡 ���� ���Ǹ� �������ֽʽÿ�.</span>

				var $wrapper = $target.parents( 'div.form_control_wrap:first' );

				if ( $target.attr( 'name' ) == 'jt_report[subscription]' ) {

					$wrapper = $target.parents( 'div.jt_agree_check:first' );

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

	}

	function unsubscribe_form (){ 

		$( 'form#unsubscribe_form' ).on( 'submit', function () {


			try {

				var $form     = $( this );
				var $target   = null;
				var $err      = null;
				var reg_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
				var reg_phone = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

				$( 'span.jt_error_msg' ).hide();

				$target = $( 'input[name="jt_report[email]"]', $form );
				$target.val( [ $( 'input[name=field_mail_01]', $form ).val().trim(), $( 'input[name=field_mail_02]', $form ).val().trim() ].join( '@' ).trim() );
				if ( $target.length == 0 || $target.val().trim().length == 0 || $target.val().trim() == '@' ) {

	//                $err = jt_validation_err( $target, '�̸����� �Է����ֽʽÿ�.', $err );
					JT.alert( '�̸����� �Է��� �ּ���.' );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				} else if ( ! reg_email.test( $target.val().trim() ) ) {

	//                $err = jt_validation_err( $target, '�̸����� Ȯ�����ֽʽÿ�.', $err );
					JT.alert( '�̸����� Ȯ���� �ּ���.' );
					$( 'body,html' ).animate( { scrollTop: $target.closest( '.form_content' ).offset().top - 200 }, 1000 );

					return false;

				}
				
				if ( $err ) {

					$( 'body,html' ).animate( {
						scrollTop: $err.offset().top - 200
					}, 1000 );

					return false;

				}

				$form.attr( 'target', 'ifrmInquiry' );

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

				var $wrapper = $target.parents( 'div.form_control_wrap:first' );

				if ( $target.attr( 'name' ) == 'jt_report[agree]' ) {

					$wrapper = $target.parents( 'div.jt_agree_check:first' );

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

	}

} );