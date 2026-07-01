import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CarbonCreditManagerModule = buildModule(
  "CarbonCreditManagerModule",
  (m) => {

    const baseURI = "";

    const carbonCreditManager = m.contract(
      "CarbonCreditManager",
      [baseURI]
    );

    return {
      carbonCreditManager,
    };
  }
);

export default CarbonCreditManagerModule;