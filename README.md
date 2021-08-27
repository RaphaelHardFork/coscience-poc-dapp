# dApp Coscience

## GuideLine

- 15min presentation (why blockchain, add technical schema)
- 15min Demo (prepare scenario and wallet with name)
- 15min code presentation (make plan for what we will present):
  - README cascade of contracts deployments schema
  - hardhat project => contracts => test => scripts
  - dapp:
    - present briefly the react architecture
    - select important component to show
    - present hooks for IPFS & contract

## TODO in this repo

- Crawler with `react-router-dom`
- Refactoring of components (Article in priority)
- Import PDF and pin it to IPFS
- get the timestamp of each Article/Review/Comment and why not Users. Use events...
- Unpin content if TX fail

Import PDF => localStorage => IPFS pinFile => CID

```js
articleInfo = {
  title: "",
  content: "",
  pdfFile: "bafkreibbo5dlexsozwr5ac34lfuy6bwq4ixcj5wx5injqa74mlq5wybgs4",
}
```

## TODO in the backend

- add nbOfUsers function OK
- add edit profile function (change the CID) OK
- prevent to be register two time with the same wallet OK
- register CID in `bytes32` NO
- deployment on several blockchain (matic & bsc) with the same address NO

## TODO in data architecture

- create standard for object keys stored in IPFS

Exemple:

```js
userInfo = { firstName: "", lastName: "", email: "" }
```

- keep standards working with a version of this standard

```js
userInfo = { version: 0.1, firstName: "", lastName: "" }
userInfo = { version: 0.2, firstName: "", lastName: "", bio: "" }
```

- save permanent information like name

```js
userInfo = {
  version: 0.3,
  bio: "A",
  laboratory: "A",
  userInfo: "bafkreibbo5dlexsozwr5ac34lfuy6bwq4ixcj5wx5injqa74mlq5wybgs4",
}

newUserInfo = {
  version: 0.3,
  bio: "B",
  laboratory: "B",
  userInfo: "bafkreibbo5dlexsozwr5ac34lfuy6bwq4ixcj5wx5injqa74mlq5wybgs4",
}
```

`userInfo` stay the same
