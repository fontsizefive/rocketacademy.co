/*
 * WARNING:
 * This serialization function makes an implicit assumption that
 * the form that it's processing wants to turn any nested input
 * names into JSON arrays
 *
 * Any further forms using the JS where there are nested data
 * should use [] in the input name
 *
 * Example: <input name="course_type[]" />
 * JSON: course_type:[....]
 */
const serializeForm = (form) => {
  const formData = new FormData(form);
  // from: https://stackoverflow.com/a/46774073/271932
  const result = {};
  formData.forEach((value, key) => {

    // convert course_type[] to a
    // key called course_type with an array
    if( key.slice(-2) === '[]' ){
      key = key.slice(0,-2);

      if(!Array.isArray(result[key])){
          result[key] = [];
      }
      result[key].push(value);
      return;
    }

    result[key] = value;
  });
  return result;
};


const initializeCheckboxes = () => {
  const checkBoxes = document.querySelectorAll('input[name="course_type[]"]');
  checkBoxes.forEach(e=> e.addEventListener('change',checkCheckboxes));
};

const checkCheckboxes = () => {
  console.log('here');
  const checkBoxes = document.querySelectorAll('input[name="course_type[]"]');

  // if none checked, add required
  if( document.querySelectorAll('input[name="course_type[]"]:checked').length === 0 ){
    console.log('make them all req');
    checkBoxes.forEach(e=> e.setAttribute("required",''));
  }else{
    checkBoxes.forEach(e=> e.removeAttribute("required"));
  }
}

window.addEventListener('load', () => {
  initializeCheckboxes();
  form = document.querySelector(".needs-validation");
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      checkCheckboxes(form);
      if (form.checkValidity() === true) {
        var data = serializeForm(form);

        axios({
          method: "post",
          url: "/.netlify/functions/apply_now",
          data: data,
        }).then(function (response) {

          // CSS thanks animation
        });
      } else {
        form.classList.add("was-validated");
      }
      event.preventDefault();
      event.stopPropagation();
    },
    false
  );
});
