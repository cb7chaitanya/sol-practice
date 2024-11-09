const { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey } = require("@solana/web3.js");
require("dotenv").config();

const connection = new Connection(clusterApiUrl("devnet"))

async function airdrop(publicKey, amount){
    const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), LAMPORTS_PER_SOL * amount);
    await connection.confirmTransaction({signature: airdropSignature});
}

airdrop(process.env.PUBLIC_KEY, 1).then(signature => {
    console.log('Airdrop Signature: ', signature);
})