import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';

export const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

function getSigner(provider, account) {
  return provider.getSigner(account).connectUnchecked();
}

function getProviderOrSigner(provider, account) {
  return account ? getSigner(provider, account) : provider;
}

export function getExistingContract(
  contract,
  contractAddress,
  provider,
  account
) {
  if (!isAddress(contractAddress) || contractAddress === AddressZero) {
    throw Error(`Invalid 'address' parameter '${contractAddress}'.`);
  }
  const _contract = new Contract(
    contractAddress,
    contract.abi,
    getProviderOrSigner(provider, account)
  );
  return _contract;
}

export const parseEther = (value) => {
  if (ethers.BigNumber.isBigNumber(value)) {
    return value;
  } else {
    return value !== ''
      ? ethers.utils.parseEther(value)
      : ethers.utils.parseEther('0');
  }
};

export const toBN = (value) => {
  return ethers.BigNumber.from(value);
};

export const arrParseEther = (arr) => {
  return arr.map((value) => parseEther(value));
};

export const formatEther = (value) => {
  return ethers.utils.formatEther(value);
};

export const formatGwei = (value) => {
  return ethers.utils.formatUnits(value, 'gwei');
};

export const formatEtherCommify = (value, precision) => {
  return ethers.utils.commify(
    (+ethers.utils.formatEther(value)).toFixed(precision ?? 3)
  );
};

export const formatEtherFixed = (value, precision) => {
  return (+ethers.utils.formatEther(value)).toFixed(precision ?? 3);
};
