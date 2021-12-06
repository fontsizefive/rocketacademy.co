var courseType = "Bootcamp";

// header text
const nextBatchHeader = document.createElement('h2');
nextBatchHeader.innerHTML = 'Next Batches:';
(document.getElementById('next-batch-date')).appendChild(nextBatchHeader);

// must define a function called eventsLoad
// this is specified in the calendar partial
function eventsLoad(events){
  let count = 0;
  let headerCountFullTime = 0;
  let headerCountPartTime = 0;

  // sorts events object by date in ascending order
  events.sort(function(a, b) {
    return new Date(a.start.date) - new Date(b.start.date);
  });

  // dates in content of bootcamp page
  events.forEach(function(entry) {
    const today = new Date();
    const start  = entry.start.date;
    const end = entry.end.date;

    // date 2 weeks before actual course start date
    const expiryDate = addDays(start, -14);
    
    // limit of 5 course dates with expiry date > current date
    if (count < 5 && expiryDate > today) {
      const listItemDate = `${getOutput(start, end)} (${entry.description})`;
      const bootcampLi = document.createElement('li');
      const curriculumLi = document.createElement('li');
      bootcampLi.innerHTML = listItemDate;
      curriculumLi.innerHTML = listItemDate;
      (document.getElementById('course-dates-container')).appendChild(bootcampLi);
      (document.getElementById('course-dates-curriculum')).appendChild(curriculumLi);

      count += 1;
    }
  })
      
  // dates in header of bootcamp page
  events.forEach(function(entry) {
    const today = new Date();
    const start  = entry.start.date;
    const end = entry.end.date;

    // date 2 weeks before actual course start date
    const expiryDate = addDays(start, -14);

    // full time
    if (headerCountFullTime === 0 && expiryDate > today && entry.description === "Full Time") {
      const fullTimeHeaderDate = document.createElement('h2');
      fullTimeHeaderDate.innerHTML = `${getOutput(start, end)} (${entry.description})`;
      (document.getElementById('next-batch-date')).appendChild(fullTimeHeaderDate);
      headerCountFullTime += 1;
    }
    // part time
    if (headerCountPartTime === 0 && expiryDate > today && entry.description === "Part Time") {
      const partTimeHeaderDate = document.createElement('h2');
      partTimeHeaderDate.innerHTML = `${getOutput(start, end)} (${entry.description})`;
      (document.getElementById('next-batch-date')).appendChild(partTimeHeaderDate);
      headerCountPartTime += 1;
    }
  })
}
