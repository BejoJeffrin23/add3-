import Pic from "../../assets/eth.jpeg";
import AccountConnection from "./components/accountConnection";
import ChainConnection from "./components/chainConnection";
const ConnectionCard = (props) => {
  return (
    <div className="flex flex-wrap items-center justify-center sm:px-4 md:px-10">
      <div>
        <div className="card xs:max-w-sm  bg-base-100 shadow-xl rounded-2xl bg-white">
          {!props?.metamask?.account ? (
            <figure>
              <img
                src={Pic}
                style={{ width: "100%" }}
                alt="Shoes"
                className="rounded-2xl"
              />
            </figure>
          ) : null}
          <div className="card-body px-4">
            <h2 className="card-title mt-4 pt-3">Welcome Buddy !</h2>

            <AccountConnection metamask={props?.metamask} />
            <ChainConnection metamask={props?.metamask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
