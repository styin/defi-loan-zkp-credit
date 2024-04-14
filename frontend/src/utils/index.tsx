export const formatBalance = (rawBalance: string) => {
    // convert rawBalance<string> to a number and divide by 10^18 (1 ether = 10^18 wei)
    // then round to 2 decimal places
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
    return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
    // convert chainIdHex<string> to an integer
    const chainIdNum = parseInt(chainIdHex);
    return chainIdNum;
}

export const formatAddress = (addr: string) => {
    return `${addr.substring(0, 16)}...`;
};
