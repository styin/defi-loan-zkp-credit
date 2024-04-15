import mongoose from "mongoose";

const loanRequestSchema = new mongoose.Schema({
    walletAddress: String,
    amount: Number,
    discountedAmount: Number,
    duration: Number, // days
    additionalNotes: String
});

const LoanRequest = mongoose.model("LoanRequest", loanRequestSchema);

export default LoanRequest;
