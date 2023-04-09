const MTT_Contract = artifacts.require("Mongttang");

module.exports = function (deployer) {
    deployer.deploy(MTT_Contract, "MongTtang", "MTT", 10000000);
}