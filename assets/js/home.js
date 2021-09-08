var courseType = "Both";

// helper function for formatting date
const getFormattedDate = (d) => {
  let dateObj = new Date(d);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObj);
  let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dateObj);
  return `${da} ${mo} ${ye}`;
}

// helper function for formatting output
const getOutput = (start, end) => {
const formattedStart = getFormattedDate(start);
const formattedEnd = getFormattedDate(end);
  return `${formattedStart} - ${formattedEnd}`;
}

// must define a function called eventsLoad
// this is specified in the calendar partial
function eventsLoad(events){
    let basicsCount = 0;
    let fullTimeCount = 0;
    let partTimeCount = 0;
    
    // sorts events object by date in ascending order
    events.sort(function(a,b){
      return new Date(a.start.date) - new Date(b.start.date);
    });

    events.forEach((entry) => {
      const today = new Date();
      let startsAt = new Date(entry.start.date);
      let start = entry.start.date;
      let end = entry.end.date;

      // header course dates
      if (basicsCount === 0 && startsAt > today && entry.summary === "Basics") {
        let basicsDate = document.createElement('p');
        basicsDate.innerHTML = `Next Batch: ${getOutput(start, end)}`;
        (document.getElementById('basics-homepage-dates')).appendChild(basicsDate);
        basicsCount += 1;
      }

      if (fullTimeCount === 0 && startsAt > today && entry.summary === 'Full Time') {
        let fullTimeDates = document.createElement('p');
        fullTimeDates.innerHTML = `Full Time: ${getOutput(start, end)}`;
        (document.getElementById('bootcamp-homepage-dates')).appendChild(fullTimeDates);
        fullTimeCount += 1;
      }

      if(partTimeCount === 0 && startsAt > today && entry.summary === 'Part Time') {
        let partTimeDates = document.createElement('p');
        partTimeDates.innerHTML = `Part Time: ${getOutput(start, end)}`;
        (document.getElementById('bootcamp-homepage-dates')).appendChild(partTimeDates);
        partTimeCount += 1;
      }
    })
}
