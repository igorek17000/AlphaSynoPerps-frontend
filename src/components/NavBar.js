import { HStack } from '@chakra-ui/react';
import React from 'react';
import { ConnectWalletButton, ColorModeButton } from './buttons';

export const NavBar = (props) => {
  return (
    <HStack h={'4rem'} justifyContent="flex-end" w="100%">
      <ConnectWalletButton />
      {/* <ColorModeButton /> */}
    </HStack>
  );
};
