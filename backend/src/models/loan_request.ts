import mongoose from "mongoose";

//TODO [Seb] This is a dummy schema for the loan request. It is not complete and will be updated later.
const loanRequestSchema = new mongoose.Schema({
    amount: Number,
    interest_rate: Number,
    loan_duration: Number,
    status: String,
    lender_address: String,
    borrower_address: String,
});

//TODO [Seb] This is a dummy model for the loan request. It is not complete and will be updated later.
const LoanRequest = mongoose.model("LoanRequest", loanRequestSchema);

export default LoanRequest;
