const dialogflow = require("dialogflow");

const projectId = process.env.DIALOGFLOW_PROJECT_ID || "";

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY || "",
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL || "",
  },
};

const handleMessage = async ({ text = "" }, senderPSID) => {
  let response = "";

  try {
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient(config);
    const sessionPath = sessionClient.sessionPath(projectId, senderPSID);

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
