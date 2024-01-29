// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./MintFactory.sol";
import "./IMetadataRenderer.sol";

contract RGBMintFactory is MintFactory {
    mapping(uint32 => bool) public mintedColors; // To track minted RGB colors

    constructor(address _mintModuleRegistry, address _mint721Implementation) MintFactory(_mintModuleRegistry, _mint721Implementation) {}

    function mintRGB(uint8 R, uint8 G, uint8 B) public {
        uint32 color = uint32(R) << 16 | uint32(G) << 8 | uint32(B);
        require(!mintedColors[color], "Color already minted");
        mintedColors[color] = true;
        // Add your minting logic here, possibly calling `createBasicEdition`
    }
}
