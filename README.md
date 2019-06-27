# NFT Vending Machine

This is a proof of concept. It consists in NFT vending machines backed by a vending smart contract which receives an X amount of MANA and it transfers to the payer the deposited NFT. This example is working with LAND (so we can develop it in Ropsten) but think for example of cryptokitties, with an instant feedback which is the usage of it at the DCL Builder, or a sword in a game.

## Usage

- Open the scene
- Click the LAND machine to approve MANA to the NFTDispenser contract
- Once the transaction is confirmed, click a second time the machine to execute the NFTDispenser
- Enjoy your new NFT

## Notes 

Besides the NFT Machine, a new concept can appear on this project: Smart Entities

Smart Entities could be libraries that anyone can import with behaviour already programmed, if you check this code there is a function `createLandMachine()` with all the code needed to work and DCL developers would be able to install them into their scenes without even knowing to use either `web3` or `eth-connect`. More kind of entities could be done this way, just like MANA-ETH ATMs, more types of vending machines, NFT terminal editors, etc. 
