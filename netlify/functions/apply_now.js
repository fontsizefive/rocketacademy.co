require('dotenv').config()
var mailchimp = require('./mailchimp.js');
var hubspot = require('./hubspot.js');
const querystring = require("querystring");

exports.handler = (event, context) => {

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
  
  // data from sign up form is event.body
  const data = JSON.parse(event.body);
  // the data from the sign up form is an array containing 2 objects
  // the first object contains mailchimp specific data
  const mailchimpData = data[0];
  // the second object contains hubspot specific data
  const properties = data[1];

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const name = params.name || "World";
  
  // send data to mailchimp/ hubspot to be added to our lists
  mailchimp.audienceEntry(mailchimpData);
  hubspot.subscriberEntry(properties);

  return {
    statusCode: 200,
    headers,
    body: `Hello Banananana`,
  };
};
