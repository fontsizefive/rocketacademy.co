var courseType = "Both";

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
      let start = entry.start.date;
      let end = entry.end.date;

      // date 2 weeks before actual course start date
      const expiryDate = addDays(start, -14);

      // header course dates
      if (basicsCount === 0 && expiryDate > today && entry.summary.includes("Basics")) {
        let basicsDate = document.createElement('p');
        basicsDate.innerHTML = `Next Batch: ${getOutput(start, end)}`;
        (document.getElementById('basics-homepage-dates')).appendChild(basicsDate);
        basicsCount += 1;
      }

      if (fullTimeCount === 0 && expiryDate > today && entry.description === 'Full Time') {
        let fullTimeDates = document.createElement('p');
        fullTimeDates.innerHTML = `Full Time: ${getOutput(start, end)}`;
        (document.getElementById('bootcamp-homepage-dates')).appendChild(fullTimeDates);
        fullTimeCount += 1;
      }

      if(partTimeCount === 0 && expiryDate > today && entry.description === 'Part Time') {
        let partTimeDates = document.createElement('p');
        partTimeDates.innerHTML = `Part Time: ${getOutput(start, end)}`;
        (document.getElementById('bootcamp-homepage-dates')).appendChild(partTimeDates);
        partTimeCount += 1;
      }
    })
}
