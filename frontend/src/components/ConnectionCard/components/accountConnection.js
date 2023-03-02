const AccountConnection = ({ metamask }) => {
  return (
    <div
      className={`flex flex-wrap ${
        !metamask.account ? "justify-center" : "justify-left"
      } my-4`}
    >
      {metamask.account ? (
        <p>{metamask.account}</p>
      ) : (
        <button
          onClick={() => {
            metamask.connectToMetamask();
          }}
          type="button"
          className=" inline-block mb-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          {"Connect Metamask"}
        </button>
      )}
    </div>
  );
};
export default AccountConnection;
