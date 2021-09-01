import {
  Heading,
  Button,
  Container,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"

import { Link, useParams } from "react-router-dom"
import Dashboard from "../components/Dashboard"
import Loading from "../components/Loading"
import { useIPFS } from "../hooks/useIPFS"
import { useUsersContract } from "../hooks/useUsersContract"

const Profile = () => {
  const [users, , , getUserData] = useUsersContract()
  const [, readIPFS] = useIPFS()
  const [user, setUser] = useState()

  const { id } = useParams()

  useEffect(() => {
    if (users) {
      const userData = async () => {
        const userObj = await getUserData(users, id)
        // get user info from IPFS

        const { email, laboratory, bio } = await readIPFS(userObj.profileCID)
        const { firstName, lastName } = await readIPFS(userObj.nameCID)
        setUser({ ...userObj, email, laboratory, bio, firstName, lastName })
      }
      userData()
    }
  }, [id, getUserData, users, readIPFS])

  const bg = useColorModeValue("white", "gray.800")

  return (
    <>
      <Box p="10">
        <Container fontSize="3xl" maxW="container.lg">
          <Box shadow="lg" borderRadius="50" px="6" py="10" bg={bg}>
            {user ? (
              user.id === 0 ? (
                <>
                  <Heading textAlign="center" mb="6">
                    You don't have an account yet
                  </Heading>
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
                </>
              ) : (
                <>
                  <Dashboard user={user} />
                </>
              )
            ) : (
              <Loading />
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Profile
