import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../public/logo.png";
import wallecticon1 from "../../public/98wallet.png";
import wallecticon2 from "../../public/Phantom-wallet.png";
import wallecticon3 from "../../public/slop.png";
import wallecticon4 from "../../public/Solflarelogo.png";
import wallecticon5 from "../../public/ledger.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

export default function Navbar() {

  const {select, disconnect} = useWallet()
  const AnchorWallet = useAnchorWallet()
  const [showwallets, setshowwallets] = useState(false);
  return (
    <div className="pt-2 bg-transparent container px-10 mx-auto flex justify-between items-center">
      <Link href={"/"} className="w-[120px] sm:w-[190px]">
        <Image src={Logo} width={190} height={20} alt="" />
      </Link>
      {  !AnchorWallet ?
      <div
        onClick={() => setshowwallets(true)}
        className="cursor-pointer px-1 md:px-3 sm:px-1 text-center py-2 hover:scale-105 transition-all md:text-base text-xs rounded bg-[#FE7200]/80 fontboh font-semibold text-black"
      >
        Connect Wallet
      </div>
      :
      <div
        onClick={() => disconnect()}
        className="cursor-pointer px-1 md:px-3 sm:px-1 text-center py-2 hover:scale-105 transition-all md:text-base text-xs rounded bg-[#FE7200]/80 fontboh font-semibold text-black"
      >
        {AnchorWallet.publicKey.toBase58().slice(0, 4)}
              ...
              {AnchorWallet.publicKey.toBase58().slice(
                AnchorWallet.publicKey.toBase58().length - 5,
                AnchorWallet.publicKey.toBase58().length
              )}
      </div>
      }
      {showwallets && (
        <div className="fixed top-0 z-[200] left-0 w-screen h-screen backdrop-blur-sm grid place-items-center">
          <div
            className="absolute w-full h-full -z-10"
            onClick={() => setshowwallets(false)}
          ></div>
          <div className="w-[260px] font_boh rounded-xl text-white/75 bg-[#111]/90 border-2 border-[#fe7200]">
            <div className="mt-1 pr-1 text-lg flex w-full justify-end">
              <div
                className="cursor-pointer"
                onClick={() => setshowwallets(false)}
              >
                <AiOutlineCloseCircle />
              </div>
            </div>
            <div className="text-lg font-semibold text-center text-[#fe7200]">
              Connect Your Wallet:
            </div>
            <div className="wallets w-full text-white mb-3 font-semibold mt-5 grid place-items-center">
              <div
                onClick={() => {
                  select("Phantom");
                  setshowwallets(false);
                }}
                className="w-[191px] py-[5px] my-1 hover:scale-105 hover:bg-[#fe7200]/90 transition-all cursor-pointer text-base flex bg-gray-900/30 items-center border border-[#fe7200]/75 rounded-full "
              >
                <div className="ml-4 mr-2">
                  <Image src={wallecticon2} width={24} height={30} alt="" />
                </div>
                <div>Phantom</div>
              </div>
              <div
                onClick={() => {
                  // select("Coin98");
                  setshowwallets(false);
                }}
                className="w-[191px] py-[5px] my-1 hover:scale-105 hover:bg-[#fe7200]/90 transition-all cursor-pointer text-base flex bg-gray-900/30 items-center border border-[#fe7200]/75 rounded-full "
              >
                <div className="ml-4 mr-2">
                  <Image src={wallecticon1} width={21} height={30} alt="" />
                </div>
                <div>Coin98</div>
              </div>
              <div
                onClick={() => {
                  // select("Slope");
                  setshowwallets(false);
                }}
                className="w-[191px] py-[5px] my-1 hover:scale-105 hover:bg-[#fe7200]/90 transition-all cursor-pointer text-base flex bg-gray-900/30 items-center border border-[#fe7200]/75 rounded-full "
              >
                <div className="ml-4 mr-2">
                  <Image src={wallecticon3} width={20} height={30} alt="" />
                </div>
                <div>Slop</div>
              </div>
              <div
                onClick={() => {
                  // select("Solflare");
                  setshowwallets(false);
                }}
                className="w-[191px] py-[5px] my-1 hover:scale-105 hover:bg-[#fe7200]/90 transition-all cursor-pointer text-base flex bg-gray-900/30 items-center border border-[#fe7200]/75 rounded-full "
              >
                <div className="ml-4 mr-2">
                  <Image src={wallecticon4} width={24} height={30} alt="" />
                </div>
                <div>Solflare</div>
              </div>
              <div
                onClick={() => {
                  // select("Ledger");
                  setshowwallets(false);
                }}
                className="w-[191px] py-[5px] my-1 hover:scale-105 hover:bg-[#fe7200]/90 transition-all cursor-pointer text-base flex bg-gray-900/30 items-center border border-[#fe7200]/75 rounded-full "
              >
                <div className="ml-4 mr-2">
                  <Image src={wallecticon5} width={17} height={30} alt="" />
                </div>
                <div>ledger</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
