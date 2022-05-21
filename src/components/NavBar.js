import { HStack } from '@chakra-ui/react';
import React from 'react';
import { ConnectWalletButton } from './buttons';

export const NavBar = (props) => {
  return (
    <HStack justifyContent="flex-end" w="100%">
      <ConnectWalletButton />
      {/* <ColorModeButton /> */}
    </HStack>
  );
};
