import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";

const mnemonic = process.argv[2];

(async () => {
  const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
  const keypair = Keypair.fromSeed(seed.slice(0, 32));
  console.log(`public key: ${keypair.publicKey.toBase58()}`);
})();
