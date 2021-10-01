require('dotenv').config()

// mailchimp
const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_NAME, MAILCHIMP_LIST_ID } = process.env;
// find and set the list id
// https://mailchimp.com/help/find-audience-id/

// medium blogpost about mailchimp / netlify
// https://archive.is/AiLjW

const querystring = require("querystring");

const client = require("@mailchimp/mailchimp_marketing");
const { getMaxListeners } = require('process');

client.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_NAME,
});

// hubspot 
const { HUBSPOT_API_KEY } = process.env;
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey": HUBSPOT_API_KEY});


exports.handler = async (event, context) => {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': "Content-Type",
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  if (event.httpMethod == 'OPTIONS') {
      // To enable CORS
      return {
        statusCode: 200, // <-- Important!
        headers,
        body: 'This was not a POST request!'
      };
   }


  // Only allow POST
  if (event.httpMethod !== "POST") {
    console.log( event.httpMethod );
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  
  // mailchimp
  const data = JSON.parse(event.body);
  const mailchimpData = data[0];
  console.log('mailchimp data', mailchimpData);
  const mergeFields = mailchimpData.merge_fields;
  let checkedStringMC = true;

  Object.keys(mergeFields).forEach((field) => {
    if(!(field === 'REFERRAL' || field === 'LINKEDIN')) {
      if(mergeFields[field].trim().length === 0) {
        checkedStringMC = false;
      }
    }
  })
  
  if (checkedStringMC === false) {
    return { statusCode: 400, body: "Bad Request" };
  }


  // hubspot
  const properties = data[1];
  let checkedStringHS = true;

  // checking for blank fields
  Object.keys(properties).forEach((field) => {
    if(!(field === 'referral' || field === 'linkedin')) {
      if(properties[field].trim().length === 0) {
        checkedStringHS = false;
      }
    }
  })
  
  if (checkedStringHS === false) {
    return { statusCode: 400, body: "Bad Request" };
  }

  const SimplePublicObjectInput = { properties };

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const name = params.name || "World";


  try{

    const contact = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
    const response = await client.lists.addListMember(MAILCHIMP_LIST_ID, mailchimpData);

  }catch(error){
    console.log( error )
  }

  return {
    statusCode: 200,
    headers,
    body: `Hello Banananana`,
  };
};
