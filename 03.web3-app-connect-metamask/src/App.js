import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const Web3 = require("web3");

function App() {

  const [wallet, setWallet] = useState()
  const connect = async () => {
    if(window.ethereum){
      //metamask is installed
      const provider = new Web3(window.ethereum)
      const accounts = await provider.eth.requestAccounts()
      setWallet(accounts[0])
    }else {
      alert("please intall metamask")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>{wallet}</h2>
        <p>
         <a href="#" onClick={connect} >Connect</a>
        </p>
      </header>
    </div>
  );
}

export default App;
