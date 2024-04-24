import LoanRequestInterface from "../interfaces/loanRequestInterface";

const LoanRequestCard = ({ loanRequest }: { loanRequest: LoanRequestInterface }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-gray-600">
                <strong>Wallet Address:</strong> {loanRequest.walletAddress}
            </div>
            <div className="text-gray-600">
                <strong>RSA Public Key:</strong> {loanRequest.rsaPK}
            </div>
            <div className="text-gray-600">
                <strong>Signed RSA Public Key:</strong> {loanRequest.signedRSAPK}
            </div>
            <div className="text-gray-600">
                <strong>Amount:</strong> {loanRequest.amount}
            </div>
            <div className="text-gray-600">
                <strong>Discounted Amount:</strong> {loanRequest.discountedAmount}
            </div>
            <div className="text-gray-600">
                <strong>Duration:</strong> {loanRequest.duration} days
            </div>
            <div className="text-gray-600">
                <strong>Additional Notes:</strong> {loanRequest.additionalNotes}
            </div>
        </div>
    );
}

export default LoanRequestCard;
