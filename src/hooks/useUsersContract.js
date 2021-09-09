import { useContext, useEffect, useState } from "react"
import { UsersContext } from "../contexts/UsersContext"
import { useCall } from "../web3hook/useCall"
import { useWeb3 } from "../web3hook/useWeb3"
import { useIPFS } from "./useIPFS"

// Pure function
const enumStatus = (status) => {
  switch (status) {
    case 0:
      return "Not approved"
    case 1:
      return "Pending"
    case 2:
      return "Approved"
    default:
      return "Unknown status"
  }
}

// Pure function
const getUserData = async (users, id) => {
  const nameCID = await users.userName(id)
  const profileCID = await users.userProfile(id)
  const status = await users.userStatus(id)
  const walletList = await users.userWalletList(id)
  const nbOfWallet = await users.userNbOfWallet(id)
  const userObj = {
    id: Number(id),
    nameCID,
    profileCID,
    status: enumStatus(status),
    walletList,
    nbOfWallet: nbOfWallet.toNumber(),
  }
  return userObj
}

// hooks
export const useUsersContract = () => {
  // call the context
  const [users, mode] = useContext(UsersContext)
  // utils
  const [status, contractCall] = useCall()
  const { state } = useWeb3()
  const [, readIPFS] = useIPFS()
  const [userData, setUserData] = useState({})
  const [userList, setUserList] = useState([])

  // get user data
  useEffect(() => {
    const connectedUser = async () => {
      if (users && state.networkName === "rinkeby") {
        console.log("Render the hook useUsersContract")
        // const id = await contractCall(users, "profileID", [state.account])
        const id = await users.profileID(state.account)
        const userObj = await getUserData(users, id.toNumber())
        const { firstName, lastName } = await readIPFS(userObj.nameCID)
        setUserData({ ...userObj, firstName, lastName })
      }
    }
    connectedUser()

    return () => {
      setUserData({})
    }
  }, [state.account, users, readIPFS, state.networkName])

  // get list of user
  useEffect(() => {
    const createList = async () => {
      if (users && state.networkName === "rinkeby") {
        const listOfUser = []
        const nb = await users.nbOfUsers()
        for (let i = 1; i <= nb; i++) {
          let userObj = await getUserData(users, i)
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
  }, [users, readIPFS, state.networkName])

  // control call of the hook
  if (users === undefined) {
    throw new Error(
      `It seems that you are trying to use UsersContext outside of its provider`
    )
  }

  // first: return contract for utilisation
  return [users, userData, userList, getUserData]
}
