const axios = require("axios");
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "";
const FB_URL =
  process.env.FB_URL || "https://graph.facebook.com/v2.6/me/messages";

const callSendAPI = (id, message) => {
  const body = {
    recipient: {
      id,
    },
    message,
  };

  axios
    .post(`${FB_URL}?access_token=${PAGE_ACCESS_TOKEN}`, body)
    .then((response) => {
      console.log(JSON.stringify(response));
    })
    .catch((error) => {
      console.error("Unable to send message:" + error);
    });
};

module.exports = callSendAPI;
