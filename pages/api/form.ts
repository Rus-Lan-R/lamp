import type { NextApiRequest, NextApiResponse } from "next";

import mqtt, { IClientOptions } from "mqtt";

var options: IClientOptions = {
  host: "broker.hivemq.com",
  port: 1883,
  protocol: "mqtt",
};
const client = mqtt.connect(options);
client.on("connect", function () {
  console.log("Connected");
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //setup the callbacks

  client.on("error", function (error) {
    console.log(error);
  });

  client.on("message", function (topic, message) {
    //Called each time a message is received
    console.log("Received message:", topic, message.toString());
  });

  if (req.method === "POST") {
    client.publish("/lamp/ESP32/serialdata/rx", req.body.message);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
};
