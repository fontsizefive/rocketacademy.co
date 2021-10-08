require('dotenv').config()

const { HUBSPOT_API_KEY } = process.env;
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey": HUBSPOT_API_KEY});

exports.subscriberEntry = async function (hubspotData) {
  let checkedStringHS = true;
  // checking for blank fields, data is not passed onto hubspot if any fields apart from 'referral' and 'linkedin' are blank
  Object.keys(hubspotData).forEach((field) => {
    if(!(field === 'referral' || field === 'linkedin')) {
      if(hubspotData[field].trim().length === 0) {
        checkedStringHS = false;
      }
    }
  })

  // if not data is not sent to hubspot
  if (checkedStringHS === false) {
    return { statusCode: 400, body: "Bad Request" };
  }

  // data is sent in properties field of request object
  const properties = hubspotData;


  const SimplePublicObjectInput = { properties }
  try{
    // send request to hubspot to add user to sunscriber list
    // https://developers.hubspot.com/docs/api/crm/contacts
    const contact = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
  }catch(error){
    console.log( error )
  }
}
