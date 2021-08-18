import {
  Heading,
  Button,
  Container,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"

import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { Web3Context } from "web3-hooks"
import Dashboard from "../components/Dashboard"
import { useUsersContract } from "../hooks/useUsersContract"

const Profile = () => {
  const [web3State] = useContext(Web3Context)
  const [users, user, , getUserData] = useUsersContract()

  const bg = useColorModeValue("white", "gray.800")

  return (
    <>
      <Box p="10">
        <Container fontSize="3xl" maxW="container.xl">
          <Box shadow="lg" borderRadius="50" px="6" py="10" bg={bg}>
            <Heading textAlign="center" p="4">
              Ethereum address: {web3State.account}
            </Heading>
            {user !== undefined ? (
              user.id !== 0 ? (
                <Dashboard />
              ) : (
                <Button
                  maxW="10%"
                  display="flex"
                  mx="auto"
                  size="lg"
                  as={Link}
                  to="/sign-up"
                >
                  Sign up
                </Button>
              )
            ) : (
              "not charged"
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Profile
