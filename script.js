var currentDayEl = $('#currentDay');
var now = dayjs()
currentDayEl.text(now.format("dddd, MMMM D, YYYY"));
var userHour = dayjs().hour()
var userHourStore = "hour-"+userHour
const localStorageContent = localStorage.getItem('scheduleItems')
var scheduleItem;
var scheduleItems;
        if (localStorageContent === null) {
          scheduleItems = [];
        } else {
          scheduleItems = JSON.parse(localStorageContent);
        }

//change the classes based on time//
$( "div" ).each(function( index ) {
  var elementValue = this.id.substr(5)
  if(elementValue==userHour){
    $(this).addClass("present")
  } else if(elementValue < userHour){
    $(this).addClass("past") 
   } else{
    $(this).addClass("future")    
   }
});

function readScheduleFromStorage() {
  var scheduleItems = localStorage.getItem('scheduleItems');
  if (scheduleItems) {
    scheduleItems = JSON.parse(scheduleItems);
  } else {
    scheduleItems = [];
  }
  return scheduleItems;
}

//load saved schedule//
function loadSavedSchedule(){
var scheduleItems = readScheduleFromStorage()

for(var i = 0; i < scheduleItems.length; i++){
  var scheduleItem = scheduleItems[i]
    $( "div" ).each(function( index ) {
    var elementValue = this.id
    if(elementValue==scheduleItem.id){
      $(this.children[1]).text(scheduleItem.text)
    } 
  });
}}

loadSavedSchedule()

//save to local storage//
$('button').click(function(event){
  event.preventDefault();
  $("h4").remove();
  scheduleItem = {
    text: $.trim($(this.parentElement.children[1]).val()),
    id: this.parentElement.id,
  }
  displaySaved()
  scheduleItems.push(scheduleItem)
  localStorage.setItem('scheduleItems', JSON.stringify(scheduleItems));
})

//display item saved//
function displaySaved(){
    $("#currentDay").append('<h4>Saved to Local Storage</h4>')
    $("h4").attr('style', 'padding-top: 20px;')
    $("h4").hide().slideDown().delay(1000).fadeOut();
}