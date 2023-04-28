const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const signer = await ethers.provider.getSigner(0);

    const threshold = 0x00ffffffffffffffffffffffffffffffffffffff;
    let isValid = false;
    let wallet;
    let address;
    do {
      wallet = ethers.Wallet.createRandom();
      address = await wallet.getAddress();
      if (address < threshold) {
        isValid = true;
        wallet = wallet.connect(ethers.provider);
      }
    } while (!isValid);

    // transfer some eth to wallet for gas
    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther('1'), // 1 ether
    });

    return { game, wallet };
  }
  it('should be a winner', async function () {
    const { game, wallet } = await loadFixture(deployContractAndSetVariables);

    // good luck
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
