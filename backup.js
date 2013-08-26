var total = 1962.5
var animal = [1350,456.25,112.5,28.75,15]
var suffer = ['chicken_suffer','eggs_suffer','pork_suffer','beef_suffer','dairy_suffer']
total_suffering = 0

var calculate = function() {
		i = 0
	    $(".food_type").each(function() {
	    	var value = $(this).slider("value"); 
            var percent = value/80;
            var days = percent * animal[i];
            var space_percent = days/total;
            var height = 330 * space_percent;
            var space = height + 'px';
            var portion_suffer = "." + suffer[i]
            $(portion_suffer).css('height',space);
            total_suffering += days
            i++ 

	}); //end each
}; //end calculate