const {ethers} = require("hardhat");
const {expect} = require("chai");


describe("SimpleStorage", function () {
    let SimpleStorageFactory,contract;
    beforeEach(async function( ) {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        console.log("Deploying Your Contract...")
        contract = await SimpleStorageFactory.deploy();
    
        console.log("Ongoing..")
        await contract.waitForDeployment();
        console.log("Deployed to:", await contract.getAddress() );
    });

    it("Should Start with a fav num of 0", async function () {
        const currentVal = await contract.retrieve();
        expect(currentVal.toString()).to.equal("0");
    })

    it("Should update the value when stored", async function() {
        const txRes = await contract.store(10);
        await txRes.wait();
        const currentVal = await contract.retrieve();
        expect(currentVal.toString()).to.equal("10");

    })

}  
);