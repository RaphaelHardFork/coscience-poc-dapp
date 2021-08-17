import { Box, Flex, Text, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import { useUsersContract } from "../hooks/useUsersContract"

const Profile = () => {
  const [web3State] = useContext(Web3Context)
  const [users] = useUsersContract()
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const userData = async () => {
      if (users) {
        const id = await users.profileID(web3State.account)
        const profileCID = await users.userProfile(id.toNumber())
        const status = await users.userStatus(id.toNumber())
        const walletList = await users.userWalletList(id.toNumber())
        const nbOfWallet = await users.userNbOfWallet(id.toNumber())
        const userObj = {
          id: id.toNumber(),
          profileCID,
          status,
          walletList,
          nbOfWallet: nbOfWallet.toNumber(),
        }
        setUser(userObj)
      }
    }
    userData()
  }, [web3State.account, users])

  return (
    <>
      <Text>Address: {web3State.account}</Text>
      {user !== undefined ? (
        <>
          <Text>ID: {user.id} </Text>
          <Text>Status: {user.status} </Text>
          <Text>ProfileCID: {user.profileCID} </Text>
          <Text>WalletList: {user.walletList} </Text>
          <Text>Nb of wallets: {user.nbOfWallet} </Text>
        </>
      ) : (
        "not charged"
      )}
    </>
  )
}

export default Profile
