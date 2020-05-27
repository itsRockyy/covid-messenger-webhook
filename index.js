const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { handleMessage, handlePostback, callSendAPI } = require("./src/app");

const VERIFY_TOKEN =
  process.env.VERIFY_TOKEN || "708ecb97-5d7b-46ed-831a-5478a7dbf5d5";
const APP_PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Messenger Webhook UP");
});

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"] || "";
  const token = req.query["hub.verify_token"] || "";
  const challenge = req.query["hub.challenge"] || "";

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

app.listen(APP_PORT, () => {
  console.log(`Messenger Webhook is listening on port ${APP_PORT}`);
});
