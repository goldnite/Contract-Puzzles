const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signers = await ethers.getSigners();

    return { game, signers };
  }

  it('should be a winner', async function () {
    const { game, signers } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(signers[2]).buy({ value: '3' });
    await game.connect(signers[1]).buy({ value: '2' });
    await game.connect(signers[3]).buy({ value: '1' });

    // TODO: win expects three arguments
    await game.win(signers[1].address, signers[2].address, signers[3].address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
