import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';
import { tokenAddress, tokenAbi } from '../utils/VestingToken';
import { contractAddress, abi } from '../utils/Vesting';

const ConnectMetamaskContext = createContext();
const ConnectProvider = ({ children }) => {

    const [address, setAddress] = useState();
    const [balance, setBalance] = useState();
    const [contract, setContract] = useState();
    const [ercContract, setercContract] = useState();


    const connectToWallet = async () => {
        if (typeof web3 !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                console.log(provider)

                const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAddress(selectedAccount);

                const balance = await window.ethereum.request({
                    "method": "eth_getBalance",
                    "params": [
                        selectedAccount,
                      'latest'
                    ]
                  });
                  setBalance(ethers.formatEther(balance));

                  const signer = await provider.getSigner(selectedAccount);

                  const vestingTokenInstance = new ethers.Contract(tokenAddress, tokenAbi, signer)
                  setercContract(vestingTokenInstance)

                  const vestingInstance = new ethers.Contract(contractAddress, abi, signer);
                  setContract(vestingInstance)

                  alert(`Successfully Connect with Metamask: ${selectedAccount}`)
            } catch (error) {
                alert(`Error to connect with Metamask: ${error.message}`)
            }
        }
        else {
            alert(`Please install Metamask!!!`)
        }
    };
    return (
        <ConnectMetamaskContext.Provider value={{ connectToWallet, address, balance, ercContract, contract }}>
            {children}
        </ConnectMetamaskContext.Provider>
    );
};

export { ConnectProvider, ConnectMetamaskContext };