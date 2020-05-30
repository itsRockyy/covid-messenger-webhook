const axios = require("axios");

// Handles messaging_postbacks events
const handlePostback = ({ payload = "" }) => {
  let responseBody;

  // Set the response based on the postback payload
  if (payload === "covid-tracker") {
    responseBody = { text: "Please enter your country name" };

    axios
      .get("https://api.covid19api.com/summary")
      .then(function (response) {
        console.log(
          response.data.Countries.filter(
            (item) => item.Country.toLowerCase() === "united states of america"
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (payload === "exit") {
    responseBody = { text: "Have a good day" };
  }

  return responseBody;
};

module.exports = handlePostback;
