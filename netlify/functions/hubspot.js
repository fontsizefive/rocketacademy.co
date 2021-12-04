require('dotenv').config()

const { HUBSPOT_API_KEY } = process.env;
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({"apiKey": HUBSPOT_API_KEY});

// https://developers.hubspot.com/docs/api/crm/contacts
exports.subscriberEntry = async function (data) {
  try{

    // data formatting for apply form
    const hubspotData = {
      properties: {
        ...data,
        course_type:data.course_type.join(';'),
        bootcamp_funnel_status:'basics_apply',
      }
    };

    const response = await hubspotClient.crm.contacts.basicApi.create(hubspotData);
    return response;
  }catch(error){
    throw new Error(JSON.stringify(error))
  }
}
