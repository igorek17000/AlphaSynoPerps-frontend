import './App.css';
import useWallet from './hooks/useWallet';
import { useWeb3React } from '@web3-react/core';

function App() {
  const { connectWallet } = useWallet();
  const { account, library } = useWeb3React();
  console.log(account, library);
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>{account}</div>
    </div>
  );
}

export default App;
