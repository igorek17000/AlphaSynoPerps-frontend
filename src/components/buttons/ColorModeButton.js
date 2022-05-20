import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

export const ColorModeButton = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  return (
    <IconButton
      icon={<Icon as={isDarkMode ? BiMoon : BiSun} />}
      alignSelf="center"
      onClick={() => {
        toggleColorMode();
      }}
    >
      Color Mode
    </IconButton>
  );
};
