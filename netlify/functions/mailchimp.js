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

exports.audienceEntry = async function (mailchimpData) {
  // checking that user fields are not blank apart from 'REFERRAL' and 'LINKEDIN'
  const mergeFields = mailchimpData.merge_fields;
  let checkedStringMC = true;

  Object.keys(mergeFields).forEach((field) => {
    if(!(field === 'REFERRAL' || field === 'LINKEDIN')) {
      if(mergeFields[field].trim().length === 0) {
        checkedStringMC = false;
      }
    }
  })
  // if not, data is not sent to mailchimp
  if (checkedStringMC === false) {
    return { statusCode: 400, body: "Bad Request" };
  }

  mailchimpData.status = "subscribed";

  try {
    // send request to mailchimp to add user to audience list
    const response = await client.lists.addListMember(MAILCHIMP_LIST_ID, mailchimpData);
  }catch(error){
    console.log( error )
  }
}
