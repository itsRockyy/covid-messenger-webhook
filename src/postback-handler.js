// Handles messaging_postbacks events
const handlePostback = ({ payload = "" }) => {
  let responseBody;

  // Set the response based on the postback payload
  if (payload === "yes") {
    responseBody = { text: "Thanks!" };
  } else if (payload === "no") {
    responseBody = { text: "Oops, try sending another image." };
  }

  return responseBody;
};

module.exports = handlePostback;
