//imports
//async
//main


const {ethers, run, network} = require("hardhat");


async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying Your Contract...")
    const contract = await SimpleStorageFactory.deploy();

    console.log("Ongoing..")
    await contract.waitForDeployment();
    console.log("Deployed to:", await contract.getAddress() );

    if(network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY)
    {
        await contract.deploymentTransaction().wait(6);
        await verify(await contract.getAddress(), []);
    }
    else {
        console.log("Contract not deployed on sepolia network, skipping verification as local hardhat network does not require it");
    }


    const currentVal = await contract.retrieve();
    console.log("Current Value:", currentVal.toString());

    const txRes = await contract.store(42); 
    await txRes.wait();
    const currentVal1 = await contract.retrieve();
    console.log("Update Value:", currentVal1.toString());

} 
const  verify = async (contractAddress, args) => 
{
    console.log("Verifying Contract 1...");
    try {
        console.log("Verifying Contract...");
        run("verify:verify", {
        address: contractAddress,
        constructorArguments: args
    });
    }
    catch (error) {
        if(error.message.toLowerCase().includes("already verified"))
        {
            console.log("Contract Already Verified");
        }
        else {
            console.log("Error:", error.message);
        }
    }
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});