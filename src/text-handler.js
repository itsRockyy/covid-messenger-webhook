const handleMessage = ({ text = "" }) => {
  let response = "";

  if (["hi", "hello", "greetings", "help"].includes(text.toLowerCase())) {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Greetings. Please select one of the following —",
          buttons: [
            {
              type: "postback",
              title: "COVID Tracker",
              payload: "covid-tracker",
            },
            {
              type: "postback",
              title: "Greet me!",
              payload: "greet",
            },
          ],
        },
      },
    };
  } else {
    response = {
      text: `Didn't understand :( Please type 'Hi', 'Hello', 'Greetings' or 'help' to begin.`,
    };
  }

  return response;
};

module.exports = handleMessage;
