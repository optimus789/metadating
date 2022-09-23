import { Wallet, providers } from 'ethers';
import { connect } from '@tableland/sdk';

const privateKey = process.env.PRIV_KEY || '';
const wallet = new Wallet(privateKey);

const provider = new providers.JsonRpcProvider(process.env.MATIC_MUM_RPC);
const signer = wallet.connect(provider);
export const tableland = connect({
    chain: 'polygon-mumbai',
    signer: signer,
});


// const create = await tableland.create(
//     `address text, requestobj text, primary key (address)`,
//     { prefix: `requests` }
// );