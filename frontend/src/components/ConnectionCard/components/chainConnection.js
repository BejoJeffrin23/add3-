const ChainConnection = ({ metamask }) => {
  const goerliChainId = "0x5";

  return (
    <>
      {metamask.account ? (
        <div
          className={`flex flex-wrap ${
            !metamask.account ? "justify-center" : "justify-left"
          } my-4`}
        >
          {metamask.chain === goerliChainId ? (
            <p className="my-2">Chain : Goerli Testnet</p>
          ) : (
            <div
              className={`flex flex-wrap 
              justify-center
             my-4`}
            >
              <p>Please connect to Goerli testnet</p>
              <button
                onClick={() => {
                  metamask.switchNetwork("0x5");
                }}
                type="button"
                className=" inline-block mb-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                {"Switch to GOERLI"}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default ChainConnection;
