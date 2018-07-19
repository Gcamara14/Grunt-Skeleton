// I am the master Js File
// The master has addedd!!! hazahhh

var Cal = function(divId) {

  //Store div id -- I'm calling it Print Month
  this.divId = divId;

  // Months, stating on January
  this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  // Set the current month, year
  var d = new Date();

  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();

};

// Goes to next month
Cal.prototype.nextMonth = function() {
  if ( this.currMonth == 11 ) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  }
  else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};

// Goes to previous month
Cal.prototype.previousMonth = function() {
  if ( this.currMonth == 0 ) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  }
  else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};

// Show current month, calls on the Show month for html
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
  return this.showMonth(this.currYear, this.currMonth);
};

// Show month (year, month)
Cal.prototype.showMonth = function(y, m) {

  var d = new Date()
	// Write selected month and year
  var html = this.Months[m] + " " + y;
  var htmlClass = this.Months[m] + "-" + y;
  // Write HTML to the div
  document.getElementById(this.divId).innerHTML = html;
  document.getElementById(this.divId).className = (htmlClass);
  return this.Months[m] + "-" + y;
};

// On Load of the window
window.onload = function() {

  // Start calendar
  var c = new Cal("printMonth");
  c.showcurr();

  // Checks classname of current date for if-statements
  var currMonth = $("#printMonth").attr("class");

  // Bind next and previous button clicks
  getId('btnNext').onclick = function(e) {
  	e.preventDefault();
    c.nextMonth();
  };
  getId('btnPrev').onclick = function(e) {
  	e.preventDefault();
    c.previousMonth();
  };

  function checkEmpty(){
    var currentHeight = $("#Events").outerHeight(true);
    if( currentHeight < 200) {
      $("#events-empty").removeClass("hide");
    }
    else{
      $("#events-empty").addClass("hide");
    }
    return currentHeight;
  }
    // Init -  Checks if their are any events for this month
    setTimeout(function() { checkEmpty(); }, 1000);

  // Init - fade in the current months events
    setTimeout(function(){
            $(".event_item" + "." + currMonth).removeClass("hide");
          }, 300);

// re-Init - reInstantiates the events based on month/year
  $("#btnPrev").on("click", function(){
    $(".event_item").addClass("hide");
    $(".load-more .btn").show();
          setTimeout(function(){
            $(".event_item" + "." + currMonth).removeClass("hide").fadeIn();
          }, 300);
    currMonth = $("#printMonth").attr("class");
    setTimeout(function() { checkEmpty(); }, 300);
  });

// Re-Init - reInstantiates the events based on month/year
  $("#btnNext").on("click", function(){
    $(".event_item").addClass("hide");
    $(".load-more .btn").show();
          setTimeout(function(){
            $(".event_item" + "." + currMonth).removeClass("hide");
          }, 300);    
  currMonth = $("#printMonth").attr("class");
  setTimeout(function() { checkEmpty(); }, 300);
  });

  // Re-Init - Shows all the events
  $(".load-more .btn").on("click", function(e){
    e.preventDefault();
          setTimeout(function(){
            $(".event_item:not(" + "." + currMonth+")").removeClass("hide");
          }, 300);
      setTimeout(function() { checkEmpty(); }, 300);    
    $(this).hide();
  });  

}

// Get element by id
function getId(id) {
  return document.getElementById(id);
}

$(document).ready(function(){
});