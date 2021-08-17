import { Heading, Button, Container } from "@chakra-ui/react"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { Web3Context } from "web3-hooks"
import Dashboard from "../components/Dashboard"
import { useUsersContract } from "../hooks/useUsersContract"

const Profile = () => {
  const [web3State] = useContext(Web3Context)
  const [, user] = useUsersContract()

  return (
    <>
      <Heading textAlign="center" p="4">
        Ethereum address: {web3State.account}
      </Heading>
      <Container fontSize="3xl" maxW="container.xl">
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
      </Container>
    </>
  )
}

export default Profile
