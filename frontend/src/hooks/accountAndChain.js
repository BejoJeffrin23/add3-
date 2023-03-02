import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { tokenAbi } from "../utils/tokenAbi";
export const useMetamask = () => {
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState("");
  const [tokens, setTokens] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts;
  };

  const getBalances = async (account) => {
    const accounts = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });
    return accounts;
  };

  const connectToMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      // Instance web3 with the provided information
      try {
        // Request account access
        let acc = await getAccount();
        let balance = await getBalances(acc[0]);
        console.log({ balance, acc });
        setAccount(acc[0]);
        setChain(window.ethereum.chainId);
      } catch (error) {
        console.log({ error });
      }
    } else {
      console.log("please install metamask");
    }
  };

  // function to maintain connection on refresh
  const onLoad = async () => {
    if (typeof window.ethereum !== "undefined") {
      const fetchedAccount = await window.ethereum.request({
        method: "eth_accounts",
      });
      //window.ethereum.selectedAddress; //window.ethereum._state.account;
      if (fetchedAccount) {
        setAccount(fetchedAccount[0]);
        setChain(window.ethereum.chainId);
        fetchTokenBalance(fetchedAccount[0]);
      }
    } else {
      console.log("Please connect the metamask wallet");
    }
  };

  //"0x38" // bsc
  // "0x4"
  // 97 test bsc
  // switches network to the one provided
  const switchNetwork = async (chainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      setChain(chainId);
    } catch (err) {
      console.log(err);
    }
    // refresh
    // window.location.reload();
  };

  async function validateAddress(address) {
    try {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      await provider.getBalance(address);
      console.log(`Address validated`);
      return true;
    } catch (error) {
      console.log(`Invalid address: ${address}`);
      return false;
    }
  }
  const convertToNumber = (hex, decimals = 18) => {
    if (!hex) return 0;
    return ethers.utils.formatUnits(hex, decimals);
  };
  const getTokenBalance = async (tokenList, wallet, provider) => {
    console.log("getting all token balances");

    // array to store all balance requests
    let proms = [];
    let results = [];
    for (const tkn of tokenList) {
      // create ERC20 token contract instance
      const erc20 = new ethers.Contract(tkn.address, tokenAbi, provider);
      // save request in array of Promises
      proms.push(erc20.balanceOf(wallet));
    }
    // actually requests all balances simultaneously
    const promiseResults = await Promise.allSettled(proms);
    // loop through all responses to format response
    for (let index = 0; index < promiseResults.length; index++) {
      // transforms balance to decimal
      const bal = convertToNumber(
        promiseResults[index]?.value,
        tokenList[index]?.decimals
      );
      // save balance with token name and symbol
      results.push({
        name: tokenList[index]?.name,
        symbol: tokenList[index]?.symbol,
        balance: Number(bal),
      });
    }
    results?.map((item) => {
      let obj = {
        logo: item?.logo,
        coinName: item?.name,
        symbol: item?.symbol,
        quantity: item?.balance?.toFixed(5),
      };
      return obj;
    });

    return results;
  };
  const fetchTokenBalance = async (account) => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    let tokensData = await getTokenBalance(
      [
        {
          address: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
          name: "Test Token",
          symbol: "TTK",
        },
      ],
      account,
      provider
    );
    setTokens(tokensData);
  };
  const mintToken = async (address, amount) => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner();

    const tokenInstance = new ethers.Contract(
      process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
      tokenAbi,
      signer
    );
    console.log(tokenInstance);
    let tx = await tokenInstance.mint(
      address,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    let reciept = await tx.wait();
    if (reciept) {
      setShowSuccessModal(true);
      setSuccessMessage(`${amount} Tokens Minted to Address ${address}`);
    }
    return true;
  };

  useEffect(() => {
    console.log("metamask hook getting called");
    onLoad();
    if (window.ethereum) {
      window.ethereum.on("chainChanged", onLoad);
      window.ethereum.on("accountsChanged", onLoad);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", onLoad);
        window.ethereum.removeListener("accountsChanged", onLoad);
      }
    };
  }, []);

  return {
    onLoad,
    chain,
    account,
    connectToMetamask,
    metamaskAssetsLoading: false,
    switchNetwork,
    mintToken,
    validateAddress,
    tokens,
    showSuccessModal,
    setShowSuccessModal,
    successMessage,
  };
};
