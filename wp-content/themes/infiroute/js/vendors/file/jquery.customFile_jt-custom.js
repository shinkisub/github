//Reference:
//http://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
;(function($) {

		  // Browser supports HTML5 multiple file?
		  var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
		      isIE = /msie/i.test( navigator.userAgent );

		  $.fn.customFile = function(option) {

		    return this.each(function() {

		      // add kms : 스타일 제어를 위한 옵션 및 텍스트 추가
			  var input_placeholder = (option.input_placeholder !== undefined) ? 'placeholder="'+ option.input_placeholder +'" ' : '';
			  var input_class = (option.input_class !== undefined) ? option.input_class : '';
			  var btn_class = (option.btn_class !== undefined) ? option.btn_class : '';
			  var btn_text = (option.btn_text !== undefined) ? option.btn_text : 'Select a File';
			  var remove_btn_class = (option.remove_btn_class !== undefined) ? option.remove_btn_class : '';
			  var remove_btn_text = (option.remove_btn_text !== undefined) ? option.remove_btn_text : 'Delete a File';

		      var $file = $(this).addClass('jt_file_upload_hidden'), // the original file input
		          $wrap = $('<div class="jt_file_upload_wrapper">'),
		          $input = $('<input type="text" class="jt_file_upload_input '+ input_class +'" '+ input_placeholder +' readonly />'),
		          // Button that will be used in non-IE browsers
		          $button = $('<button type="button" class="jt_file_btn jt_file_upload_button '+ btn_class +'">'+ btn_text +'</button>'),
		          // Hack for IE
		          $label = $('<label class="jt_file_btn jt_file_upload_button '+ btn_class +'" for="'+ $file[0].id +'">'+ btn_text +'</label>'),
				  $delet = $('<button class="jt_file_btn jt_file_upload_delete '+ remove_btn_class +'">'+ remove_btn_text +'</button>'); // add kms : 파일 삭제 추가

		      // Hide by shifting to the left so we
		      // can still trigger events
		      $file.css({
		        position: 'absolute',
		        left: '-9999px'
		      });

		      $wrap.insertAfter( $file )
		        .append( $file, $input, ( isIE ? $label : $button ), $delet );

		      // Prevent focus
		      $file.attr('tabIndex', -1);
		      $button.attr('tabIndex', -1);
			  $input.attr('tabIndex', -1); // add kms : auto focus 제거

		      $button.click(function () {
		        $file.focus().click(); // Open dialog
		      });

			  $delet.on('click',function(e){
				e.preventDefault();
				$('.jt_file_upload_hidden').val('');
          		$('.jt_file_upload_input').val('');
			  });

		      $file.change(function() {

		        var files = [], fileArr, filename;

		        // If multiple is supported then extract
		        // all filenames from the file array
		        if ( multipleSupport ) {
		          fileArr = $file[0].files;
		          for ( var i = 0, len = fileArr.length; i < len; i++ ) {
		            files.push( fileArr[i].name );
		          }
		          filename = files.join(', ');

		        // If not supported then just take the value
		        // and remove the path to just show the filename
		        } else {
		          filename = $file.val().split('\\').pop();
		        }

		        $input.val( filename ) // Set the value
		          .attr('title', filename); // Show filename in title tootlip

				  // remove kms : input 포커스 제거
		          //.focus(); // Regain focus
		      });

		      $input.on({

				// add kms : input focus시 텍스트 입력 대신 dialog 호출
				focus: function(){ $file.focus().click(); }

				// remove kms : input을 dialog로 대체함에따라 키보드 이벤트 삭제
				/*
				blur: function() { $file.trigger('blur'); },
		        keydown: function( e ) {
		          if ( e.which === 13 ) { // Enter
		            if ( !isIE ) { $file.trigger('click'); }
		          } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
		            // On some browsers the value is read-only
		            // with this trick we remove the old input and add
		            // a clean clone with all the original events attached
		            $file.replaceWith( $file = $file.clone( true ) );
		            $file.trigger('change');
		            $input.val('');
		          } else if ( e.which === 9 ){ // TAB
		            return;
		          } else { // All other keys
		            return false;
		          }
		        }
				*/

		      });

		    });

		  };

		  // Old browser fallback
		  if ( !multipleSupport ) {
		    $( document ).on('change', 'input.customfile', function() {

		      var $this = $(this),
		          // Create a unique ID so we
		          // can attach the label to the input
		          uniqId = 'customfile_'+ (new Date()).getTime(),
		          $wrap = $this.parent(),

		          // Filter empty input
		          $inputs = $wrap.siblings().find('.jt_file_upload_input')
		            .filter(function(){ return !this.value }),

		          $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

		      // 1ms timeout so it runs after all other events
		      // that modify the value have triggered
		      setTimeout(function() {
		        // Add a new input
		        if ( $this.val() ) {
		          // Check for empty fields to prevent
		          // creating new inputs when changing files
		          if ( !$inputs.length ) {
		            $wrap.after( $file );
		            $file.customFile();
		          }
		        // Remove and reorganize inputs
		        } else {
		          $inputs.parent().remove();
		          // Move the input so it's always last on the list
		          $wrap.appendTo( $wrap.parent() );
		          $wrap.find('input').focus();
		        }
		      }, 1);

		    });
		  }

}(jQuery));
