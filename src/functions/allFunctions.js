import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contract/contract";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import Web3 from "web3";
const { ethereum } = window;

// LoadBlockchain
export const loadBlockChain = createAsyncThunk("loadBlockChain", async (_, thunkAPI) => {
  try {
    if (!ethereum) {
      console.log("!ethereum")
    } else {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const { chainId } = await provider.getNetwork()
      console.log("ChainID :", chainId)
      if (chainId !== 4) {
        alert("Rinkeby not connected")
      }
      // else {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      return {
        web3: provider,
        contract: contract,
        accounts: accounts
      }
      // }
    }
  } catch (error) {
    alert("Error in catch")
  }
})


//Function to Switch network
export const switchNetwork = createAsyncThunk("switchNetwork", async (_, thunkAPI) => {
  if (ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code == 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x61',
                chainName: "BSC Test",
                nativeCurrency: {
                  name: "bnb",
                  symbol: "bnb",
                  decimals: 18
                },
                blockExplorerUrls: [
                  "https://testnet.bscscan.com"
                ],
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"]
              }
            ]
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
  }
})

// by Sir, also it uses web3 instead of ethers
// const switchNetwork = async () => {
//     try {
//         await web3.currentProvider.request({
//             method: 'wallet_switchEthereumChain',
//             params: [{ chainId: "0x61" }]
//         })
//     } catch (error) {
//         if (error.code == 4902) {
//             await window.ethereum.request({
//                 method: 'wallet_addEthereumChain',
//                 params: [
//                     {
//                         chainId: '0x61',
//                         chainName: "bsc testnet",
//                         nativeCurrency: {
//                             name: "bnb",
//                             symbol: "bnb",
//                             decimals: 18
//                         },
//                         blockExplorerUrls: [
//                             "https://testnet.bscscan.com"
//                         ],
//                         rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"]
//                     }
//                 ]
//             })
//         }
//         console.log("error", error)
//     }
// }


// walletConnect

export const loadWalletConnect = createAsyncThunk("loadWalletConnect", async (_, thunkAPI) => {
  try {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      rpc: {
        4: "https://rinkeby.infura.io/v3/17342b0f3f344d2d96c2c89c5fddc959"
      },
      chainId: 4,
    });
    console.log(provider, "Provider")

    if (provider) {
    await provider.enable();

    //  Create Web3
    const web3 = new Web3(provider);

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    return {
      web3,
      accounts,
      contract
    }
    } else {
    return {
      web3LoadingErrorMessage: "Error in connecting Wallet"
    }
    }
  } catch (error) {
    console.log(error, "error")
    alert("Error in catch")
  }
})


export const updateAccount = createAsyncThunk("updateAccount", async (data, thunkAPI) => {
  try {
      let accounts =  data
          return {
              accounts,
          }
      }
  
  catch (error) {
      console.log("error", error)
  }
})