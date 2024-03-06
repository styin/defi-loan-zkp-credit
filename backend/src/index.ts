import express from "express";
import mongoose, { mongo } from "mongoose";

import { config } from "dotenv";
config();
const mongoURI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 5000;

// model imports
import LoanRequest from "./models/loan_request";



const app = express();

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
