require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// **Incoming Call Webhook**
app.post("/voice", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("Welcome to the Twilio call center demo.");
  twiml.dial("+16187034609"); // Replace with the agent's number
  res.type("text/xml").send(twiml.toString());
});

// **Outgoing Call API**
// app.post("/call", async (req, res) => {
//   try {
//     const { to } = req.body;
//     const call = await twilioClient.calls.create({
//       url: "https://demo.twilio.com/welcome/voice/",
//       to,
//       from: process.env.TWILIO_PHONE_NUMBER,
//     });

//     io.emit("new_call", { callSid: call.sid, to });
//     res.json({ message: "Call initiated", callSid: call.sid });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: error.message });
//   }
// });

app.post("/call", async (req, res) => {
    try {
      const { to } = req.body;
  
      // Define the status callback URL
      const statusCallbackUrl = process.env.CALL_BACK_URL;  // Replace with your actual server URL
  
      const call = await twilioClient.calls.create({
        url: "https://demo.twilio.com/welcome/voice/",
        to,
        from: process.env.TWILIO_PHONE_NUMBER,
        statusCallback: statusCallbackUrl,    // Set the status callback
        statusCallbackEvent: ["initiated", "ringing", "completed"],  // Events to be triggered
        statusCallbackMethod: "POST"  // Method to send the callback
      });
  
      // Emit a new call event to frontend for real-time update
      io.emit("new_call", { callSid: call.sid, to, status: "initiated" });
  
      res.json({ message: "Call initiated", callSid: call.sid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  app.get('/call-logs', async (req, res) => {
    try {
      const calls = await twilioClient.calls.list(); // Fetch last 10 calls
      const callLogs = calls.map(call => ({
        sid: call.sid,
        from: call.from,
        to: call.to,
        status: call.status,
        duration: call.duration,
        startTime: call.startTime,
      }));
    //   console.log(callLogs,"callLogscallLogs")
      io.emit("new_call_status", { item: callLogs });
      res.status(200).json({item:callLogs});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  




// **SMS API**
app.post("/sms", async (req, res) => {
  try {
    const { to, message } = req.body;
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    io.emit("new_sms", { to, message });
    res.json({ message: "SMS sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Call Transfer**
app.post("/transfer-call", async (req, res) => {
  try {
    const { callSid, to } = req.body;
    await twilioClient.calls(callSid).update({ twiml: `<Response><Dial>${to}</Dial></Response>` });
    res.json({ message: "Call transferred" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Conference Call**
app.post("/conference", async (req, res) => {
  try {
    const { to } = req.body;
    const call = await twilioClient.calls.create({
      twiml: `<Response><Dial><Conference>SupportRoom</Conference></Dial></Response>`,
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    io.emit("new_conference", { callSid: call.sid, to });
    res.json({ message: "Conference call started", callSid: call.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **Socket Events**
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(3012, () => console.log("Server running on port 3012"));
