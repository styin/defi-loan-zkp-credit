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

app.post("/api/post_request", async (req, res) => {
    const { walletAddress, amount, discountedAmount, duration, additionalNotes } = req.body;
    // create a new loan request
    const loanRequest = new LoanRequest({
            walletAddress,
            amount,
            discountedAmount,
            duration,
            additionalNotes
    });
    // save the loan request to the database
    await loanRequest.save()
        .then(() => {
            res.status(201).json({ message: 'Loan request saved successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to save loan request' });
        });
});

app.post('/api/send_message', async (req, res) => {
    const { senderPK, receiverPK, encryptionPackage } = req.body;
    // create a new message
    const newMessage = new EncryptedMessage({
      senderPK,
      receiverPK,
      encryptionPackage
    });
    // save the message to the database
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
