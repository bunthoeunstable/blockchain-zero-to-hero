import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Todo from "./modules/todo-list";

const Web3 = require("web3");


function App() {

  const [wallet, setWallet] = useState()
  const [web3Provider, setWeb3Provider] = useState()

  useEffect(() => {
    const provider = new Web3(window.ethereum)
    setWeb3Provider(provider)
  }, []);

  const connect = async () => {
    if(window.ethereum){
      //metamask is installed
      const accounts = await web3Provider.eth.requestAccounts()
      setWallet(accounts[0])
    }else {
      alert("please intall metamask")
    }
  }

  return (
    <div class="container ">
        <div class="card">
          <div class="card-body">
          <div class="p-8">
              <h2>wallet address: {wallet}</h2>
              <p>
                {!wallet && <a href="#" onClick={connect} >Connect</a>} 
              </p>
            </div>
          </div>
          <div className='p-8'>
            <div className='card'>
              <div className='card-body'>
                <Todo web3Provider={web3Provider} wallet={wallet}/>
              </div>
            </div>
             
          </div>
        </div>
    </div>
  );
}

export default App;
