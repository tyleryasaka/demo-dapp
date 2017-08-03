import Web3 from 'web3'

class Web3Service {

  static instance;

  constructor() {
    if (Web3Service.instance) {
      return Web3Service.instance;
    }

    Web3Service.instance = this;

    this.web3 = null;
    this.getWeb3().then(results => {
      this.web3 = results.web3;
    })
  }

  getWeb3() {
    return new Promise(function(resolve, reject) {

      // Wait for loading completion to avoid race conditions with web3 injection timing.
      window.addEventListener('load', function() {
        var results;
        var web3 = window.web3;

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
          // Use Mist/MetaMask's provider.
          web3 = new Web3(web3.currentProvider);

          results = {
            web3: web3
          };

          console.log('Injected web3 detected.');

          resolve(results);
        } else {
          // Fallback to localhost if no web3 injection.
          var provider = new Web3.providers.HttpProvider('http://localhost:8545');

          web3 = new Web3(provider);

          results = {
            web3: web3
          };

          console.log('No web3 instance injected, using Local web3.');

          resolve(results);
        }
      })
    })
  }
}

let web3Service = new Web3Service();

export default web3Service;
