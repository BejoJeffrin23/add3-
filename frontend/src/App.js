import ConnectionCard from "./components/ConnectionCard";
import MintList from "./components/MintList";
import MintSection from "./components/MintSection";
import TokenDetail from "./components/TokenDetail";
import { useMetamask } from "./hooks/accountAndChain";

function App() {
  const metamask = useMetamask();

  return (
    <div
      className={`h-full min-h-screen flex flex-col items-center justify-center`}
      style={{
        backgroundImage:
          "linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )",
      }}
    >
      {metamask.showSuccessModal ? (
        <button
          onClick={() => {
            metamask.setShowSuccessModal(false);
          }}
          type="button"
          className="fixed top-4 right-4 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
        >
          <div class="flex items-center space-x-2">
            <span class="text-3xl">
              <i class="bx bx-check"></i>
            </span>
            <p class="font-bold">{metamask?.successMessage}</p>
          </div>
        </button>
      ) : null}
      <>
        <ConnectionCard metamask={metamask} />
        {metamask?.account && metamask.chain === "0x5" ? (
          <>
            <div className="flex flex-col md:flex-row ">
              <TokenDetail metamask={metamask} />
              <MintSection metamask={metamask} />
            </div>
            <MintList metamask={metamask} />
          </>
        ) : null}
      </>
    </div>
  );
}

export default App;
