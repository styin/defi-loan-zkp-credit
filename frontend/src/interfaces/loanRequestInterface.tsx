interface LoanRequestInterface {
    walletAddress: string,
    rsaPK: string,
    signedRSAPK: string,
    amount: number,
    discountedAmount: number,
    duration: number, // days
    additionalNotes: string
}

export default LoanRequestInterface;