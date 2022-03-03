/**
 * Deploys Terminal V1.1 contract.
 */

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  let chainId = await getChainId();

  let chain;

  console.log({ chainId, d: deployer });

  switch (chainId) {
    // mainnet
    case '1':
      chain = 'mainnet';
      break;
    // rinkeby
    case '4':
      chain = 'rinkeby';
      break;
    // local
    case '31337':
      chain = 'localhost';
      break;
    default:
      throw new Error(`Chain id ${chainId} not supported`);
  }

  console.log({ chain });


  await deploy('FundingCycles', {
    from: deployer,
    args: [
      require(`../deployments/${chain}/TerminalDirectory.json`).address,
    ],
    log: true,
  });
};

module.exports.tags = ['Projects'];