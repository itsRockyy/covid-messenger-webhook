const dialogflow = require("dialogflow");

const projectId = process.env.DIALOGFLOW_PROJECT_ID || "";

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/g, "\n") || "",
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL || "",
  },
};

const handleMessage = async ({ text = "" }, senderPSID) => {
  let response = "";

  console.log(15);

  try {
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient(config);
    const sessionPath = sessionClient.sessionPath(projectId, senderPSID);
    console.log(21);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log(37);
    const result = responses[0].queryResult;
    const { queryText = "", fulfillmentText = "", intent = {} } = result;

    console.log({
      queryText,
      fulfillmentText,
      intent: result.intent ? intent.displayName : "No intent matched",
    });
    response = {
      text: fulfillmentText,
    };
  } catch (err) {
    console.log(err);
    response = {
      text: "Something went wrong. Please try again.",
    };
  }
  return response;
};

module.exports = handleMessage;
