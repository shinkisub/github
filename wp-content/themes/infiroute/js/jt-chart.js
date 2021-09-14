(function($){

    $.fn.jtChart = function(options){
        
        // Set the option
        var settings = $.extend({
            labels: '',
            data: '',
            title: ''
        }, options);

        // Stop the script here if empty data
        if(settings.data==''){
            console.log('insert chart data -');
            return;
        }

        return this.each(function(){
            

            var $this = $(this);
            var data = settings.data;
            var labels = settings.labels;
            var title = settings.title;
            var column = data.length; // chart total count
            var maxData = 0; // maximum data

            // Add Chart Container
            $this.html('<div id="jt_chart" class="jt_chart_col_'+column+'"><div id="jt_chart_board"><div id="jt_chart_ground_wrap"><ul id="jt_chart_ground"></ul></div><div id="jt_chart_haxis"></div></div></div>');
            $this.wrap('<div id="jt_chart_outer"></div>')

            // Chart Title
            if(title != ''){
                var title = '<p class="jt_chart_title">'+ title +'</p>';
                $this.after(title);
            }

            // Chart Category
            if(labels != ''){
                var category = '<ul id="jt_chart_category">';
                for (var i in labels) {
                    if(i!=0) {
                        category += '<li><span>'+labels[i]+'</span></li>';
                    }
                }
                category += '</ul>';
                $this.before(category);
            }

            // Get Chart Data
            for (var i in data) {
                var html = '<li><div class="items">';

                for(var j in data[i]) {
                    if(j==0) {
                        // Horizontal Axis
                        var haxis = '<span>'+data[i][j]+'</span>';
                        $('#jt_chart_haxis').append(haxis);
                    } else {
                        if(data[i][j] > maxData) {
                            maxData = parseInt(data[i][j]);
                        }
                        html += '<div class="item"><div class="bar"><span class="annotation">'+ numberWithCommas(data[i][j]) +'</span></div></div>';
                    }
                }

                html += '</div></li>';

                $('#jt_chart_ground').append(html);
            }

            // Vertical Axis
            var measure = 100000000000;
            var quotient = maxData/measure;

            while(true){
                if(quotient < 1) {
                    measure = measure/10;
                    quotient = maxData/measure;
                } else {
                    quotient = Math.ceil(quotient);
                    break;
                }
            }

            var ceilingValue = quotient*measure;
            var percent = ceilingValue/100;
            var valueValor = ceilingValue/5;

            var vaxis = '<div id="jt_chart_vaxis">';
            var line = '';
            for(var i=0; i<6;i++) {
                var vaxis_data = Math.round(ceilingValue - (valueValor*i));
                vaxis += '<span>'+ numberWithCommas(vaxis_data) +'</span>';

                if( i!=0 ){ line += '<span class="line"></span>'; }
            }
            vaxis += '</div>';

            $('#jt_chart').append(vaxis);
            $('#jt_chart_ground_wrap').prepend(line);

            // bar height settings
            for (var i in data) {
                for(var j in data[i]) {
                    if(j!=0) {
                        var n = parseInt(i)+1;
                        var height = Math.ceil(parseInt(data[i][j])/percent)+'%';
                        $('#jt_chart_ground > li:nth-child('+ n +') > .items > .item:nth-child('+ j +') > .bar').height(height);
                    }
                }
            }

			// Todo animate with TeenMax if exist
			var colli_occured = false;
			var $anime_items = $('#jt_chart').find('.items');
			var $annotation	 = $anime_items.find('.annotation');
			$anime_items.css('height','0%');
			$annotation.hide();

			$(window).on('load resize scroll' , function(){

				if(colli_occured) return;

				var $win = $(window);
				var $chart = $('#jt_chart');
				var chart_top = $chart.offset().top;
				var win_top = $win.scrollTop();
				var colli = $win.scrollTop() + ($win.height()/1.5)

				if(colli > chart_top ){
					$chart.addClass('jt_chart_animate');
                    $anime_items.animate({height:'100%'},600, function(){
					    $annotation.fadeIn()
					});

					colli_occured = true
				}

			});


        }); // END each()



        // add a monetary unit commas
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }



    }; //END jtChart



})(jQuery);
