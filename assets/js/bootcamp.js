var courseType = "Bootcamp";

// helper function for formatting date
const getFormattedDate = (d) => {
  const dateObj = new Date(d);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObj);
  const da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dateObj);
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
    let count = 0;
    let headerCountFullTime = 0;
    let headerCountPartTime = 0;

    // sorts events object by date in ascending order
    events.sort(function(a,b){
      return new Date(a.start.date) - new Date(b.start.date);
    });

    events.forEach(function(entry) {
      console.log('entry', entry);
        const today = new Date();
        const startsAt = new Date(entry.start.date);
        const start  = entry.start.date;
        const end = entry.end.date;

        // limit of 5 course dates with start date > current date
        if (count < 5 && startsAt > today) {
          const listItemDate = `${getOutput(start, end)} (${entry.description})`;
          const bootcampLi = document.createElement('li');
          const curriculumLi = document.createElement('li');
          bootcampLi.innerHTML = listItemDate;
          curriculumLi.innerHTML = listItemDate;
          (document.getElementById('course-dates-container')).appendChild(bootcampLi);
          (document.getElementById('course-dates-curriculum')).appendChild(curriculumLi);
          
          if (count === 0) {
           // dates for page header
          const nextBatchHeader = document.createElement('h2');
          nextBatchHeader.innerHTML = 'Next Batches:';
          (document.getElementById('next-batch-date')).appendChild(nextBatchHeader);
        }

          count += 1;
        }
        
        // full time
        if (headerCountFullTime === 0 && startsAt > today && entry.description === "Full Time") {
          const fullTimeHeaderDate = document.createElement('h2');
          fullTimeHeaderDate.innerHTML = `${getOutput(start, end)} (${entry.description})`;
          (document.getElementById('next-batch-date')).appendChild(fullTimeHeaderDate);
          headerCountFullTime += 1;
        }
        // part time
        if (headerCountPartTime === 0 && startsAt > today && entry.description === "Part Time") {
          const partTimeHeaderDate = document.createElement('h2');
          partTimeHeaderDate.innerHTML = `${getOutput(start, end)} (${entry.description})`;
          (document.getElementById('next-batch-date')).appendChild(partTimeHeaderDate);
          headerCountPartTime += 1;
        }
    });
}
