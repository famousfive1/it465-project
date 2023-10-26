import Web3  from 'web3';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const abi = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const cont = new web3.eth.Contract(abi, "0x362A330Ee02730a076B1393C3FDc1d47Fc56DD10");

// cont.methods.retrieve().call().then(console.log);
cont.methods.store(69).send({ from: "0xD1064F6526FFDad12F293bf189be1dB07EeBdF7a" }).then(console.log);
// cont.methods.retrieve().call().then(console.log);

