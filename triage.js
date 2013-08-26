
// create 5 sliders, 1 for each food type
$(function() {
    $('.food_type').each(function() {
      $(this).empty().slider({
        value: 100,
        range: 'min',
        animate: true,
        orientation: 'vertical',
        change: function() {
          calculate()
        }
      }); // end this
    }); // end each
    // calculate and display values for impact chart
    calculate()
    // display # of deaths or # of days of suffering when given food type is hovered over on one of the two impact charts
   $('#impact > >').hover( function() {
      var food = $(this).attr('class');
      currentDays = foods[food].currentDays;
      currentDeaths = foods[food].currentDeaths;
      var foodDisplay = food.charAt(0).toUpperCase() + food.slice(1);
      if ($(this).parent().attr('class') == 'days') {
      var status = '<b>' + foodDisplay + '</b>' + '<br>' + ' ' + currentDays.toFixed(1) + ' Days of suffering'
      }
      else {
        var status = '<b>' + foodDisplay + '</b>' + '<br>' + ' ' + currentDeaths.toFixed(1) + ' Deaths'
      }
      $('.hover_display').html(status);
      color = $('.' + food).css('background-color')
      $('.hover_display').css({
        'border':'4px solid ' + color,
      });
      $('.hover_display').show();
    }, function() {
      $('.hover_display').hide()
    }); // end hover
   $('.hover_display').hide()

   }); // end function
  


var totalDays = 1962.5
var totalDeaths = 30.98373


// for each food type, store number of days, total number of deaths, and current number of days and current number 
// of deaths based on adjusted height of slider 

var foods = {

chicken: {
      'days': 1349.5,
      'deaths': 28.63,
      'currentDays': 1349.5,
      'currentDeaths': 28.63
      },

eggs: {
      'days': 456.25,
      'deaths': 1.733,
      'currentDays': 456.25,
      'currentDeaths': 1.733
      },

pork: {
      'days': 112.5,
      'deaths': .445,
      'currentDays': 112.5,
      'currentDeaths': .445
      },

beef: {
      'days': 28.75,
      'deaths': .1324,
      'currentDays': 28.75,
      'currentDeaths': .1324
      },

dairy: {
      'days': 15,
      'deaths': .03333,
      'currentDays': 15,
      'currentDeaths': .03333

      }

};


// adjust impact charts on right based on adjusted sliders
var calculate = function() {
      var netDays = 0;
      var netDeaths = 0;
      var netDaysHeight = 0;
      var netDeathsHeight = 0;
      var netDaysPercent = 0;
      var netDeathsPercent = 0;

     $('.food_type').each(function() {
            var food = $(this).parent().attr('id');
            var value = $(this).slider('value'); 
            // calculate height of each food type container on days of suffering chart
            var days = value/100 * foods[food].days;
            foods[food].currentDays = days;
            var daysPercent = days/totalDays;
            var daysHeight = 330 * daysPercent;
            var portionDays = '.days .' + food;

            // calculate height of each food type container on deaths chart
            var deaths = value/100 * foods[food].deaths;
            foods[food].currentDeaths = deaths;
            var deathsPercent = deaths/totalDeaths;
            var deathsHeight = 330 * deathsPercent;
            var portionDeaths = '.deaths .' + food;
                        

            // adjust height of food in days of suffering chart
            $(portionDays).css({
                  'height': daysHeight + 'px'
                  });
            // adjust height of food in deaths chart
            $(portionDeaths).css({
                  'height': deathsHeight + 'px'
                  });
             // calculate percent decline and display under each food type
            var percentDecline = '-' + (100 - value) + '%' ;
            $('#' + food + '> .percent').html(percentDecline) ;
            netDays += days;
            netDeaths += deaths;
            netDaysHeight += daysHeight;
            netDeathsHeight += deathsHeight;
            netDaysPercent += daysPercent;
            netDeathsPercent += deathsPercent;
      }); //end each

      // Insert margin at top of each impact bar so colors start at top, not bottom
      var daysMargin = 330 - netDaysHeight + 'px';
      var deathsMargin = 330 - netDeathsHeight + 'px';
      $('.days .dairy').css('margin-top', daysMargin);
      $('.deaths .dairy').css('margin-top', deathsMargin);
      // calculate and display total # of days of suffering and # of deaths below charts on right 
      $('.total_days').html(netDays.toFixed(1));
      $('.total_deaths').html(netDeaths.toFixed(1));
      var daysDecline = 100 - (100 * netDaysPercent);
      var deathsDecline = 100 - (100 * netDeathsPercent);
      daysDecline = '-' + daysDecline.toFixed(1) + '%';
      deathsDecline = '-' + deathsDecline.toFixed(1) + '%';
      $('.days > .percent').html(daysDecline);
      $('.deaths > .percent').html(deathsDecline);
}; //end calculate