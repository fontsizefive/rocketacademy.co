require('dotenv').config()

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      // Block GET requests
      return { statusCode: 400, body: null }
    }

    console.log('event body', event.body);
    const properties = JSON.parse(event.body);
    let checkedString = true;

    // checking for blank fields
    Object.keys(properties).forEach((field) => {
      if(!(field === 'REFERRAL' || field === 'LINKEDIN')) {
        if(properties[field].trim().length === 0) {
          checkedString = false;
        }
      }
    })
    
    if (checkedString === false) {
      return { statusCode: 400, body: "Bad Request" };
    }

    const { HUBSPOT_API_KEY } = process.env;
    const hubspot = require('@hubspot/api-client');
    const hubspotClient = new hubspot.Client({"apiKey": HUBSPOT_API_KEY});

    const SimplePublicObjectInput = { properties };

    const contact = hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);

    // Return a 200 if it succeeds
    return { statusCode: 200, body: JSON.stringify({ success: true }) }

  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}