const checkCheckboxes = (document) => {
  const courseTypes = document.querySelectorAll("input[name=course-type]");
  const courseTypeChecked = document
    .querySelectorAll("input[name=course-type]:checked");
    if (courseTypeChecked.length > 0) {
      courseTypes.forEach((element) => {
          element.removeAttribute("required");
      })
    }
      
  courseTypes.forEach((element) => {
    element.addEventListener("click", () => {
    const checkedArray = [];
    let amended = document
      .querySelectorAll("input[name=course-type]:checked");
    amended
      .forEach((element) => {
          checkedArray.push(element.value);
        });

      if (checkedArray.length > 0) {
        courseTypes.forEach((element) => {
          element.removeAttribute("required");
        });
      } else {
        courseTypes.forEach((element) => {
          element.setAttribute("required", "");
          element.required = true;
        });
      }
    });
  });
}