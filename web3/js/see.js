// <script src="https://cdn.jsdelivr.net/npm/web3@1.3.1/dist/web3.min.js"></script>
// <script src="https://bscscan.com/assets/js/custom/web3-eth.min.js"></script>

window.addEventListener("load", initWeb3);

async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(ethereum);
        Livewire.emit('ethereumDetected')
        getAccount()
    } else {
        Livewire.emit('errorHandled', 'No Ethereum browser detected. Please connect to a wallet');
    }
}

let accounts = [];

async function getAccount() {
    accounts = await ethereum.request({method: 'eth_requestAccounts'});
}

function sendTransaction() {
    if (accounts.length === 0) {
        Livewire.emit('errorHandled', 'No Accounts detected')
        return;
    }
    const abi = [//ABI (Application Binary Interface)
        {
            constant: false,
            inputs: [
                {name: "_to", type: "address"},
                {name: "_value", type: "uint256"},
            ],
            name: "transfer",
            outputs: [{name: "", type: "bool"}],
            type: "function",
        },
    ];

    // https://rinkeby.etherscan.io/address/0xb8c77482e45f1f44de1745f52c74426c631bdd52
    const contractAddress = "{{config('app.erc20_contract_address')}}";
    const from = accounts[0];
    const to = "{{config('app.wallet')}}";
    const contract = new web3.eth.Contract(abi, contractAddress);
    const amount = 0.01;

    // ERC20 token amount
    const value = web3.utils.toBN(amount * Math.pow(10, 18));

    // call transfer function
    contract.methods
        .transfer(to, value)
        .send({from})
        .on('transactionHash', function (hash) {
            Livewire.emit('transactionCompleted', hash)
        })
        .on('receipt', function (receipt) {
            // console.log('receipt', receipt)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            //  console.log('confirmationNumber', confirmationNumber)
            //  console.log('receipt', receipt)
        })
        .on('error', function (error, receipt) {
            if (error.message) {
                Livewire.emit('errorHandled', error.message)
            }
        });
}


function addPRI() {
    const tokenAddress = "{{config('app.erc20_contract_address')}}";
    const tokenSymbol = 'PRI';
    const tokenDecimals = 18;
    const tokenImage = 'https://s2.coinmarketcap.com/static/img/coins/64x64/9586.png';
    try {
        const wasAdded = ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}

async function addNetwork() {
    var isTestnet = 'false';

    if (typeof ethereum !== 'undefined') {
        eth = new Web3Eth(ethereum);
    } else if (typeof web3 !== 'undefined') {
        eth = new Web3Eth(web3.givenProvider);
    } else {
        eth = new Web3Eth(ethereum);
    }

    if (typeof eth !== 'undefined') {
        var network = 0;
        network = await eth.net.getId();
        netID = network.toString();
        var params;
        if (isTestnet == "false") {
            if (netID == "56") {
                alert("BSC Network has already been added to Metamask.");
                return;
            } else {
                params = [{
                    chainId: '0x38',
                    chainName: 'BNB Smart Chain Mainnet',
                    nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18
                    },
                    rpcUrls: ['https://bsc-dataseed1.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com/']
                }]
            }
        } else {
            if (netID == "97") {
                alert("BSC Test Network has already been added to Metamask.");
                return;
            } else {
                params = [{
                    chainId: '0x61',
                    chainName: 'BNB Smart Chain Testnet',
                    nativeCurrency: {
                        name: 'tBNB',
                        symbol: 'tBNB',
                        decimals: 18
                    },
                    rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545/'],
                    blockExplorerUrls: ['https://testnet.bscscan.com/']
                }]
            }
        }

        window.ethereum.request({method: 'wallet_addEthereumChain', params})
            .then(addPRI())
            .catch((error) => console.log("Error", error.message));
    } else {
        alert('Unable to locate a compatible web3 browser!');
    }
}
