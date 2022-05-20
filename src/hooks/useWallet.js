import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import metamaskLogo from '../assets/metamask.png';

const useWallet = () => {
  const { activate, deactivate } = useWeb3React();
  const ethereum = window.ethereum;

  const connect = async (connector) => {
    console.log('hiii');
    try {
      if (!(window.web3 || ethereum)) {
        console.log('Metamsk not installed');
      } else {
        await activate(connector);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const changeChain = async (chainId) => {
  //   const hexChainId = decToHex[chainId];
  //   try {
  //     await ethereum.request({
  //       method: 'wallet_switchEthereumChain',
  //       params: [{ chainId: hexChainId }],
  //     });
  //   } catch (switchError) {
  //     if (switchError.message.includes('wallet_addEthereumChain')) {
  //       try {
  //         await ethereum.request({
  //           method: 'wallet_addEthereumChain',
  //           params: [chainProperties[supportedChainIds[chainId]]],
  //         });
  //       } catch (addError) {}
  //     } else {
  //       throw switchError;
  //     }
  //   }
  // };

  const connectors = {
    metamask: ['Metamask', injected, metamaskLogo],
  };

  const connectWallet = () => {
    connect(injected);
  };

  return { connect, connectors, connectWallet, deactivate };
};

export default useWallet;
