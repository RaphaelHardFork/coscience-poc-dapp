import {
  Box,
  Heading,
  Container,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useUsersContract } from "../hooks/useUsersContract"

const RecoverAccount = () => {
  const bg = useColorModeValue("white", "gray.800")
  const [password, setPassword] = useState("")
  const [users, user] = useUsersContract()

  async function forgotWallet() {
    try {
      await users.forgotWallet(ethers.utils.id(password), user.id)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Box p="10">
        <Container fontSize="3xl" maxW="container.lg">
          <Box shadow="lg" borderRadius="50" px="6" py="10" bg={bg}>
            <Heading textAlign="center">Recover your account </Heading>
            <Box mx="auto" maxW="75%" display="flex" flexDirection="column">
              <FormControl mb="4">
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="************"
                />
              </FormControl>
              <Button onClick={forgotWallet}>Submit</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default RecoverAccount
