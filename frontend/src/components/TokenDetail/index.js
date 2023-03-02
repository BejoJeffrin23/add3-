const TokenDetail = ({ metamask }) => {
  return (
    <div className="mt-10 px-10 lg:px-20 pt-6">
      <h4 className="font-bold">Token Detail</h4>
      <p>Name : {metamask?.tokens?.[0]?.name}</p>
      <p>symbol : {metamask?.tokens?.[0]?.symbol}</p>
      <p>Balance : {metamask?.tokens?.[0]?.balance}</p>
    </div>
  );
};

export default TokenDetail;
