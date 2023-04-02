
const contractInterface = require("../../contract/sample-lock.json").abi;

export default function Index(props) {

    const { web3Provider, wallet } = props;

    const connectContract = async () => {
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const accounts = await web3Provider.eth.requestAccounts()
        return new web3Provider.eth.Contract(contractInterface, contractAddress, {
            from: accounts[0]
        });
    }

    const withdraw = async () => {
        const contract = await connectContract();
        // console.log(contract)

        const txn =  await contract.methods.withdraw().send();
        console.log(txn)
    }

    return(<>
        <h1>Todo</h1>
        <a href="#" onClick={withdraw}>Withdraw</a>
    </>)
}