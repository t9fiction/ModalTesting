import './App.css';
import { useAppDispatch, useAppSelector } from './app/store';
import { loadBlockChain, loadWalletConnect, switchNetwork, updateAccount, updateChain, loadModalConnect, loadDisconnect } from './functions/allFunctions';

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

  const web3ModalConnect = () => {
    dispatch(loadModalConnect())
  }

  // const web3Disconnect = (data) => {
  //   dispatch(loadDisconnect(data))
  // }


  // account switch
  window.ethereum.on('accountsChanged', async (data) => {
    dispatch(updateAccount(data))
  })

  // Chain switch
  window.ethereum.on('chainChanged', async (data) => {
    dispatch(updateChain(data))
  })

  // disconnect
  window.ethereum.on("disconnect", (code, reason) => {
    // dispatch(updateChain(data))
    console.log(code, reason);
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
      <button onClick={() => web3ModalConnect()}>
        Modal
      </button>
      <button onClick={() => web3.disconnect()}>
        DC
      </button>
      <br />
      {accounts}
    </div>
  );
}

export default App;
