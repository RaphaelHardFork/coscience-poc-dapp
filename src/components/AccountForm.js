import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useUsersContract } from "../hooks/useUsersContract"
import { useMetamask } from "../hooks/useMetamask"
import { useIPFS } from "../hooks/useIPFS"

const AccountForm = () => {
  const [users] = useUsersContract() // [contract]
  const [status, contractCall] = useMetamask()
  const [pinJsObject, , ipfsStatus] = useIPFS()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [laboratory, setLaboratory] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")

  const [password, setPassword] = useState("")

  //color Mode
  const bg = useColorModeValue("white", "gray.800")

  async function register() {
    const hashedPassword = await ethers.utils.id(password)
    const nameObj = {
      version: 0.1,
      firstName,
      lastName,
    }
    const nameHash = await pinJsObject(nameObj)
    const userObj = {
      version: 0.1,
      userInfo: nameHash,
      email,
      laboratory,
      bio,
    }
    const userHash = await pinJsObject(userObj)
    await contractCall(users, "register", [hashedPassword, userHash, nameHash])
    setBio("")
    setLaboratory("")
    setLastName("")
    setFirstName("")
    setPassword("")
    setEmail("")
  }

  return (
    <>
      <Box borderRadius="50" bg={bg} py="10">
        <Heading textAlign="center" mb="2">
          Create an account to publish an article
        </Heading>
        <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
          <FormControl mb="4">
            <FormLabel>First name</FormLabel>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Alice"
              value={firstName}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Last name</FormLabel>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Bob"
              value={lastName}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Bob@alice.com"
              value={email}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Laboratory</FormLabel>
            <Input
              onChange={(e) => setLaboratory(e.target.value)}
              placeholder="MIT"
              value={laboratory}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Bio</FormLabel>
            <Textarea
              minH="40"
              onChange={(e) => setBio(e.target.value)}
              placeholder="Your experience, ..."
              value={bio}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Confirm password</FormLabel>

            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="**********"
            />
          </FormControl>
          <Button
            isLoading={
              status.startsWith("Waiting") ||
              status.startsWith("Pending") ||
              ipfsStatus.startsWith("Pinning")
            }
            loadingText={ipfsStatus.startsWith("Pinning") ? ipfsStatus : status}
            disabled={
              !firstName.length ||
              !password.length ||
              !lastName.length ||
              !laboratory.length ||
              !bio.length ||
              !email.length ||
              status.startsWith("Waiting") ||
              status.startsWith("Pending") ||
              ipfsStatus.startsWith("Pinning")
            }
            onClick={register}
            colorScheme="orange"
          >
            Register
          </Button>
        </Box>
        <Heading mt="6" textAlign="center" mb="2">
          Or recover your profile with your password
        </Heading>
        <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
          <Button mt="6" as={Link} to="/recover" colorScheme="messenger">
            Recover account
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default AccountForm
