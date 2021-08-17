import {
  Box,
  Flex,
  Text,
  Spacer,
  UnorderedList,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useUsersContract } from "../hooks/useUsersContract"

const Dashboard = () => {
  const [users, user] = useUsersContract()
  const [addInput, setAddInput] = useState({ address: false, password: false })
  const [input, setInput] = useState("")

  async function addWallet(code) {
    switch (code) {
      case 0:
        setAddInput({ ...addInput, address: true })
        break
      case 1:
        try {
          await users.addWallet(input)
        } catch (e) {
          console.log(e)
          setInput("WRONG INPUT")
        }
        setAddInput({ ...addInput, address: false })
        break
      default:
        return false
    }
  }

  async function changePassword(code) {
    switch (code) {
      case 0:
        setAddInput({ ...addInput, password: true })
        break
      case 1:
        try {
          await users.changePassword(ethers.utils.id(input))
        } catch (e) {
          console.log(e)
          setInput("WRONG INPUT")
        }
        setAddInput({ ...addInput, password: false })
        break
      default:
        return false
    }
  }

  return (
    <>
      <>
        <Flex alignItems="center">
          <Text>ID: {user.id} </Text>
          <Spacer />
          <Box
            p="2"
            borderRadius="10"
            bg={
              user.status === "Pending"
                ? "orange.200"
                : user.status === "Approved"
                ? "green.200"
                : "red"
            }
          >
            <Text>Status: {user.status} </Text>
          </Box>
        </Flex>
        <Text>ProfileCID: {user.profileCID} </Text>
        <Text>Wallet list:</Text>
        <UnorderedList listStyleType="none">
          {user.walletList !== undefined
            ? user.walletList.map((wallet) => {
                return (
                  <>
                    <Text as="li"> {wallet} </Text>
                  </>
                )
              })
            : ""}
        </UnorderedList>
        <Text>Nb of wallets: {user.nbOfWallet} </Text>
        {addInput.address ? (
          <>
            <FormControl>
              <FormLabel>Ethereum address:</FormLabel>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="0x0000000000000000000000000000000000000000"
                bg="white"
              />
            </FormControl>
            <Button onClick={() => addWallet(1)}>Submit</Button>
          </>
        ) : (
          <Button
            disabled={user.status !== "Approved"}
            onClick={() => addWallet(0)}
          >
            Add wallet
          </Button>
        )}

        {addInput.password ? (
          <>
            <FormControl>
              <FormLabel>New password:</FormLabel>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="************"
                bg="white"
              />
            </FormControl>
            <Button onClick={() => changePassword(1)}>Submit</Button>
          </>
        ) : (
          <Button
            ms="4"
            disabled={user.status !== "Approved"}
            onClick={() => changePassword(0)}
          >
            Change password
          </Button>
        )}
      </>
    </>
  )
}

export default Dashboard
