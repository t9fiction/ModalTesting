import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/store';
import { loadBlockChain, loadWalletConnect, switchNetwork, updateAccount } from './functions/allFunctions';

function App() {
  const { web3, accounts, contract } = useAppSelector((state) => state.reducer)
  const dispatch = useAppDispatch()

  const walletConnect = () => {
    dispatch(loadWalletConnect())
  }

  const handleMetamask = () => {
    dispatch(loadBlockChain())
  }

  const changeNetwork = () => {
    dispatch(switchNetwork())
  }

  // account switch
  window.ethereum.on('accountsChanged', async (data) => {
    dispatch(updateAccount(data))
  })

  return (
    <div className="App">
      <header className="App-header">
        HOME
      </header>
      <button onClick={() => handleMetamask()}>
        Connect Metamask
      </button>
      <button onClick={() => changeNetwork()}>
        Add Network
      </button>
      <button onClick={() => walletConnect()}>
        Wallet Connect
      </button>
      <br />
      {accounts}
    </div>
  );
}

export default App;
