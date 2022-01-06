require('dotenv').config()
const middy = require('@middy/core')
const httpUrlEncodeBodyParser  = require('@middy/http-urlencode-body-parser')

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

var hubspot = require('./hubspot.js');

const handleRequest = async (event, context) => {

  initSentry();

  try {

    // Only allow POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: 'Method not allowed!'
      };
    }

    const {body} = event;

    console.log(body);

    // send data to hubspot to be added to our lists
    const hubspotResult = await hubspot.subscriberEntry(body);

    return {
      statusCode: 303,
      body: 'worked!',
      headers: {
        Location: 'https://rocketacademy.co/thanks',
      }
    };

  } catch (e) {
    console.log("capturing sentry excpetion");
    console.log(e)
    Sentry.captureException(e);

    return {
      statusCode: 303,
      body: 'worked!',
      headers: {
        Location: 'https://rocketacademy.co/thanks',
      }
    };
  }
};

exports.handler = middy(handleRequest)
  .use(httpUrlEncodeBodyParser())
