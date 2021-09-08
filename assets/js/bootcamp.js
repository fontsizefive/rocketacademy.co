var courseType = "boot";
// must define a function called eventsLoad
// this is specified in the calendar partial
function eventsLoad(events){
    events.forEach(function(entry) {
      var startsAt = new Date(entry.start.dateTime);
      var endsAt = entry.end.dateTime;
      var date = `${startsAt} - ${endsAt} - ${entry.summary}`;
      console.log(entry);
      console.log(date);
    });
}
