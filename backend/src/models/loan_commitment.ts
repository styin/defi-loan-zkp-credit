import mongoose from "mongoose";

const LoanCommitmentSchema = new mongoose.Schema({
    y: Number,
    lenderSignedY: String,
    borrowerSignedY: String
});

const LoanCommitment = mongoose.model("LoanCommitment", LoanCommitmentSchema);

export default LoanCommitment;
