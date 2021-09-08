var courseType = "Basics";

// helper function for formatting date
const getFormattedDate = (d) => {
  let dateObj = new Date(d);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObj);
  let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dateObj);
  return `${da} ${mo} ${ye}`;
}

// must define a function called eventsLoad
// this is specified in the calendar partial
function eventsLoad(events){
    let count = 0;
    
    // sorts events object by date in ascending order
    events.sort(function(a,b){
      return new Date(a.start.date) - new Date(b.start.date);
    });

    events.forEach(function(entry) {
        const today = new Date();
        let startsAt = new Date(entry.start.date);

        // limit of 5 course dates with start date > current date
        if (count < 3 && startsAt > today) {
          let contentStartDate = getFormattedDate(entry.start.date);
          let contentEndDate = getFormattedDate(entry.end.date);
          let date = `${contentStartDate} - ${contentEndDate}`;

          let bootcampLi = document.createElement('li');
          let curriculumLi = document.createElement('li');
          bootcampLi.innerHTML = date;
          curriculumLi.innerHTML = date;
          (document.getElementById('basics-course-dates')).appendChild(bootcampLi);
          (document.getElementById('basics-curriculum')).appendChild(curriculumLi);
          count += 1;
        }
    });

    let headerCount = 0;
    events.forEach((entry) => {
      const today = new Date();
      let startsAt = new Date(entry.start.date);
      // header course dates
      if (headerCount === 0 && startsAt > today) {
        let headingStartDate = getFormattedDate(entry.start.date);
        let headingEndDate = getFormattedDate(entry.end.date);

        let headerDate = document.createElement('h2');
        headerDate.innerHTML = `Next Batch: ${headingStartDate} - ${headingEndDate}`;
        (document.getElementById('basics-next-batch')).appendChild(headerDate);
        headerCount += 1;
      }
      
    })
}
