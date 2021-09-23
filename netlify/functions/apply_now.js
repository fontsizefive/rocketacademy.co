require('dotenv').config()
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
  
  const data = JSON.parse(event.body);
  const mergeFields = data.merge_fields;
  let checkedString = true;

  Object.keys(mergeFields).forEach((field) => {
    if(!(field === 'REFERRAL' || field === 'LINKEDIN')) {
      if(mergeFields[field].trim().length === 0) {
        checkedString = false;
      }
    }
  })
  
  if (checkedString === false) {
    return { statusCode: 400, body: "Bad Request" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const name = params.name || "World";


  try{

    const response = await client.lists.addListMember(MAILCHIMP_LIST_ID, event.body);
    console.log(response);

  }catch(error){
    console.log( error )
  }

  return {
    statusCode: 200,
    headers,
    body: `Hello Banananana`,
  };
};
