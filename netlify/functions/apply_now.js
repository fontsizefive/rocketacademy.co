require('dotenv').config()

const Sentry = require("@sentry/node");
//const Tracing = require("@sentry/tracing");

const { SENTRY_DSN } = process.env;

let sentryInitialized = false;

function initSentry() {
    if (SENTRY_DSN) {
        Sentry.init({ dsn: SENTRY_DSN });
        sentryInitialized = true;
    }
}

var mailchimp = require('./mailchimp.js');
var hubspot = require('./hubspot.js');


exports.handler = async (event, context) => {

  initSentry();

  try {

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
    const mailchimpResult = await mailchimp.audienceEntry(mailchimpData);
    const hubspotResult = await hubspot.subscriberEntry(hubspotData);

    return {
      statusCode: 200,
      body: `Hello Banananana`,
    };
  } catch (e) {
    console.log("capturing sentry excpetion");
    console.log(e)
    Sentry.captureException(e);

    return {
      statusCode: 500,
      body: `whoops, some errors`,
    };
  }
};
