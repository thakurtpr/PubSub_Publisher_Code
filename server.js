const express = require("express");
const { PubSub } = require("@google-cloud/pubsub");

const app = express();
const pubSubClient = new PubSub({
  projectId: "assignment-388916",
  keyFilename: "key.json",
}); //initialize PubSub
const topicName = "demoPubSub"; //topic that we have created in pubSub

app.use(express.json());

app.post("/post", async (req, res) => {
  try {
    const { data } = req.body;
    // console.log(data);
    const dataBuffer = Buffer.from(data);

    // console.log(dataBuffer);
    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published to ${topicName}.`);
    res.status(200).json({ message: "Message published to Pub/Sub." });
  } catch (error) {
    console.error("Error publishing message:", error);
    res.status(500).json({ error: "Failed to publish message." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
