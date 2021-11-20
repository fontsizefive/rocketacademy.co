require('dotenv').config()

const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_NAME, MAILCHIMP_LIST_ID } = process.env;
// find and set the list id
// https://mailchimp.com/help/find-audience-id/

// medium blogpost about mailchimp / netlify
// https://archive.is/AiLjW

const client = require("@mailchimp/mailchimp_marketing");
const { getMaxListeners } = require('process');

client.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_NAME,
});

exports.audienceEntry = async function (data) {

  const mailchimpData = generateMailchimpObject(data);
  // checking that user fields are not blank apart from 'REFERRAL' and 'LINKEDIN'
  const mergeFields = mailchimpData.merge_fields;

  // send request to mailchimp to add user to audience list
  // https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
  try{
    const response = await client.lists.addListMember(MAILCHIMP_LIST_ID, mailchimpData);
    return response;
  }catch(error){
    throw new Error(error)
  }
}

// map the form data to the mailchimp merge fields
const generateMailchimpObject = (data) => {

  const {
    email,
    firstname,
    lastname,
    phone,
    referral,
    course_type,
    source,
    age,
    experience,
    background,
    country,
    linkedin,
    contact_source
  } = data;

  const fullName = `${lastname}, ${firstname}`;
  return {
      email_address: email,
      full_name: fullName,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname,
        AGE: age,
        PHONE: phone,
        LINKEDIN: linkedin,
        REFERRAL: referral,
        SOURCE: source,
        COURSETYPE: course_type.join(','),
        BACKGROUND: background,
        EXPERIENCE: experience,
        COUNTRY: country,
        SUB_SOURCE: 'apply'
      }
    }
};
