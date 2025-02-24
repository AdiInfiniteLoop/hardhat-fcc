const {task} = require("hardhat/config");


task("block-number", "Prints the current Block Number").setAction(
    async (taskArgs, hre) => {
        //hre = hardhat runtime environment
        console.log("The current Block Number is ", await hre.ethers.provider.getBlockNumber());
    }
)