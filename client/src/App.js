import Drive from './artifacts/contracts/Drive.sol/Drive.json';
import './App.css';
import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import Display from './components/Display';
import FileUpload from './components/FileUpload';
import Modal from "./components/Modal";
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Drive.abi,
          signer
        );
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);


  return (
    <>
      {!modalOpen && (<button onClick={() => setModalOpen(true)}>Share</button>)}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
      <div className="App">
        <h1 style={{ color: "#ff0000" }}> Bhargav's Drive Web3.0</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <div className="bg bg4"></div>
        <p style={{ color: "white" }}>Account: <u>{account ? account : "Account not connected!!!"}</u></p>
        <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}
export default App;
