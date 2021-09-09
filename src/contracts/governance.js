export const contractAddress = "0x3119C752010C65D0D1CC7086052d9Be13707fF17"

export const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "users",
        type: "address",
      },
      {
        internalType: "address",
        name: "articles",
        type: "address",
      },
      {
        internalType: "address",
        name: "reviews",
        type: "address",
      },
      {
        internalType: "address",
        name: "comments",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "idToRecover",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "userID",
        type: "uint256",
      },
    ],
    name: "RecoverVoted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint8",
        name: "voteType",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "subjectUserID",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "userID",
        type: "uint256",
      },
    ],
    name: "UserVoted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "itemID",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "userID",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [],
    name: "QUORUM",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pendingUserID",
        type: "uint256",
      },
    ],
    name: "quorumAccept",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "userIdToBan",
        type: "uint256",
      },
    ],
    name: "quorumBan",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "itemAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "itemIdToBan",
        type: "uint256",
      },
    ],
    name: "quorumItemBan",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "userIdToRecover",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "quorumRecover",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pendingUserID",
        type: "uint256",
      },
    ],
    name: "voteToAcceptUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "articleID",
        type: "uint256",
      },
    ],
    name: "voteToBanArticle",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "commentID",
        type: "uint256",
      },
    ],
    name: "voteToBanComment",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "reviewID",
        type: "uint256",
      },
    ],
    name: "voteToBanReview",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "userIdToBan",
        type: "uint256",
      },
    ],
    name: "voteToBanUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idToRecover",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "voteToRecover",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
]
