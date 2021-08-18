import {
  Box,
  Container,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { Web3Context } from "web3-hooks"
import { useUsersContract } from "../hooks/useUsersContract"
import AccountForm from "../components/AccountForm"
import RecoverAccount from "../components/RecoverAccount"

const SignUp = () => {
  const [web3State, login] = useContext(Web3Context)
  const [, user] = useUsersContract()
  //color Mode

  const bg = useColorModeValue("white", "gray.800")

  return (
    <>
      <Box p="10">
        <Container maxW="container.lg">
          <Box borderRadius="50" py="10" bg={bg}>
            {web3State.isLogged ? (
              user.id !== 0 ? (
                <Box>
                  <Text>Your account is succesfully created.</Text>
                  <Button as={Link} to="/profile">
                    My profile
                  </Button>
                </Box>
              ) : (
                <>
                  <AccountForm />
                </>
              )
            ) : (
              <Button onClick={login}>Connect your metamask</Button>
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default SignUp
