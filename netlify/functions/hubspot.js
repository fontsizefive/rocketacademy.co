require('dotenv').config()

const { HUBSPOT_API_KEY } = process.env;
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey": HUBSPOT_API_KEY});

exports.subscriberEntry = async function (hubspotData) {
  let checkedStringHS = true;

  // data is sent in properties field of request object
  const properties = hubspotData;

  const SimplePublicObjectInput = { properties }
  try{
    // send request to hubspot to add user to sunscriber list
    // https://developers.hubspot.com/docs/api/crm/contacts
    const response = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
    return response;
  }catch(error){
    throw new Error(JSON.stringify(error))
  }
}
