import {
  ThirdwebNftMedia,
  useOwnedNFTs,
  useAddress,
  useContract,
  useMetamask
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";


export default function Home() {
  const contractAddress = "0xC35DE5ebb44f536b28137865bC2DaB8f6C146560";
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { data, isLoading, error } = useOwnedNFTs(contract, address);


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://natori.netlify.app/">NATORI</a>メンバーズ
        </h1>

        {!address && (
          <button onClick={connectWithMetamask}>MetaMaskでログイン</button>
        )}

        {data && (
        <div className={styles.cards}>
          {
            data.filter(nft => nft.owner !== "0x0000000000000000000000000000000000000000")
            .map(nft => (
              <div key={nft.metadata.id.toString()} className={styles.card}>
                <h1>{nft.metadata.name}</h1>
                <ThirdwebNftMedia metadata={nft.metadata} />
              </div>
            ))
          }
        </div>
        )}
      </main>
    </div>
  );
}
