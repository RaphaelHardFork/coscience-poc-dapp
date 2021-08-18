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
  Heading,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useMetamask } from "../hooks/useMetamask"
import { useUsersContract } from "../hooks/useUsersContract"

const Dashboard = () => {
  const [users, user] = useUsersContract()
  const [addInput, setAddInput] = useState({ address: false, password: false })
  const [input, setInput] = useState("")

  const [status, contractCall] = useMetamask()

  async function addWallet(code) {
    switch (code) {
      case 0:
        setAddInput({ address: true, password: false })
        break
      case 1:
        const tx = await contractCall(users, "addWallet", [input])
        setAddInput({ ...addInput, address: false })
        break
      case 2:
        setAddInput({ address: false, password: false })
        break
      default:
        return false
    }
  }

  async function changePassword(code) {
    switch (code) {
      case 0:
        setAddInput({ address: false, password: true })
        break
      case 1:
        const tx = await contractCall(users, "changePassword", [
          ethers.utils.id(input),
        ])
        console.log(tx)
        setAddInput({ ...addInput, password: false })
        break
      case 2:
        setAddInput({ address: false, password: false })
        break
      default:
        return false
    }
  }

  return (
    <>
      <Box px="10">
        <Flex alignItems="center">
          <Spacer />
          <Box me="4" p="2" borderRadius="10" bg="messenger.100">
            <Text>ID: {user.id} </Text>
          </Box>
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
        <Heading as="h2">User informations</Heading>
        <Text>{user.profileCID} </Text>

        <Heading as="h3">Wallet list:</Heading>
        <UnorderedList listStyleType="none">
          {user.walletList !== undefined
            ? user.walletList.map((wallet) => {
                return (
                  <Text key={wallet} as="li">
                    {wallet}
                  </Text>
                )
              })
            : ""}
        </UnorderedList>

        {/* SETTINGS */}
        <Heading as="h3">Settings</Heading>
        <Button
          disabled={user.status !== "Approved" || addInput.address}
          onClick={() => addWallet(0)}
          colorScheme="messenger"
          transition="0.3s "
        >
          Add wallet
        </Button>
        <Button
          ms="4"
          disabled={user.status !== "Approved" || addInput.password}
          onClick={() => changePassword(0)}
          colorScheme="messenger"
          transition="0.3s "
        >
          Change password
        </Button>
        {addInput.address ? (
          <>
            {" "}
            <FormControl transition="0.3s ">
              <FormLabel>Ethereum address:</FormLabel>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="0x0000000000000000000000000000000000000000"
                bg="white"
              />
            </FormControl>
            <Button
              isLoading={
                status.startsWith("Waiting") || status.startsWith("Pending")
              }
              loadingText={status}
              disabled={
                !input.length ||
                status.startsWith("Waiting") ||
                status.startsWith("Pending")
              }
              onClick={() => addWallet(1)}
              colorScheme="green"
              transition="0.3s"
            >
              Submit
            </Button>
            <Button
              onClick={() => addWallet(2)}
              ms="4"
              colorScheme="red"
              transition="0.3s "
            >
              Cancel
            </Button>
          </>
        ) : addInput.password ? (
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
            <Button
              isLoading={
                status.startsWith("Waiting") || status.startsWith("Pending")
              }
              loadingText={status}
              disabled={
                !input.length ||
                status.startsWith("Waiting") ||
                status.startsWith("Pending")
              }
              onClick={() => changePassword(1)}
              colorScheme="green"
              transition="0.3s "
            >
              Submit
            </Button>
            <Button
              onClick={() => changePassword(2)}
              ms="4"
              colorScheme="red"
              transition="0.3s "
            >
              Cancel
            </Button>
          </>
        ) : (
          ""
        )}
      </Box>
    </>
  )
}

export default Dashboard
