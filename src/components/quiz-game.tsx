"use client";

import { Button } from "@mui/material";
import { ArrowRight, Award, BrainCircuit, Check, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

const quizQuestions = [
  // General Crypto Questions
  {
    question: "Who is the pseudonymous creator of Bitcoin?",
    options: [
      "Vitalik Buterin",
      "Satoshi Nakamoto",
      "Charlie Lee",
      "Jed McCaleb",
    ],
    answer: "Satoshi Nakamoto",
    points: 10,
  },
  {
    question: "What is the name of the first-ever cryptocurrency?",
    options: ["Ethereum", "Bitcoin", "Ripple", "Litecoin"],
    answer: "Bitcoin",
    points: 10,
  },
  {
    question: "What does 'DeFi' stand for?",
    options: [
      "Decentralized Finance",
      "Digital Finance",
      "Distributed Finance",
      "Delegated Finance",
    ],
    answer: "Decentralized Finance",
    points: 10,
  },
  {
    question: "Which consensus algorithm is used by Bitcoin?",
    options: [
      "Proof of Stake",
      "Proof of Authority",
      "Proof of Work",
      "Proof of History",
    ],
    answer: "Proof of Work",
    points: 15,
  },
  {
    question: "What is a 'smart contract'?",
    options: [
      "A legal document written by AI",
      "A self-executing contract with the terms of the agreement directly written into code",
      "A financial derivative",
      "A type of crypto wallet",
    ],
    answer:
      "A self-executing contract with the terms of the agreement directly written into code",
    points: 15,
  },
  {
    question: "What is an 'NFT'?",
    options: [
      "Non-Fungible Token",
      "New Financial Technology",
      "Network Firewall Tool",
      "National Fiscal Trust",
    ],
    answer: "Non-Fungible Token",
    points: 10,
  },
  {
    question: "Which blockchain is known for popularizing smart contracts?",
    options: ["Bitcoin", "Solana", "Cardano", "Ethereum"],
    answer: "Ethereum",
    points: 15,
  },
  {
    question: "What is a 'cold wallet' for cryptocurrencies?",
    options: [
      "A wallet that is offline",
      "A wallet for storing less popular coins",
      "A wallet that is not user-friendly",
      "A mobile wallet app",
    ],
    answer: "A wallet that is offline",
    points: 15,
  },
  {
    question: "What does 'HODL' mean in the crypto community?",
    options: [
      "Hold On for Dear Life",
      "Highly Optimized Digital Ledger",
      "A type of trading algorithm",
      "A specific cryptocurrency",
    ],
    answer: "Hold On for Dear Life",
    points: 10,
  },
  {
    question: "What is a 'DAO'?",
    options: [
      "Digital Asset Office",
      "Decentralized Autonomous Organization",
      "Data Access Object",
      "Distributed Application Online",
    ],
    answer: "Decentralized Autonomous Organization",
    points: 20,
  },
  {
    question: "What is the 'halving' event in Bitcoin?",
    options: [
      "The network speed doubles",
      "Transaction fees are cut in half",
      "The reward for mining new blocks is halved",
      "The number of nodes is halved",
    ],
    answer: "The reward for mining new blocks is halved",
    points: 20,
  },
  {
    question: "What is a 'gas fee' on the Ethereum network?",
    options: [
      "A fee to purchase gasoline",
      "A fee paid to miners for processing transactions",
      "A subscription fee for using Ethereum",
      "A type of network tax",
    ],
    answer: "A fee paid to miners for processing transactions",
    points: 15,
  },
  {
    question:
      "Which of these is a popular Layer-2 scaling solution for Ethereum?",
    options: [
      "Lightning Network",
      "Polygon (Matic)",
      "Binance Smart Chain",
      "Ripple",
    ],
    answer: "Polygon (Matic)",
    points: 15,
  },
  {
    question: "What is a 'whitepaper' in the context of a crypto project?",
    options: [
      "A user manual",
      "A document outlining the project's technology and goals",
      "A financial statement",
      "Marketing material",
    ],
    answer: "A document outlining the project's technology and goals",
    points: 10,
  },
  {
    question: "What is 'staking' in a Proof of Stake system?",
    options: [
      "Selling your crypto for a fixed price",
      "Participating in network security by holding and locking funds",
      "A type of crypto-based gambling",
      "Shorting a cryptocurrency",
    ],
    answer: "Participating in network security by holding and locking funds",
    points: 15,
  },
  {
    question: "What does ERC-20 refer to?",
    options: [
      "A type of Bitcoin address",
      "A standard for fungible tokens on Ethereum",
      "A regulatory body for crypto",
      "A brand of crypto hardware",
    ],
    answer: "A standard for fungible tokens on Ethereum",
    points: 15,
  },
  {
    question: "What is a 'fork' in a blockchain?",
    options: [
      "A point where the chain splits into two potential paths",
      "A tool for eating with",
      "A type of security attack",
      "A system upgrade",
    ],
    answer: "A point where the chain splits into two potential paths",
    points: 15,
  },
  {
    question: "What is a 'stablecoin'?",
    options: [
      "A cryptocurrency that is not volatile",
      "A cryptocurrency pegged to a stable asset like the US dollar",
      "A coin that is difficult to trade",
      "The first coin a new user buys",
    ],
    answer: "A cryptocurrency pegged to a stable asset like the US dollar",
    points: 10,
  },
  {
    question: "What is the purpose of a 'genesis block'?",
    options: [
      "It's the last block in a chain",
      "It's a special block that contains rewards",
      "It is the first block ever created in a blockchain",
      "It's a block that has an error",
    ],
    answer: "It is the first block ever created in a blockchain",
    points: 15,
  },
  {
    question: "What does 'Slippage' mean in crypto trading?",
    options: [
      "A bug in the trading software",
      "The price difference between when an order is placed and when it's executed",
      "A type of market manipulation",
      "Losing your private keys",
    ],
    answer:
      "The price difference between when an order is placed and when it's executed",
    points: 20,
  },
  {
    question: "What is the primary function of a blockchain 'oracle'?",
    options: [
      "To predict future crypto prices",
      "To secure the network against attacks",
      "To provide external, real-world data to smart contracts",
      "To store user identities",
    ],
    answer: "To provide external, real-world data to smart contracts",
    points: 20,
  },
  {
    question:
      "Which of the following is a well-known privacy-focused cryptocurrency?",
    options: ["Dogecoin", "Cardano", "Monero", "XRP"],
    answer: "Monero",
    points: 15,
  },
  {
    question: "What is a 'DEX'?",
    options: [
      "Digital Exchange Protocol",
      "Decentralized Exchange",
      "Data Execution Point",
      "Distributed Equity System",
    ],
    answer: "Decentralized Exchange",
    points: 10,
  },
  {
    question: "What does 'impermanent loss' refer to in DeFi?",
    options: [
      "Losing crypto due to a hack",
      "The temporary loss of funds when providing liquidity to a liquidity pool",
      "A failed transaction",
      "Forgetting a password",
    ],
    answer:
      "The temporary loss of funds when providing liquidity to a liquidity pool",
    points: 25,
  },
  {
    question: "The token standard ERC-721 is typically used for what?",
    options: [
      "Stablecoins",
      "Governance tokens",
      "Non-Fungible Tokens (NFTs)",
      "Utility tokens",
    ],
    answer: "Non-Fungible Tokens (NFTs)",
    points: 15,
  },
  {
    question: "What does 'KYC' stand for in the context of crypto exchanges?",
    options: [
      "Keep Your Crypto",
      "Know Your Customer",
      "Key Yield Calculation",
      "Knowledge of Your Coins",
    ],
    answer: "Know Your Customer",
    points: 10,
  },
  {
    question: "What is a 'rug pull' in the crypto world?",
    options: [
      "A legitimate project upgrade",
      "A type of scam where developers abandon a project and run away with investors' funds",
      "A community-led fork",
      "A sudden price increase",
    ],
    answer:
      "A type of scam where developers abandon a project and run away with investors' funds",
    points: 15,
  },
  {
    question:
      "A cryptocurrency like Chainlink (LINK), which runs on the Ethereum network, is best described as a...",
    options: ["Coin", "Token", "Native Asset", "Security"],
    answer: "Token",
    points: 15,
  },
  {
    question: "What is 'sharding'?",
    options: [
      "A type of crypto wallet",
      "A method for hacking blockchains",
      "A database partitioning technique to increase scalability",
      "A consensus algorithm",
    ],
    answer: "A database partitioning technique to increase scalability",
    points: 20,
  },
  {
    question: "What does 'TPS' stand for?",
    options: [
      "Total Protocol Security",
      "Transactions Per Second",
      "Token Price Standard",
      "Trusted Platform Service",
    ],
    answer: "Transactions Per Second",
    points: 10,
  },
  {
    question: "A '51% attack' refers to...",
    options: [
      "A coordinated marketing campaign",
      "A situation where a single entity controls more than half of the network's hashing power",
      "A discount on trading fees",
      "A security feature of a wallet",
    ],
    answer:
      "A situation where a single entity controls more than half of the network's hashing power",
    points: 25,
  },
  {
    question: "The term 'altcoin' generally refers to...",
    options: [
      "Only the top 10 cryptocurrencies",
      "Any cryptocurrency that is not Bitcoin",
      "A coin that has been hacked",
      "A cryptocurrency with no real value",
    ],
    answer: "Any cryptocurrency that is not Bitcoin",
    points: 10,
  },
  {
    question: "What is 'yield farming'?",
    options: [
      "A type of cryptocurrency mining",
      "The practice of staking or lending crypto assets to generate high returns or rewards",
      "Growing crops on a digital farm",
      "A type of video game",
    ],
    answer:
      "The practice of staking or lending crypto assets to generate high returns or rewards",
    points: 20,
  },
  {
    question: "What is a 'seed phrase' or 'recovery phrase'?",
    options: [
      "A password for a crypto exchange",
      "A list of words which store all the information needed to recover a crypto wallet",
      "The transaction hash of a payment",
      "A username for a DApp",
    ],
    answer:
      "A list of words which store all the information needed to recover a crypto wallet",
    points: 15,
  },
  {
    question:
      "What is the 'market capitalization' or 'market cap' of a cryptocurrency?",
    options: [
      "The total number of coins in circulation",
      "The price of a single coin",
      "The total value of all coins in circulation (Price x Circulating Supply)",
      "The daily trading volume",
    ],
    answer:
      "The total value of all coins in circulation (Price x Circulating Supply)",
    points: 15,
  },
  {
    question: "What is a 'block explorer'?",
    options: [
      "A type of crypto wallet",
      "A tool for mining cryptocurrencies",
      "An online tool to view all transactions on a blockchain",
      "A physical hardware device",
    ],
    answer: "An online tool to view all transactions on a blockchain",
    points: 15,
  },
  {
    question: "What does it mean if a cryptocurrency is 'fungible'?",
    options: [
      "It is unique and cannot be replaced",
      "Each unit is interchangeable with another unit",
      "It is not a real currency",
      "It can only be used for specific purposes",
    ],
    answer: "Each unit is interchangeable with another unit",
    points: 15,
  },
  {
    question: "What technology is the foundation of most cryptocurrencies?",
    options: [
      "Artificial Intelligence",
      "Blockchain",
      "Virtual Reality",
      "Quantum Computing",
    ],
    answer: "Blockchain",
    points: 10,
  },
  {
    question: "What is the maximum supply of Bitcoin?",
    options: ["21 million", "100 million", "1 billion", "Unlimited"],
    answer: "21 million",
    points: 15,
  },
  {
    question: "What does 'ATH' stand for in crypto trading?",
    options: [
      "All-Time High",
      "Automated Trading Host",
      "Asset Token Holder",
      "Airdrop To a HODLer",
    ],
    answer: "All-Time High",
    points: 10,
  },
  {
    question:
      "Which cryptocurrency is often called 'digital silver' to Bitcoin's 'digital gold'?",
    options: ["Ethereum", "Litecoin", "Ripple", "Cardano"],
    answer: "Litecoin",
    points: 15,
  },
  {
    question: "What is a 'hot wallet'?",
    options: [
      "A wallet connected to the internet",
      "A wallet stored in a warm place",
      "A wallet that is very popular",
      "A wallet with high transaction fees",
    ],
    answer: "A wallet connected to the internet",
    points: 15,
  },
  {
    question: "What is an 'airdrop' in crypto?",
    options: [
      "A new type of consensus",
      "Distributing free tokens to wallet addresses",
      "A security vulnerability",
      "Dropping a hardware wallet from the sky",
    ],
    answer: "Distributing free tokens to wallet addresses",
    points: 15,
  },
  {
    question: "What is the native cryptocurrency of the Binance exchange?",
    options: ["BNB", "BTC", "ETH", "USDT"],
    answer: "BNB",
    points: 10,
  },
  {
    question: "What does 'FUD' stand for in the crypto community?",
    options: [
      "Fear, Uncertainty, and Doubt",
      "For Unrestricted Distribution",
      "Fast Unified Database",
      "Finance Under Development",
    ],
    answer: "Fear, Uncertainty, and Doubt",
    points: 10,
  },
  {
    question: "What is a 'governance token'?",
    options: [
      "A token that gives holders voting rights in a project's future",
      "A token used to pay for government services",
      "A token that is pegged to a national currency",
      "A token used only by project developers",
    ],
    answer: "A token that gives holders voting rights in a project's future",
    points: 20,
  },
  {
    question: "Which of these is NOT a cryptocurrency exchange?",
    options: ["Coinbase", "Kraken", "MetaMask", "Binance"],
    answer: "MetaMask",
    points: 15,
  },
  {
    question: "What is 'liquidity' in a crypto market?",
    options: [
      "The ease with which an asset can be converted to cash without affecting its market price",
      "The total amount of water used to cool mining rigs",
      "A type of crypto-backed loan",
      "The number of active users on a platform",
    ],
    answer:
      "The ease with which an asset can be converted to cash without affecting its market price",
    points: 20,
  },
  {
    question: "What is the primary use case for Ripple (XRP)?",
    options: [
      "Decentralized applications",
      "Privacy-focused transactions",
      "Fast and cheap international payments",
      "NFT marketplaces",
    ],
    answer: "Fast and cheap international payments",
    points: 15,
  },
  {
    question: "What is a 'testnet'?",
    options: [
      "A separate blockchain used for testing before deploying on the main network",
      "The primary network for all transactions",
      "A network designed for speed tests",
      "A private network for a single company",
    ],
    answer:
      "A separate blockchain used for testing before deploying on the main network",
    points: 15,
  },
  {
    question: "What is 'pump and dump'?",
    options: [
      "A legitimate marketing strategy",
      "A form of price manipulation involving artificially inflating the price of an asset",
      "A method for increasing network security",
      "A way to earn staking rewards",
    ],
    answer:
      "A form of price manipulation involving artificially inflating the price of an asset",
    points: 15,
  },
  {
    question: "What is the main feature of Solana's consensus mechanism?",
    options: [
      "Proof of Work",
      "Proof of History",
      "Proof of Authority",
      "Proof of Stake",
    ],
    answer: "Proof of History",
    points: 20,
  },
  {
    question: "What does 'dApp' stand for?",
    options: [
      "Decentralized Application",
      "Digital Application",
      "Distributed Asset",
      "Data Appliance",
    ],
    answer: "Decentralized Application",
    points: 10,
  },
  {
    question: "What is a 'bear market'?",
    options: [
      "A market where prices are rising",
      "A market where prices are falling",
      "A market for bear-themed NFTs",
      "A market with high volatility",
    ],
    answer: "A market where prices are falling",
    points: 10,
  },
  {
    question: "What is a 'bull market'?",
    options: [
      "A market where prices are rising",
      "A market where prices are falling",
      "A market run by bulls",
      "A market with low liquidity",
    ],
    answer: "A market where prices are rising",
    points: 10,
  },
  {
    question:
      "Which crypto project is known for its focus on interoperability between blockchains?",
    options: ["Polkadot", "Dogecoin", "Bitcoin SV", "Monero"],
    answer: "Polkadot",
    points: 20,
  },
  {
    question: "What is a 'mempool'?",
    options: [
      "A pool for swimming",
      "A 'memory pool' of unconfirmed transactions waiting to be included in a block",
      "A type of liquidity pool",
      "A user's crypto portfolio",
    ],
    answer:
      "A 'memory pool' of unconfirmed transactions waiting to be included in a block",
    points: 25,
  },
  {
    question: "Which country was the first to adopt Bitcoin as legal tender?",
    options: ["USA", "China", "El Salvador", "Switzerland"],
    answer: "El Salvador",
    points: 15,
  },
  {
    question: "What is a 'private key' in cryptocurrency?",
    options: [
      "A public address for receiving funds",
      "A secret alphanumeric code that allows access to your crypto",
      "A password for an exchange",
      "A key to a physical safe",
    ],
    answer: "A secret alphanumeric code that allows access to your crypto",
    points: 15,
  },
  {
    question: "What is a 'public key' used for?",
    options: [
      "To spend your crypto",
      "To create a wallet address for receiving crypto",
      "To log in to your wallet",
      "To encrypt messages",
    ],
    answer: "To create a wallet address for receiving crypto",
    points: 15,
  },
  {
    question: "What is 'ASIC' in the context of crypto mining?",
    options: [
      "A type of software",
      "Application-Specific Integrated Circuit, a specialized hardware for mining",
      "A security protocol",
      "A type of consensus algorithm",
    ],
    answer:
      "Application-Specific Integrated Circuit, a specialized hardware for mining",
    points: 20,
  },
  {
    question: "What is the 'nonce' in a Bitcoin block?",
    options: [
      "A random number that miners must find to solve a block",
      "The number of transactions in a block",
      "The block's timestamp",
      "The miner's signature",
    ],
    answer: "A random number that miners must find to solve a block",
    points: 25,
  },
  {
    question: "What is the purpose of the 'Lightning Network'?",
    options: [
      "A layer-2 solution for fast, cheap Bitcoin transactions",
      "To predict lightning strikes",
      "A decentralized social media platform",
      "A new cryptocurrency",
    ],
    answer: "A layer-2 solution for fast, cheap Bitcoin transactions",
    points: 20,
  },
  {
    question:
      "What is the most common programming language for writing Ethereum smart contracts?",
    options: ["Python", "JavaScript", "Solidity", "C++"],
    answer: "Solidity",
    points: 15,
  },
  {
    question: "What does 'ICO' stand for?",
    options: [
      "Initial Coin Offering",
      "Internal Crypto Operation",
      "International Currency Organization",
      "Internet Coin Outlet",
    ],
    answer: "Initial Coin Offering",
    points: 10,
  },
  {
    question: "Which of the following is a 'meme coin'?",
    options: ["Ethereum", "Dogecoin", "Cardano", "Solana"],
    answer: "Dogecoin",
    points: 10,
  },
  {
    question: "What is 'gas limit' on Ethereum?",
    options: [
      "The maximum amount of gas you are willing to spend on a transaction",
      "The speed limit for the network",
      "A limit on how much ETH you can own",
      "A type of wallet",
    ],
    answer:
      "The maximum amount of gas you are willing to spend on a transaction",
    points: 15,
  },
  {
    question: "What is a 'double-spend' attack?",
    options: [
      "Spending the same crypto twice",
      "Paying double for an item",
      "A type of discount",
      "A security feature",
    ],
    answer: "Spending the same crypto twice",
    points: 20,
  },
  {
    question: "What is a 'Satoshi'?",
    options: [
      "The smallest unit of a Bitcoin",
      "The creator of Ethereum",
      "A type of Japanese food",
      "A cryptocurrency exchange",
    ],
    answer: "The smallest unit of a Bitcoin",
    points: 15,
  },
  {
    question: "Which Ethereum token standard is used for NFTs?",
    options: ["ERC-20", "ERC-721", "ERC-1155", "Both ERC-721 and ERC-1155"],
    answer: "Both ERC-721 and ERC-1155",
    points: 20,
  },
  {
    question: "What does 'P2P' stand for?",
    options: [
      "Peer-to-Peer",
      "Password-to-Password",
      "Proof-to-Proof",
      "Point-to-Point",
    ],
    answer: "Peer-to-Peer",
    points: 10,
  },
  {
    question: "What is a 'crypto faucet'?",
    options: [
      "A website or app that gives out small amounts of crypto for free",
      "A device for dispensing crypto",
      "A type of security leak",
      "A place to buy crypto",
    ],
    answer: "A website or app that gives out small amounts of crypto for free",
    points: 15,
  },
  {
    question: "What does a 'block reward' consist of?",
    options: [
      "Transaction fees only",
      "Newly created coins only",
      "Both newly created coins and transaction fees",
      "A certificate of appreciation",
    ],
    answer: "Both newly created coins and transaction fees",
    points: 20,
  },
  {
    question:
      "Which platform is primarily known for decentralized data storage?",
    options: ["Filecoin", "Ethereum", "Bitcoin", "Ripple"],
    answer: "Filecoin",
    points: 20,
  },
  {
    question: "What is 'atomic swap'?",
    options: [
      "A smart contract technology that enables the exchange of one cryptocurrency for another without centralized intermediaries",
      "A swap that happens very quickly",
      "A nuclear-powered crypto transaction",
      "A type of DeFi protocol",
    ],
    answer:
      "A smart contract technology that enables the exchange of one cryptocurrency for another without centralized intermediaries",
    points: 25,
  },
  {
    question: "Which of these is a decentralized domain name system?",
    options: [
      "Ethereum Name Service (ENS)",
      "GoDaddy",
      "Domain.com",
      "Namecheap",
    ],
    answer: "Ethereum Name Service (ENS)",
    points: 15,
  },
  {
    question: "What is a 'vampire attack' in DeFi?",
    options: [
      "A project luring liquidity away from a competitor by offering better incentives",
      "A hack that drains a user's wallet",
      "A type of malware",
      "A social media scam",
    ],
    answer:
      "A project luring liquidity away from a competitor by offering better incentives",
    points: 25,
  },
  {
    question: "What is the 'difficulty' in Bitcoin mining?",
    options: [
      "A measure of how hard it is to find a hash below a given target",
      "The difficulty of understanding crypto",
      "The number of miners on the network",
      "The physical difficulty of setting up a mining rig",
    ],
    answer: "A measure of how hard it is to find a hash below a given target",
    points: 20,
  },
  {
    question: "What is a 'hash rate'?",
    options: [
      "The speed at which a mining device operates",
      "The rate at which new coins are created",
      "The price change rate",
      "The user growth rate",
    ],
    answer: "The speed at which a mining device operates",
    points: 15,
  },
  {
    question: "What is 'wrapped Bitcoin' (wBTC)?",
    options: [
      "An ERC-20 token on Ethereum that represents Bitcoin",
      "Bitcoin wrapped in gift paper",
      "A more secure version of Bitcoin",
      "A Bitcoin that has been hacked",
    ],
    answer: "An ERC-20 token on Ethereum that represents Bitcoin",
    points: 20,
  },
  {
    question: "What is 'EIP-1559'?",
    options: [
      "An Ethereum Improvement Proposal that changed its fee market mechanism",
      "A new type of token standard",
      "A security update for Bitcoin",
      "A proposal to increase the block size",
    ],
    answer:
      "An Ethereum Improvement Proposal that changed its fee market mechanism",
    points: 25,
  },
  {
    question: "What is a 'utility token'?",
    options: [
      "A token that provides access to a product or service",
      "A token with no practical use",
      "A token for paying utility bills",
      "A token representing ownership in a company",
    ],
    answer: "A token that provides access to a product or service",
    points: 15,
  },
  {
    question: "Who is the creator of Ethereum?",
    options: [
      "Vitalik Buterin",
      "Satoshi Nakamoto",
      "Charles Hoskinson",
      "Gavin Wood",
    ],
    answer: "Vitalik Buterin",
    points: 10,
  },
  {
    question: "Who is the founder of Cardano?",
    options: [
      "Vitalik Buterin",
      "Charles Hoskinson",
      "Jed McCaleb",
      "Dan Larimer",
    ],
    answer: "Charles Hoskinson",
    points: 15,
  },
  {
    question: "What does 'CeFi' stand for?",
    options: [
      "Centralized Finance",
      "Community Finance",
      "Certified Finance",
      "Crypto Finance",
    ],
    answer: "Centralized Finance",
    points: 10,
  },
  {
    question: "What is a 'security token'?",
    options: [
      "A digital asset that represents ownership in a company or asset",
      "A token that enhances wallet security",
      "A token used by security guards",
      "A token that is very stable",
    ],
    answer: "A digital asset that represents ownership in a company or asset",
    points: 20,
  },
  {
    question: "What is 'off-chain' data?",
    options: [
      "Data that is stored outside of a blockchain",
      "Data that is incorrect",
      "Data that has been deleted",
      "Data that is encrypted",
    ],
    answer: "Data that is stored outside of a blockchain",
    points: 15,
  },
  {
    question: "What is 'on-chain' governance?",
    options: [
      "A system for managing and implementing changes to a blockchain using the blockchain itself",
      "Governance by a centralized team",
      "Governance by a government body",
      "A system without any governance",
    ],
    answer:
      "A system for managing and implementing changes to a blockchain using the blockchain itself",
    points: 20,
  },
  {
    question: "Which company is a major developer of crypto hardware wallets?",
    options: ["Ledger", "Apple", "Samsung", "Google"],
    answer: "Ledger",
    points: 10,
  },
  {
    question: "What is the result of 'The DAO' hack?",
    options: [
      "It led to the fork of Ethereum into Ethereum (ETH) and Ethereum Classic (ETC)",
      "It destroyed Bitcoin",
      "It created the first NFT",
      "It proved smart contracts were unhackable",
    ],
    answer:
      "It led to the fork of Ethereum into Ethereum (ETH) and Ethereum Classic (ETC)",
    points: 25,
  },
  {
    question: "What is 'FOMO' in crypto?",
    options: [
      "Fear Of Missing Out",
      "For Our Members Only",
      "Finance On My Own",
      "Future Of Money Online",
    ],
    answer: "Fear Of Missing Out",
    points: 10,
  },
  {
    question: "What does 'Slippage Tolerance' mean?",
    options: [
      "The maximum percentage of price change you are willing to accept for a trade",
      "Your tolerance for things slipping out of your hands",
      "A measure of network latency",
      "A wallet security setting",
    ],
    answer:
      "The maximum percentage of price change you are willing to accept for a trade",
    points: 20,
  },
  {
    question: "What is a 'liquidity provider (LP)' token?",
    options: [
      "A token received for providing liquidity to a pool, representing your share",
      "A token that can be spent anywhere",
      "A type of stablecoin",
      "A governance token",
    ],
    answer:
      "A token received for providing liquidity to a pool, representing your share",
    points: 20,
  },
  {
    question: "What is the 'Ethereum Virtual Machine' (EVM)?",
    options: [
      "The runtime environment for smart contracts on Ethereum",
      "A virtual reality game on Ethereum",
      "A hardware device for mining Ethereum",
      "A type of crypto wallet",
    ],
    answer: "The runtime environment for smart contracts on Ethereum",
    points: 20,
  },
  {
    question: "What is a 'flash loan'?",
    options: [
      "An uncollateralized loan that is taken out and paid back within the same transaction",
      "A very fast loan from a bank",
      "A loan that uses a camera flash for verification",
      "A scam",
    ],
    answer:
      "An uncollateralized loan that is taken out and paid back within the same transaction",
    points: 25,
  },
  {
    question: "What is the 'max pain' theory in options trading?",
    options: [
      "The price at which the largest number of options contracts would expire worthless",
      "The point of maximum emotional pain for traders",
      "A market manipulation tactic",
      "A type of technical analysis",
    ],
    answer:
      "The price at which the largest number of options contracts would expire worthless",
    points: 25,
  },
  {
    question: "What is 'MEV' (Maximal Extractable Value)?",
    options: [
      "The maximum value that can be extracted from block production in excess of the standard block reward and gas fees",
      "Most Expensive Vehicle",
      "Minimum Effective Value",
      "A type of mining pool",
    ],
    answer:
      "The maximum value that can be extracted from block production in excess of the standard block reward and gas fees",
    points: 25,
  },
  {
    question: "Which consensus mechanism does Cardano use?",
    options: [
      "Ouroboros (a type of Proof of Stake)",
      "Proof of Work",
      "Proof of History",
      "Proof of Authority",
    ],
    answer: "Ouroboros (a type of Proof of Stake)",
    points: 20,
  },
  {
    question:
      "What is the main goal of a 'layer 0' protocol like Cosmos or Polkadot?",
    options: [
      "To enable interoperability between different layer 1 blockchains",
      "To be the fastest blockchain",
      "To store data",
      "To provide maximum privacy",
    ],
    answer: "To enable interoperability between different layer 1 blockchains",
    points: 20,
  },
  {
    question: "What is a 'dust attack'?",
    options: [
      "A new method of cleaning where attackers send tiny amounts of crypto to wallets to track their activity",
      "An attack that covers hardware in dust",
      "A denial-of-service attack",
      "A social engineering attack",
    ],
    answer:
      "A new method of cleaning where attackers send tiny amounts of crypto to wallets to track their activity",
    points: 20,
  },
];

const TIME_LIMIT_SECONDS = 10;
const MAX_QUESTIONS = 10;

type GameState = "start" | "playing" | "ended";
type Question = (typeof quizQuestions)[number];

export function QuizGame() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIME_LIMIT_SECONDS);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < MAX_QUESTIONS - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(TIME_LIMIT_SECONDS);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setGameState("ended");
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (gameState === "playing") {
      if (timer === 0) {
        handleNextQuestion();
        return;
      }

      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, gameState, handleNextQuestion]);

  useEffect(() => {
    if (
      gameState === "playing" &&
      shuffledQuestions.length > 0 &&
      shuffledQuestions[currentQuestionIndex]
    ) {
      const options = [...shuffledQuestions[currentQuestionIndex].options];
      // Simple shuffle algorithm
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      setCurrentOptions(options);
    }
  }, [gameState, currentQuestionIndex, shuffledQuestions]);

  const startQuiz = () => {
    setShuffledQuestions(
      [...quizQuestions].sort(() => 0.5 - Math.random()).slice(0, MAX_QUESTIONS)
    );
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(TIME_LIMIT_SECONDS);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    const question = shuffledQuestions[currentQuestionIndex];
    setSelectedAnswer(option);
    const correct = option === question.answer;
    setIsCorrect(correct);

    if (correct) {
      const speedBonus = Math.floor(timer * 0.5); // Speed bonus
      setScore((prev) => prev + question.points + speedBonus);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  if (gameState === "start") {
    return (
      <Card className="w-full max-w-2xl bg-card/30 backdrop-blur-lg border-primary/20 shadow-xl text-center">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">
            Crypto Quiz Challenge
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <BrainCircuit className="h-20 w-20 text-primary glow" />
          <p className="text-muted-foreground text-lg">
            Test your knowledge. Answer {MAX_QUESTIONS} questions against the
            clock. Earn points and climb the ranks!
          </p>
          <p className="text-sm text-primary/80">
            Speed bonuses are awarded for quick, correct answers.
          </p>
          <Button
            onClick={startQuiz}
            size="large"
            className="group font-bold text-lg mt-4"
          >
            Start Challenge{" "}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === "ended") {
    return (
      <Card className="w-full max-w-2xl bg-card/30 backdrop-blur-lg border-primary/20 shadow-xl text-center">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Award className="h-20 w-20 text-primary glow" />
          <p className="text-muted-foreground text-lg">
            You&apos;ve finished the challenge.
          </p>
          <p className="font-headline text-6xl font-bold text-primary">
            {score}
          </p>
          <p className="text-muted-foreground -mt-4">Total Points</p>
          <div className="flex gap-4 mt-4">
            <Button onClick={startQuiz} variant="contained" size="large">
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (
    shuffledQuestions.length === 0 ||
    !shuffledQuestions[currentQuestionIndex]
  ) {
    return (
      <Card className="w-full max-w-2xl bg-card/30 backdrop-blur-lg border-primary/20 shadow-xl text-center">
        <CardContent className="p-12">
          <p>Loading Quiz...</p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progressValue = (timer / TIME_LIMIT_SECONDS) * 100;

  return (
    <Card className="w-full max-w-2xl bg-card/30 backdrop-blur-lg border-primary/20 shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center text-lg font-headline">
          <span>
            Question {currentQuestionIndex + 1}/{MAX_QUESTIONS}
          </span>
          <span className="text-primary font-bold">Score: {score}</span>
        </div>
        <Progress value={progressValue} className="w-full h-3" />
        <CardTitle className="font-headline text-3xl pt-4 text-center">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentOptions.map((option) => {
          const isSelected = selectedAnswer === option;
          const isTheCorrectAnswer = currentQuestion.answer === option;

          return (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              color={
                selectedAnswer && isTheCorrectAnswer
                  ? "success"
                  : isSelected && !isTheCorrectAnswer
                  ? "error"
                  : "primary"
              }
              variant="contained"
            >
              {selectedAnswer &&
                isSelected &&
                (isCorrect ? (
                  <Check className="mr-2 h-5 w-5" />
                ) : (
                  <X className="mr-2 h-5 w-5" />
                ))}
              {option}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
