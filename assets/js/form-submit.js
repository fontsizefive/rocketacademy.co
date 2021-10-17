const initializeCheckboxes = () => {
  const checkBoxes = document.querySelectorAll('input[name="course_type[]"]');
  checkBoxes.forEach(e=> e.addEventListener('change', _ => checkCheckboxes()));
};

const checkCheckboxes = () => {
  const checkBoxes = document.querySelectorAll('input[name="course_type[]"]');

  // if none checked, add required
  if( document.querySelectorAll('input[name="course_type[]"]:checked').length === 0 ){
    checkBoxes.forEach(e=> e.setAttribute("required",''));
    return false;
  }else{
    checkBoxes.forEach(e=> e.removeAttribute("required"));
    return true;
  }
}

window.addEventListener('load', () => {
  initializeCheckboxes();

  const form = document.querySelector(".needs-validation");

  const handleFormSubmit = (event) => {

    form.classList.add("was-validated");

    if (checkCheckboxes(form) == false || form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation()
    }
  };

  form.addEventListener("submit", handleFormSubmit, false);
});
