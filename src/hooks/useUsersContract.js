import { useContext, useEffect, useState } from "react"
import { Web3Context } from "web3-hooks"
import { UsersContext } from "../contexts/UsersContext"

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
  const profileCID = await users.userProfile(id)
  const status = await users.userStatus(id)
  const walletList = await users.userWalletList(id)
  const nbOfWallet = await users.userNbOfWallet(id)
  const userObj = {
    id: Number(id),
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
  const [users] = useContext(UsersContext)

  // utils
  const [web3State] = useContext(Web3Context)
  const [userData, setUserData] = useState({})
  const [userList, setUserList] = useState([])

  // get user data
  useEffect(() => {
    const connectedUser = async () => {
      if (users) {
        const id = await users.profileID(web3State.account)
        const userObj = await getUserData(users, id.toNumber())
        setUserData(userObj)
      }
    }
    connectedUser()
  }, [web3State.account, users])

  // get list of user
  useEffect(() => {
    const createList = async () => {
      if (users) {
        for (let i = 1; i <= 7; i++) {
          const userObj = await getUserData(users, i)
          setUserList((a) => [...a, userObj])
        }
      }
    }
    createList()
  }, [users])

  // control call of the hook
  if (users === undefined) {
    throw new Error(
      `It seems that you are trying to use UsersContext outside of its provider`
    )
  }

  // first: return contract for utilisation
  return [users, userData, userList, getUserData]
}
