import './App.css';
import { useEffect, useState } from 'react';
const Web3 = require("web3");

const contractInterface = require("./contract/Todo.json").abi


function App() {

  const [dataForm, setDataForm] = useState({
    index: 0,
    text: ""
  });

  const [listItems, setListItems] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  
  useEffect(() => {
    listTodo();
  }, [])


  const web3Provider = () => {
    if (window.ethereum) {
      return new Web3(window.ethereum)
    } else {
      alert("plesase install metamask")
    }
  }

  const connectContract = async () => {

    const provider = await web3Provider();
    //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // local dev
    const contractAddress = "0x989b33C4441C729e54b920dE77c83e9Ee81C736f"; //testnet georli
    const accounts = await provider.eth.requestAccounts()
    return new provider.eth.Contract(contractInterface, contractAddress, {
      from: accounts[0]
    });
  }

  const addTodo = async () => {
    const contract = await connectContract();
    await contract.methods.add(dataForm.text).send();
  }

  const editTodo = async () => {
    const contract = await connectContract();
    await contract.methods.edit(dataForm.text, dataForm.index).send();
    setIsEdit(false);
  }

  const submitData = async (e) => {
    e.preventDefault();
    if(isEdit){
      await editTodo();
    }else{
      await addTodo()
    }
   
    alert("Submit is success")
    await listTodo()
    setDataForm(prev => ({
      index: 0,
      text: ""
    }))
  }

  const handleChange = (e) => {
    setDataForm(prev => ({
      ...prev,
      text: e.target.value
    }))
  }

  const listTodo = async () => {
    const contract = await connectContract();
    const lists = await contract.methods.list().call();
    setListItems(lists);
  }


  const handleEdit = (text, index) => {
    setIsEdit(true)
    setDataForm(prev => ({
      index,
      text
    }))
  }

  return (
    <div class="container ">
      <div className='p-8'>
        <div className='card mt-3'>
          <div className='card-header'>
            <h3 className='card-title'>Todo</h3>
          </div>
          <div className='card-body'>
            <form class="row g-3" onSubmit={submitData}>
              <div class="col-12">
                <label>Title</label>
                <input type="text" class="form-control" onChange={handleChange} value={dataForm.text} />
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary mb-3">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className='card mt-3'>
          <div className='card-header'>
            <h3 className='card-title'>Listing</h3>
          </div>
          <div className='card-body'>

            <ul class="list-group">
              {listItems.map((text, index) => {
                return (<li class="list-group-item" key={index}>{text}
                  <button className='btn btn-success ms-2' onClick={() => handleEdit(text, index)}>Edit</button>
                </li>)
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
