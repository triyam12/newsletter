const sdk = require('api')('@nftgo/v1.0#djjay2xlcydw19o');

sdk.auth('ce00d058-cf85-4a51-b6e0-9eabcc783a08');
sdk.get_metrics_eth_v1_nft__contract_address___token_id__metrics_get({
  contract_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  token_id: '4495'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));