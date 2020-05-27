const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const callSendAPI = require("./src/helpers");
const handleMessage = require("./src/text-handler");
const handlePostback = require("./src/postback-handler");

const isProd = process.env.TIER === "prod";
const APP_PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Messenger Webhook UP");
});

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN)
      res.status(200).send(challenge);
    else res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  const body = req.body;
  let responseBody = {};

  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      const webhookEvent = entry.messaging[0];
      const senderPSID = isProd ? webhookEvent.sender.id : "";

      if (webhookEvent.message) {
        responseBody = handleMessage(webhookEvent.message);
      } else if (webhookEvent.postback) {
        responseBody = handlePostback(webhookEvent.postback);
      }

      if (isProd) callSendAPI(senderPSID, responseBody);
    });
    res.status(200).json(responseBody);
  } else {
    res.sendStatus(404);
  }
});

app.listen(APP_PORT, () => {
  console.log(`Messenger Webhook is listening on port ${APP_PORT}`);
});
