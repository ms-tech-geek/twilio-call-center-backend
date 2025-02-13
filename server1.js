// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const twilio = require("twilio");
// // const http = require("http");
// // const socketIo = require("socket.io");
// // const multer = require("multer");
// // let dotenv = require("dotenv");
// // dotenv.config();
// // const axios = require('axios');
// // const app = express();
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());
// // const server = http.createServer(app);
// // const io = socketIo(server, {
// //     cors: {
// //         origin: "*",
// //         methods: ["GET", "POST"]
// //     }
// // });

// // Store uploaded images in an array
// let images = [];
// let streamingActive = false;
// let interval = null;
// let clients = new Set();

// // Multer setup for image uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.use(express.static("public"));

// // Twilio Config
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioClient = twilio(accountSid, authToken);
// const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

// app.get("/", (req, res) => res.send("Twilio Call Center API"));





// // Start server
// const PORT = process.env.PORT || 5555;
// server.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server running on http://<System-A-public-IP>:${PORT}`);
// });

// // Making a Phone Call
// // app.post("/call", async (req, res) => {
// //     try {
// //       const { to } = req.body;
  
// //       const call = await twilioClient.calls.create({
// //         url: "http://demo.twilio.com/docs/voice.xml", // Replace with your TwiML URL
// //         to,
// //         from: twilioNumber,
// //       });
  
// //       res.json({ success: true, callSid: call.sid });
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   });
 
// //   //Sending SMS
// // app.post("/sms", async (req, res) => {
// //     try {
// //       const { to, message } = req.body;
  
// //       const sms = await twilioClient.messages.create({
// //         body: message,
// //         from: twilioNumber,
// //         to,
// //       });
  
// //       res.json({ success: true, messageSid: sms.sid });
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// // });

// // // Warm Call Transfer
// // app.post("/transfer", async (req, res) => {
// //     try {
// //       const { from, to } = req.body;
  
// //       const call = await twilioClient.calls.create({
// //         twiml: `<Response><Dial><Number>${to}</Number></Dial></Response>`,
// //         from,
// //         to,
// //       });
  
// //       res.json({ success: true, transferCallSid: call.sid });
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// // });


// // // Warm Conference Call
// // app.post("/conference", async (req, res) => {
// //     try {
// //       const { to } = req.body;
  
// //       const call = await twilioClient.calls.create({
// //         twiml: `<Response><Dial><Conference>SupportRoom</Conference></Dial></Response>`,
// //         from: twilioNumber,
// //         to,
// //       });
  
// //       res.json({ success: true, conferenceCallSid: call.sid });
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// // });

// // // Call Recording
// // app.post("/record", async (req, res) => {
// //     try {
// //       const { to } = req.body;
  
// //       const call = await twilioClient.calls.create({
// //         twiml: `<Response><Record/></Response>`,
// //         from: twilioNumber,
// //         to,
// //       });
  
// //       res.json({ success: true, recordingCallSid: call.sid });
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// // });

// // //Twilio Webhook (For Call Events)
// // app.post("/twilio-webhook", (req, res) => {
// //     console.log("Twilio Webhook Data:", req.body);
// //     res.sendStatus(200);
// // });
  
  
  
  


// // Handle image upload
// // app.post("/upload", upload.array("images"), (req, res) => {
// //     req.files.forEach(file => {
// //         images.push(`data:image/png;base64,${file.buffer.toString("base64")}`);
// //     });

// //     if (!streamingActive && images.length > 0) {
// //         startStreaming();
// //     }

// //     res.json({ success: true, message: "Images uploaded successfully!" });
// // });

// // // Function to start streaming images
// // function startStreaming() {
// //     let index = 0;
// //     streamingActive = true;
    
// //     io.emit("streamStart", { message: "Stream Started" });

// //     interval = setInterval(() => {
// //         if (clients.size === 0) {
// //             stopStreaming(); // Stop if no clients are connected
// //             return;
// //         }
// //         if (images.length > 0) {
// //             io.emit("frame", images[index]);
// //             index = (index + 1) % images.length;
// //         }
// //     }, 700);
// // }

// // // Function to stop streaming
// // function stopStreaming() {
// //     if (streamingActive) {
// //         streamingActive = false;
// //         clearInterval(interval);
// //         images = [];
// //         io.emit("streamStop", { message: "Stream Stopped" });
// //         console.log("Streaming stopped.");
// //     }
// // }

// // // Handle stop stream request from frontend
// // app.post("/stop-stream", (req, res) => {
// //     stopStreaming();
// //     res.json({ success: true, message: "Streaming stopped successfully!" });
// // });

// // // Handle socket connection
// // io.on("connection", (socket) => {
// //     console.log("New client connected:", socket.id);
// //     clients.add(socket.id);

// //     socket.on("stopStream", () => {
// //         stopStreaming();
// //     });

// //     socket.on("disconnect", () => {
// //         console.log("Client disconnected:", socket.id);
// //         clients.delete(socket.id);

// //         if (clients.size === 0) {
// //             stopStreaming();
// //         }
// //     });
// // });












// // const API_KEY = 'njKJ8xtC7ds_4VO_CFSP5gd0jGjhOJu31Ar9gRsxLPk';
// // const BASE_URL = 'https://api.joinhomebase.com/v1'; // Replace with the actual base URL

// // const headers = {
// //   'Authorization': `Bearer ${API_KEY}`,
// //   'Content-Type': 'application/json',
// // };

// // // Function to fetch user details
// // app.get("/fetchuser/",fetchUserDetails);
// // app.get("/fetchtime",fetchTimesheets);

// // async function fetchUserDetails() {
// //   try {
// //     const userId = "24516474"; 
// //     const response = await axios.get(`${BASE_URL}/users/${userId}`, { headers });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching user details:', error);
// //   }
// // }

// // // Function to fetch timesheets
// // async function fetchTimesheets() {
// //   try {
// //     const response = await axios.get(`${BASE_URL}/timesheets`, { headers });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching timesheets:', error.message);
// //   }
// // }

// // // Add more functions as needed

// // module.exports = {
// //   fetchUserDetails,
// //   fetchTimesheets,
// //   // Export other functions
// // };
