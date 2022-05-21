import { Button, Icon, Box } from '@chakra-ui/react';
import React from 'react';
import { BiWallet } from 'react-icons/bi';
import { useWeb3React } from '@web3-react/core';
import useWallet from '../../hooks/useWallet';
export const ConnectWalletButton = (props) => {
  const { account } = useWeb3React();
  const { connectWallet } = useWallet();
  return account ? (
    <Button variant="ghost" leftIcon={<Icon as={BiWallet} />}>
      {account.substring(0, 6)}...
      {account.substr(account.length - 4)}
    </Button>
  ) : (
    <Button
      variant="border"
      leftIcon={<Icon as={BiWallet} />}
      onClick={() => {
        connectWallet();
      }}
    >
      Connect Wallet
    </Button>
  );
};
