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

var form = document.querySelector(".needs-validation");
form.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    document.getElementById('apply-submit').setAttribute("disabled", "disabled");

    new bootstrap.Modal(document.getElementById('thanks-modal')).show();

    checkCheckboxes(document);
    if (form.checkValidity() === true) {
      console.log("inside validity check");
      const data = generateSubscriberObject(document);
      axios({
        method: "post",
        url: "/.netlify/functions/apply_now",
        data: data,
      }).then(function (response) {
        document.querySelector('#modal-ready-away').innerHTML='<a href="/">Click here to go back.</a>';

        //window.location.href = "/";
      });
    } else {
      form.classList.add("was-validated");
      console.log("invalid form");
    }
    event.preventDefault();
    event.stopPropagation();
  },
  false
);

