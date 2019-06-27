import { getProvider } from '@decentraland/web3-provider'
import * as EthConnect from '../node_modules/eth-connect/esm'
import manaAbi from './abi/MANAToken'
import { getUserAccount } from '@decentraland/EthereumController'

const manaAddress = '0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb'
const nftDispenserAddress = '0x4b7fa580c215a6fce6ca51d2e4e54b4f7858e92c'

declare var console: any
declare var setTimeout: any

const canvas = new UICanvas()
const text = new UIText(canvas)
text.value = ''

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

async function clearTxText(): Promise<void> {
  await sleep(3000)
  text.value = ''
}

function waitForTx(txHash: string) {
  // TODO use an eth filter here
  return sleep(15000)
}

export async function approveMana() {
  try {
    text.value = 'Preparing transaction...'
    const provider = await getProvider()
    const requestManager = new EthConnect.RequestManager(provider)
    const factory = new EthConnect.ContractFactory(requestManager, manaAbi)
    const contract = await factory.at(manaAddress)
    const address = await getUserAccount()
    text.value = 'Waiting for approval...'
    const txHash = await contract['approve'](nftDispenserAddress, 1000000000000000000000, {
      from: address,
      gasPrice: 76000000000
    })
    text.value = `Waiting for confirmation of TxHash ${txHash}`
    await waitForTx(txHash)
    text.value = 'MANA Approved transaction confirmed'
    log('MANA approved: ', txHash)
  } catch (error) {
    text.value = `Transaction Rejected.`
    console['log']('error', error)
    clearTxText()
  }
}

export async function vend() {
  try {
    text.value = 'Preparing transaction...'
    const provider = await getProvider()
    const requestManager = new EthConnect.RequestManager(provider)
    const factory = new EthConnect.ContractFactory(requestManager, manaAbi)
    const contract = await factory.at(nftDispenserAddress)
    const address = await getUserAccount()
    text.value = 'Waiting for approval...'
    const txHash = await contract['vend']({
      from: address,
      gasPrice: 76000000000
    })
    text.value = `Waiting for confirmation of TxHash ${txHash}`
    await waitForTx(txHash)
    text.value = 'NFT Dispenser Transaction confirmed, check your new NFT!'
  } catch (error) {
    text.value = `Transaction Rejected.`
    console['log']('error', error)
    clearTxText()
  }
}
