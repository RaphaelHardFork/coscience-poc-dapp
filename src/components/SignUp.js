import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Container,
  Button,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useContext } from "react"
import { useState } from "react"
import { Web3Context } from "web3-hooks"
import { useUsersContract } from "../hooks/useUsersContract"

const SignUp = () => {
  const [users] = useUsersContract() // [contract]

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [laboratory, setLaboratory] = useState("")
  const [password, setPassword] = useState("")

  async function debug() {
    const CID = "Qmfdfjdofkodzndskdosdnwkccccd"
    const hashedPassword = await ethers.utils.id(password)

    console.log(await users.userProfile(1))
    console.log(await users.userProfile(2))
    console.log(await users.userProfile(3))
  }

  return (
    <>
      <Box p="10" bg="blackAlpha.100">
        <Container maxW="container.xl">
          <Box borderRadius="50" bg="white" py="10">
            <Heading textAlign="center">
              Create an account to publish an article
            </Heading>
            <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
              <FormControl mb="4">
                <FormLabel>First name</FormLabel>
                <Input
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Alice"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Last name</FormLabel>
                <Input
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Bob"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Laboratory</FormLabel>
                <Input
                  onChange={(e) => setLaboratory(e.target.value)}
                  placeholder="MIT"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Confirm password</FormLabel>
                <Input value={password} placeholder="**********" />
              </FormControl>
              <Button onClick={debug} colorScheme="orange">
                Register
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default SignUp
