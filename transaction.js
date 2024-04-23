import {
  LAMPORTS_PER_SOL,
  Connection,
  SystemProgram,
  sendAndConfirmTransaction,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import dotenv from "dotenv";
import * as bip39 from "bip39";

dotenv.config();

// Connect to cluster
const connection = new Connection(process.env.QUICKNODE_RPC, "confirmed");

const mnemonic = process.argv[2];
const toPubkey = process.argv[3];
const sols = parseFloat(process.argv[4]);

(async () => {
  const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
  const from = Keypair.fromSeed(seed.slice(0, 32));

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: toPubkey,
      lamports: sols * LAMPORTS_PER_SOL,
    })
  );

  // Sign transaction, broadcast, and confirm
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    from,
  ]);
  console.log("SIGNATURE", signature);
})();
