import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postFetch } from "../../fetch/postFetch";

const MintSection = ({ metamask }) => {
  const queryClient = useQueryClient();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const {
    isLoading,
    mutate,
    // eslint-disable-next-line no-unused-vars
    data: postData,
  } = useMutation(async (data) => await postFetch(data), {
    onSuccess: (success) => {
      queryClient.invalidateQueries("MINT_DATA");
    },
  });

  const saveData = (address, amount) => {
    mutate({
      api: "http://localhost:3001/mintdata",
      data: {
        userAddress: metamask.account,
        recieverAddress: address,
        amount,
      },
    });
  };

  const callMint = async (address, amount) => {
    let validAddress = await metamask.validateAddress(address);
    console.log({ validAddress });
    if (!validAddress) {
      alert("Please enter a valid wallet address");
    } else if (amount <= 0) {
      alert("Please enter a the amount");
    } else {
      try {
        const result = await metamask.mintToken(address, amount);
        if (result) saveData(address, amount);
        setAddress("");
        setAmount(0);
      } catch (err) {}
    }
  };

  return (
    <div className="mt-10">
      <p>Minting Area</p>
      <div className=" mt-4">
        <input
          class="enabled:hover:border-gray-400 disabled:opacity-75 px-4"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Wallet Address"
        />
      </div>
      <div className=" mt-4">
        <input
          class="enabled:hover:border-gray-400 disabled:opacity-75 px-4"
          placeholder="Amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button
          className="ml-4 bg-sky-500 hover:bg-sky-700 px-4 py-2 rounded-md"
          onClick={() => {
            callMint(address, amount);
          }}
        >
          mint
        </button>
      </div>
    </div>
  );
};

export default MintSection;
