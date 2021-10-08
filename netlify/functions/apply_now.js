require('dotenv').config()
var mailchimp = require('./mailchimp.js');
var hubspot = require('./hubspot.js');

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
  // data is an object which contains 2 key value pairs, mailchimpData and properties
  const { mailchimpData, hubspotData } = data
  
  // send data to mailchimp/ hubspot to be added to our lists
  mailchimp.audienceEntry(mailchimpData);
  hubspot.subscriberEntry(hubspotData);

  return {
    statusCode: 200,
    headers,
    body: `Hello Banananana`,
  };
};