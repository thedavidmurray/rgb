// useMintNFT.js
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import RGBMintFactoryABI from '../abis/RGBMintFactory.json';

const useMintNFT = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const rgbMintFactory = new ethers.Contract(contractAddress, RGBMintFactoryABI, signer);
    setContract(rgbMintFactory);
  }, []);

  const mintNFT = async (R, G, B) => {
    try {
      const tx = await contract.mintRGB(R, G, B);
      await tx.wait();
      console.log('NFT minted successfully');
    } catch (error) {
      console.error('Minting failed', error);
    }
  };

  return { mintNFT };
};

export default useMintNFT;

