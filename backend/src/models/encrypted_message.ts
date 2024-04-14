import mongoose from "mongoose";

const EncryptedMessageSchema = new mongoose.Schema({
    senderPK: String,
    receiverPK: String,
    encryptedMessage: String,
    signature: String,
});

// Tentative to change
const EncryptedMessage = mongoose.model("EncryptedMessage", EncryptedMessageSchema);

export default EncryptedMessage;