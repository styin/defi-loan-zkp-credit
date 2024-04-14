import express from "express";
import bodyParser from 'body-parser';
import mongoose, { mongo } from "mongoose";

import { config } from "dotenv";
config();
const mongoURI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 5000;

// model imports
import LoanRequest from "./models/loan_request";
import EncryptedMessage from "./models/encrypted_message";


const app = express();
// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS
const host = 'http://localhost:5173';
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', host);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// TODO [Seb] This is a dummy route for the loan request. It is not complete and will be updated later.
app.post("/api/loan_req", async (req, res) => {
    // liaison
    res.send("The loan request has been received!");
    console.log("[loan_req] Loan request received: ", req.body);
    // dummy loan request
    const loanRequest = new LoanRequest(
        {
            amount: 1000,
            interest_rate: 0.05,
            loan_duration: 12,
            status: "pending",
            lender_address: "0x123",
            borrower_address: "0x456"
        }
    );
    // save the loan request to the database
    await loanRequest.save()
        .then((result) => {
            console.log("[loan_req] Loan request saved: ", result);
        })
        .catch((err) => {
            console.log("[ERROR] Error saving loan request: ", err);
        });
});

app.post('/api/send_message', async (req, res) => {
    const { senderPK, receiverPK, encryptedMessage, signature } = req.body;
  
    const newMessage = new EncryptedMessage({
      senderPK,
      receiverPK,
      encryptedMessage,
      signature
    })
  
    await newMessage.save()
      .then(() => {
        res.status(201).json({ message: 'Message saved successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to save message' });
      });
});

// database connection
const db = mongoose.connect(mongoURI)
    .then(() => {
        console.log("[STARTUP] Connected to the database!");
        app.listen(PORT);
        console.log(`[STARTUP] Server is running on port ${PORT}!`);
    })
    .catch((err) => {
        console.log("Error connecting to the database: ", err);
    });
