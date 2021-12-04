var courseType = "Basics";

// must define a function called eventsLoad
// this is specified in the calendar partial
function eventsLoad(events){
    let count = 0;
    let headerCount = 0;
    
    // sorts events object by date in ascending order
    events.sort(function(a,b){
      return new Date(a.start.date) - new Date(b.start.date);
    });

    events.forEach(function(entry) {
        const today = new Date();
        const start = entry.start.date;
        const end = entry.end.date;

        // date 2 weeks before actual course start date
        const expiryDate = addDays(start, -14);

        // limit of 5 course dates with start date > current date
        if (count < 3 && expiryDate > today) {
          const listItemDate = getOutput(start, end);
          const bootcampLi = document.createElement('li');
          const curriculumLi = document.createElement('li');
          bootcampLi.innerHTML = listItemDate;
          curriculumLi.innerHTML = listItemDate;
          (document.getElementById('basics-course-dates')).appendChild(bootcampLi);
          (document.getElementById('basics-curriculum')).appendChild(curriculumLi);
          count += 1;
        }

        // header course dates
        if (headerCount === 0 && expiryDate > today) {
          const headerDate = document.createElement('h2');
          headerDate.innerHTML = `Next Batch: ${getOutput(start, end)}`;
          (document.getElementById('basics-next-batch')).appendChild(headerDate);
          headerCount += 1;
        }
    });
}
