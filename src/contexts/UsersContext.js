import { createContext, useEffect, useState } from "react"
import { useContract } from "../web3hook/useContract"
import { contractAddress, contractABI } from "../contracts/users"
import { useWeb3 } from "../web3hook/useWeb3"
import { useIPFS } from "../hooks/useIPFS"
import { getUserData } from "../hooks/useUsersContract"

export const UsersContext = createContext(null)

const UsersContextProvider = ({ children }) => {
  const [{ contract, mode }] = useContract(contractAddress, contractABI)

  // utils
  const { state } = useWeb3()
  const [, readIPFS] = useIPFS()
  const [userData, setUserData] = useState({})
  const [userList, setUserList] = useState([])

  // get user data
  useEffect(() => {
    const connectedUser = async () => {
      if (contract && state.networkName === "rinkeby") {
        // const id = await contractCall(contract, "profileID", [state.account])
        const id = await contract.profileID(state.account)
        const userObj = await getUserData(contract, id.toNumber())
        const { firstName, lastName } = await readIPFS(userObj.nameCID)
        setUserData({ ...userObj, firstName, lastName })
      }
    }
    connectedUser()

    return () => {
      setUserData({})
    }
  }, [state.account, contract, readIPFS, state.networkName])

  // get list of user
  useEffect(() => {
    const createList = async () => {
      if (contract && state.networkName === "rinkeby") {
        const listOfUser = []
        const nb = await contract.nbOfUsers()
        for (let i = 1; i <= nb; i++) {
          let userObj = await getUserData(contract, i)
          const { firstName, lastName } = await readIPFS(userObj.nameCID)
          userObj = { ...userObj, firstName, lastName }
          listOfUser.push(userObj)
        }
        setUserList(listOfUser)
      }
    }
    createList()

    // clean up to set value if component is unmount
    return () => {
      setUserList([])
    }
  }, [contract, readIPFS, state.networkName])

  return (
    <UsersContext.Provider value={[contract, mode, userData, userList]}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider
