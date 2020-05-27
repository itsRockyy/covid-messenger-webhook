const axios = require("axios");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "";
const FB_URL = "https://graph.facebook.com/v2.6/me/messages";

// Handles messages events
const handleMessage = (sender_psid, received_message) => {
  let response;

  if (received_message.text) {
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an image!`,
    };
  }

  callSendAPI(sender_psid, response);
};

// Handles messaging_postbacks events
const handlePostback = (sender_psid, received_postback) => {};

// Sends response messages via the Send API
const callSendAPI = (sender_psid, response) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  axios
    .post(`${FB_URL}?access_token=${PAGE_ACCESS_TOKEN}`, request_body)
    .then(function (response) {
      console.log("message sent!");
      console.log(JSON.stringify(response));
    })
    .catch(function (error) {
      console.error("Unable to send message:" + error);
    });
};

module.exports = {
  handleMessage,
  handlePostback,
  callSendAPI,
};
