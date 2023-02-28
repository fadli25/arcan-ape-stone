import Image from "next/image";
import React from "react";
import sac5 from "../../public/SAC5.png";
import sac6 from "../../public/SAC6.png";
import { useTransition, animated } from "react-spring";
import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SolanaMobileWalletAdapterWalletName } from "@solana-mobile/wallet-adapter-mobile";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { CandyMachineState, getCandyMachineState, mint, NFT, getNftPrice } from "../candy/candy-machine";


export default function header() {

  const candyMachineId = "2bE9xVB9YPmhB7Kc6VviL6DR3FEzf2fKc2bXUJBqMovh"
  const connection = new Connection("https://neat-still-vineyard.solana-mainnet.quiknode.pro/0799322a528958e6c600e7ecb87c49c99e6e6105/")
  const rpcHost = "https://neat-still-vineyard.solana-mainnet.quiknode.pro/0799322a528958e6c600e7ecb87c49c99e6e6105/"

  const anchorWallet = useAnchorWallet();
  const { connect, connected, publicKey, wallet } = useWallet();
  const [candyMachine, setCandyMachine] = useState();
  const [nft, setNft] = useState();
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [error, setError] = useState("");
  
  const metaplex = new Metaplex(connection);

  const refreshCandyMachineState = useCallback(
    async () => {
      if (!publicKey) {
        return;
      }

      const candyMachine = await getCandyMachineState(metaplex, new PublicKey(candyMachineId));
      setCandyMachine(candyMachine);
    },
    [anchorWallet]
  );

  const getMintButtonContent = () => {
    if (!candyMachine) {
      return "Loading...";
    }

    if (isUserMinting) {
      return "Minting in progress..";
    } else if (candyMachine.itemsRemaining === 0) {
      return "Sold out";
    } else {
      return "Mint";
    }
  };

  const mintButtonClicked = async () => {
    setIsUserMinting(true);

    metaplex.use(walletAdapterIdentity(wallet.adapter));
    const nft = await mint(metaplex, candyMachine, "ARV");

    if (nft) { 
      setNft(nft);
    } else {
      setError("Minting unsuccessful!");
    }
    
    setIsUserMinting(false);
    refreshCandyMachineState();
  }

  useEffect(() => {
    refreshCandyMachineState();
  }, [
    anchorWallet,
    candyMachineId,
    connection,
    refreshCandyMachineState,
  ]);

  useEffect(() => {
    (function loop() {
      setTimeout(() => {
        refreshCandyMachineState();
        loop();
      }, 20000);
    })();
  }, [refreshCandyMachineState]);



  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      filename:
        "https://media.discordapp.net/attachments/1060970855519244310/1066453443880947772/Type1.png?width=363&height=362",
    },
    {
      filename:
        "https://media.discordapp.net/attachments/1060970855519244310/1078165759487901746/SAC5.png?width=489&height=489",
    },
    {
      filename:
        "https://media.discordapp.net/attachments/1060970855519244310/1066453443880947772/Type1.png?width=363&height=362",
    },
    {
      filename:
        "https://media.discordapp.net/attachments/1060970855519244310/1078167260520251544/SAC6.png?width=488&height=485",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 800);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div>
      <div className="w-full mt-[10vh] grid place-items-center">
        <div className="container px-10 flex-col lg:flex-row flex justify-evenly items-center">
          <div className="p1 w-[95%] mx-auto md:w-[350px]">
            <div
              className="sm:w-[360px] sm:h-[360px] w-full min-h-[296px] mx-auto"
              style={{ position: "relative" }}
            >
              {images.map((image, index) => (
                <Image
                  className="rounded-xl"
                  key={index}
                  src={`${image.filename}`}
                  alt={image.alt}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: index === currentImageIndex ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                  }}
                  width={500}
                  height={500}
                />
              ))}
            </div>
            <div className="w-full img cursor-pointer hover:scale-105 transition-all mt-6 py-2 fontboh text-center rounded-xl bg-[#fe7200]">
              <p
              onClick={async () => await mintButtonClicked()} disabled={isUserMinting || candyMachine?.itemsRemaining === 0} 
              className="text-lg">{
              getMintButtonContent()
              }</p>
              <p className="text-xl -mt-[1px] font-semibold">
                Arcane Stoned Ape
              </p>
            </div>
          </div>
          <div className="p2 w-[95%] mx-auto p-3 fontboh md:w-[560px] mt-10 lg:-mt-16">
            {/* <div className="text-lg sm:text-xl md:text-3xl font-semibold text-white text-center">
              You are Eligible to Mint
            </div> */}
            <div className="mt-5 w-full bg-[#fe7200] rounded-xl py-2 flex flex-col sm:flex-row justify-around items-center">
              {/* supply */}
              <div className="text-center border-b pb-5 sm:pb-0 border-white/60 sm:border-transparent">
                <div className="text-2xl text-white">Supply</div>
                <div className="text-3xl mt-1 font-semibold">
                  <span> {`${candyMachine ? candyMachine.itemsRemaining : "Loading.."}`}</span>
                  <span className="mx-3">/</span>
                  <span>555</span>
                </div>
                {/* <div className="text-white text-sm">
                  You have 7 Claim Tokens
                </div> */}
              </div>
              {/* supply */}
              {/* price */}
              <div className="text-center pt-4 sm:pt-0">
                <div className="text-2xl text-white">Price</div>
                <div className="text-3xl mt-1 font-semibold">
                  <span>1616</span>
                  <span className="mx-3">$EYE</span>
                </div>
                <div className="text-white text-sm">+ SOL Fee</div>
              </div>
              {/* price */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
