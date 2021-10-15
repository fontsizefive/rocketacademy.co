require('dotenv').config()

const Sentry = require("@sentry/node");
//const Tracing = require("@sentry/tracing");

const { SENTRY_DSN } = process.env;

let sentryInitialized = false;

function initSentry() {
    if (SENTRY_DSN) {
        Sentry.init({
          dsn: SENTRY_DSN,
          maxValueLength: 8000, // without this error output gets truncated
        });
        sentryInitialized = true;
    }
}

var mailchimp = require('./mailchimp.js');
var hubspot = require('./hubspot.js');

exports.handler = async (event, context) => {

  initSentry();

  try {

    if (event.httpMethod == 'OPTIONS') {

        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': "Content-Type",
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        };

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

    // send data to mailchimp/ hubspot to be added to our lists
    const mailchimpResult = await mailchimp.audienceEntry(data);

    const hubspotResult = await hubspot.subscriberEntry(data);

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
