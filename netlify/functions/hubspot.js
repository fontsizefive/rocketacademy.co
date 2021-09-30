require('dotenv').config()

exports.hubspot = function (data) {
  const { HUBSPOT_API_KEY } = process.env;
  const hubspot = require('@hubspot/api-client');
  const hubspotClient = new hubspot.Client({"apiKey": HUBSPOT_API_KEY});

  if (event.httpMethod !== 'POST') {
      // Block GET requests
      return { statusCode: 400, body: null }
    }

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
  }catch(error){
    console.log( error )
  }

  return {
    statusCode: 200,
    headers,
    body: `Hello Banananana`,
  };
}  
    