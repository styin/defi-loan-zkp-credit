import mongoose from "mongoose";

const RSAMappingSchema = new mongoose.Schema({
    walletAddress: String,
    RSAPK: String,
    signedRSAPK: String
});

const RSAMapping = mongoose.model("RSAMapping", RSAMappingSchema);

export default RSAMapping;
