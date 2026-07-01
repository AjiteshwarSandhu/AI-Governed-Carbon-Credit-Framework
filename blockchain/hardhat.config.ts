import "dotenv/config";

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import hardhatIgnition from "@nomicfoundation/hardhat-ignition";

import { defineConfig } from "hardhat/config";

export default defineConfig({
  plugins: [
  hardhatToolboxMochaEthersPlugin,
  hardhatIgnition,
],

  solidity: "0.8.28",

  networks: {
    amoy: {
      type: "http",
      chainType: "l1",
      url: process.env.AMOY_RPC_URL!,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
});