import hre from "hardhat";

async function main() {

    console.log("========================================");
    console.log("Deploying CarbonCreditManager...");
    console.log("========================================");

    const CarbonCreditManager = await hre.ethers.getContractFactory(
        "CarbonCreditManager"
    );

    const contract = await CarbonCreditManager.deploy("");

    await contract.waitForDeployment();

    console.log("========================================");
    console.log("Deployment Successful");
    console.log("========================================");
    console.log("Contract Address:");
    console.log(await contract.getAddress());
    console.log("========================================");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});