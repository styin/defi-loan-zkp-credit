import mongoose from "mongoose";

const EncryptedMessageSchema = new mongoose.Schema({
    senderPK: String,
    receiverPK: String,
    encryptionPackage: String
});

// Tentative to change
const EncryptedMessage = mongoose.model("EncryptedMessage", EncryptedMessageSchema);

export default EncryptedMessage;
