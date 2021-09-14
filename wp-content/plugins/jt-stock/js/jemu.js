jQuery(function($){

JT.ui.add( financial_button_event, true );

function selectric_init() {

    $('.jt_selectric').selectric({
        disableOnMobile: true,
		maxHeight: 320
    });

}


function financial_button_event () {

	$( '.financial_data_wrap' ).on( 'click', '#year_btn', function () {

		$( '#part_btn' ).removeClass( 'active' );
		$( this ).addClass( 'active' );

		$( '#type' ).val( 'year' );
		$( '#year_data' ).val();
		finacial_submit();
        
		return false;

	} );
	$( '.financial_data_wrap' ).on( 'click', '#part_btn', function () {

        $('.financial_table').spidochescaler('load');

		$( '#year_btn' ).removeClass( 'active' );
		$( this ).addClass( 'active' );

		$( '#type' ).val('part');
		$( '#year_data' ).val();
		finacial_submit();

		return false;

	} );



	$( '.financial_data_wrap' ).on('change', '#finacial_select', function() {


		$( "#year_data" ).val( $( this ).val() );
		$( '#type' ).val();

		finacial_submit();
		return false;

	});

}

function finacial_submit() {

    
    var $form = $( '#finacial_form' );
    var data  = $form.serialize();
    var url= "/투자정보/재무정보/";
    
    $.get( url , data, function ( res ) {
        
        var $res = $( res );
        
        var $target = $( $( '.financial_data_wrap' , $res ).html() );

        $( '.financial_data_wrap' ).html( $target );

		if ('history' in window && 'pushState' in history) {
			window.history.pushState(null, null, url + '?' + data);
		}
		// scroll top
		$('html,body').animate({
			scrollTop : ($('.financial_data_wrap').offset().top) - ($('#header').height() * 2)
		});

        //financial_chart_init();
        selectric_init();

        $('.financial_table').spidochescaler({ maxWidth: 500 });


    });

    return false; 

    $form.submit();

}

}); // END jQuery