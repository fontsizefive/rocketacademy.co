const generateSubscriberObject = (document) => {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const age = document.getElementById("age");
  const ageValue = age.options[age.selectedIndex].value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const linkedIn = document.getElementById("linkedin").value;
  const experience = document.querySelector(
    "input[name=experience]:checked"
  ).value;
   courseTypeArray = [];
  const courseType = document
    .querySelectorAll("input[name=course-type]:checked")
    .forEach((element) => {
      courseTypeArray.push(element.value);
    });
  const courseTypeValue = courseTypeArray.join(",");
  const country = document.getElementById("country");
  const countryValue = country.options[country.selectedIndex].value;
  const source = document.getElementById("source");
  const sourceValue = source.options[source.selectedIndex].value;
  const referral = document.getElementById("referral").value;
  const background = document.getElementById("background").value;

  const fullName = `${lastName}, ${firstName}`;

  const data = {
      email_address: email,
      full_name: fullName,
      status: "unsubscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        AGE: ageValue,
        PHONE: phoneNumber,
        LINKEDIN: linkedIn,
        REFERRAL: referral,
        SOURCE: sourceValue,
        COURSETYPE: courseTypeValue,
        BACKGROUND: background,
        EXPERIENCE: experience,
        COUNTRY: countryValue
      }
    }
    console.log('data====', data);

  return data;
}
