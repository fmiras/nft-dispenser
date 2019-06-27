pragma solidity ^0.5.0;

/**
 * @title Interface for contracts conforming to ERC-20
 */
contract ERC20Interface {
    function balanceOf(address from) public view returns (uint256);
    function transferFrom(address from, address to, uint tokens) public returns (bool);
    function allowance(address owner, address spender) public view returns (uint256);
}


/**
 * @title Interface for contracts conforming to ERC-721
 */
contract ERC721Interface {
    function ownerOf(uint256 _tokenId) public view returns (address _owner);
    function transferFrom(address _from, address _to, uint256 _tokenId) public;
    function supportsInterface(bytes4) public view returns (bool);
}

contract NFTDispenser {
    // Constants
    bytes4 public constant ERC721_Received = 0x150b7a02;
    
    // Storage
    ERC20Interface mana;
    address tokenAddress;
    uint256 price;
    mapping(uint256 => address) internal nftOwner;
    uint256[] internal nfts;
    mapping(uint256 => uint256) internal nftIndex;
    
    event AddToken(address indexed _owner, uint256 _tokenId);
    event RemoveToken(address indexed _owner, uint256 _tokenId);
    event VendToken(address indexed _user, address indexed _owner, uint256 _tokenId);
    
    constructor(address _tokenAddress, address _mana, uint256 _price) public {
        tokenAddress = _tokenAddress;
        mana = ERC20Interface(_mana);
        price = _price;
    }
    
    function addToken(uint256 _tokenId) public {
        require(
            ERC721Interface(tokenAddress).ownerOf(_tokenId) == address(this),
            "Token not owned by this contract"
        );
        require(nftOwner[_tokenId] == address(0), "The token has added");
        _addToken(msg.sender, _tokenId);
    }
   
    function onERC721Received(
        address _from,
        address /*_to*/,
        uint256 _tokenId,
        bytes memory /*_data*/
    )
        public
        returns (bytes4)
    {
        _addToken(_from, _tokenId);
       
        return ERC721_Received;
    }
    
    function exit(uint256 _tokenId) public {
        require(msg.sender == nftOwner[_tokenId], "The NFT was not yours");
        _transferToken(_tokenId);
        emit RemoveToken(msg.sender, _tokenId);
    }

    
     function vend() public {
         _requireBidderBalance(msg.sender);
        uint256 maxPosition = nfts.length;
        uint256 index = uint256(keccak256(
            abi.encodePacked(now, msg.sender, maxPosition, this)
            )) % maxPosition;
        
        uint256 tokenId = nfts[index];
        address owner = nftOwner[tokenId];
        
        _transferToken(tokenId);
        
        require(
            mana.transferFrom(msg.sender, owner, price),
            "Transfering MANA to owner failed"
        );
        
        emit VendToken(msg.sender, owner, tokenId);
    }
    
    function _addToken(address _from, uint256 _tokenId) internal {
        nftOwner[_tokenId] = _from;
        
        nfts.push(_tokenId);
        nftIndex[_tokenId] = nfts.length - 1;
        
        emit AddToken(_from, _tokenId);
    }
    
    function _transferToken(uint256 _tokenId) internal {
        delete nftOwner[_tokenId];
        
        // TokenId
        // Clean token
        uint256 lastNFTIndex = nfts.length - 1;
        uint256 lastTokenId = nfts[lastNFTIndex];
        uint256 currentNFTIndex = nftIndex[_tokenId];
        
        
        nfts[currentNFTIndex] = lastTokenId;
        nftIndex[lastTokenId] = currentNFTIndex;
        
        delete nfts[lastNFTIndex];
        delete nftIndex[_tokenId];
        
        // Transfer token to the old owner
        ERC721Interface(tokenAddress).transferFrom(address(this), msg.sender, _tokenId);
    }
    
  
    function _requireBidderBalance(address _user) internal view {
        require(
            mana.balanceOf(_user) >= price,
            "Insufficient funds"
        );
        require(
            mana.allowance(_user, address(this)) >= price,
            "The contract is not authorized to use MANA on user behalf"
        );        
    }

}