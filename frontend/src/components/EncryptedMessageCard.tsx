import EncryptedMessageInterface from "../interfaces/encryptedMessageInterface";

const EncryptedMessageCard = ({ encryptedMessage }: { encryptedMessage: EncryptedMessageInterface }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-gray-600">
                <strong>Sender Public Key:</strong> {encryptedMessage.senderPK}
            </div>
            <div className="text-gray-600">
                <strong>Encryption Package:</strong> {encryptedMessage.encryptionPackage}
            </div>
        </div>
    );
}

export default EncryptedMessageCard;
