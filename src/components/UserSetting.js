import { PlusSquareIcon, RepeatIcon } from "@chakra-ui/icons"
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useMetamask } from "../hooks/useMetamask"
import { useUsersContract } from "../hooks/useUsersContract"

const UserSetting = ({ user }) => {
  const [users] = useUsersContract()
  const [status, contractCall] = useMetamask()
  const [addInput, setAddInput] = useState({ address: false, password: false })
  const [input, setInput] = useState("")

  async function addWallet(code) {
    switch (code) {
      case 0:
        setAddInput({ address: true, password: false })
        break
      case 1:
        await contractCall(users, "addWallet", [input])
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
      <Button
        disabled={user.status !== "Approved" || addInput.address}
        onClick={() => addWallet(0)}
        colorScheme="messenger"
        transition="0.3s "
        aria-label="add Wallet"
        leftIcon={<PlusSquareIcon />}
      >
        Wallets
      </Button>
      <Button
        ms="4"
        disabled={user.status !== "Approved" || addInput.password}
        onClick={() => changePassword(0)}
        colorScheme="messenger"
        transition="0.3s "
        aria-label="Change password"
        variant="outline"
        rightIcon={<RepeatIcon />}
      >
        Password
      </Button>
      {addInput.address ? (
        <>
          {" "}
          <FormControl transition="0.3s ">
            <FormLabel>Ethereum address:</FormLabel>
            <Input
              mb="4"
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
              mb="4"
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
    </>
  )
}

export default UserSetting
