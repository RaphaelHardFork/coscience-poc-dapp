import {
  Box,
  Container,
  Button,
  Text,
  useColorModeValue,
  Heading,
  SlideFade,
} from "@chakra-ui/react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { Web3Context } from "web3-hooks"
import { useUsersContract } from "../hooks/useUsersContract"
import AccountForm from "../components/AccountForm"
import Loading from "../components/Loading"

const SignUp = () => {
  const [web3State, login] = useContext(Web3Context)
  const [, user] = useUsersContract()

  //color Mode
  const bg = useColorModeValue("white", "gray.800")
  const scheme = useColorModeValue("colorMain", "colorSecond")

  return (
    <>
      <Box p="10">
        <Container maxW="container.lg">
          <Box shadow="lg" borderRadius="50" py="10" bg={bg}>
            {web3State.isLogged ? (
              user ? (
                user.id !== 0 ? (
                  <Box>
                    <Text mb="6" textAlign="center" fontSize="3xl">
                      Your account is successfully created.
                    </Text>
                    <Button
                      maxW="30ch"
                      display="flex"
                      mx="auto"
                      colorScheme={scheme}
                      as={Link}
                      to={`/profile/${user.id}`}
                      disabled={user.id === undefined}
                    >
                      Go to your profile
                    </Button>
                  </Box>
                ) : (
                  <>
                    <AccountForm />
                  </>
                )
              ) : (
                <Loading />
              )
            ) : (
              <>
                <Heading mb="6" textAlign="center">
                  You must connect your Metamask to sign up
                </Heading>
                <Button
                  colorScheme={scheme}
                  display="flex"
                  mx="auto"
                  onClick={login}
                >
                  Connect your metamask
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default SignUp
