// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./token/ERC20/ERC20.sol";
contract Mongttang is ERC20{
    address private deployer;

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_) ERC20(name_, symbol_){
        _mint(_msgSender(), totalSupply_);
        deployer = _msgSender();
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function balanceOfDeployer() public view returns (uint256){
        return balanceOf(deployer);
    }
}