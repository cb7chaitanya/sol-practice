const { createMint, TOKEN_PROGRAM_ID } = require("@solana/spl-token");
const { Keypair, Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = require("@solana/web3.js"); 
require("dotenv").config();

const payer = Keypair.fromSecretKey(Uint8Array.from(process.env.SECRET_KEY));

const mintAuthority = payer;

const connection = new Connection(clusterApiUrl('devnet'))

async function createMintForToken (payer, mintAuthority){
    const mint = await createMint(
        connection,
        payer,
        mintAuthority.publicKey,
        null,
        6,
        TOKEN_PROGRAM_ID
    )

    console.log('Mint created at: ', mint.toBase58())
    return mint
}

async function mintNewTokens(mint, to, amount){
    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, new PublicKey(to))

    console.log('Token account created at: ', tokenAccount.toBase58())

    await mint(connection, payer, mint, tokenAccount.address, mintAuthority, amount)

    console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58())
}

async function main(){
    const mint = await createMintForToken(payer, mintAuthority)
    await mintNewTokens(mint, process.env.PUBLIC_KEY, 100)
}

main()