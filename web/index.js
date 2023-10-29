import Web3  from 'web3';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			}
		],
		"name": "get",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTerms",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const cont = new web3.eth.Contract(abi, "0x5aD0653C0A003Ad9c6983c5F77e72BEBe2B882f5");

// cont.methods.get("poi").call().then(console.log);
cont.methods.store("poi", "asdfasdf").send({ from: "0xa639d8b7BB12d2B45F5Fed490ddc0537733Df24d", gas: 3000000 }).then(console.log);
// cont.methods.getTerms().call().then(console.log);
// cont.methods.store(69).send({ from: "0xD1064F6526FFDad12F293bf189be1dB07EeBdF7a" }).then(console.log);
// cont.methods.retrieve().call().then(console.log);

