import {
  Box,
  Flex,
  Text,
  Heading,
  Container,
  List,
  ListItem,
  ListIcon,
  UnorderedList,
  Button,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import { Web3Context } from "web3-hooks"
import { useIsMounted } from "../hooks/useIsMounted"
import { useUsersContract } from "../hooks/useUsersContract"
import { useColorModeValue } from "@chakra-ui/react"

const ListOfUsers = () => {
  const [web3State] = useContext(Web3Context)
  const [users, , userList] = useUsersContract()
  const [owner, setOwner] = useState("")
  const [isOwner, setIsOwner] = useState(false)
  const isMounted = useIsMounted()

  // Color Mode

  const bg = useColorModeValue("white", "gray.800")

  useEffect(() => {
    const getOwner = async () => {
      try {
        const owner = await users.owner()
        if (owner.toLowerCase() === web3State.account.toLowerCase()) {
          setIsOwner(true)
        }
        setOwner(owner)
      } catch (e) {
        console.log(e)
      }
    }
    getOwner()
  }, [users, web3State.account])

  async function acceptUser(id) {
    try {
      await users.acceptUser(id)
    } catch (e) {
      console.log(e)
    }
  }

  async function banUser(id) {
    try {
      await users.banUser(id)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Box p="10">
        <Container maxW="container.lg">
          <Box shadow="lg" borderRadius="50" py="10" bg={bg}>
            <Heading textAlign="center" mb="2">
              List of users{" "}
            </Heading>
            <Box mx="auto" maxW="75%" display="flex" flexDirection="column">
              <UnorderedList listStyleType="none">
                {userList.map((user) => {
                  return (
                    <Flex
                      bg={
                        user.status === "Pending"
                          ? "orange.100"
                          : user.status === "Approved"
                          ? "green.100"
                          : "red.100"
                      }
                      borderRadius="20"
                      p="4"
                      mb="6"
                      as="li"
                      key={user.id}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text fontSize="3xl">{user.id}</Text>
                      <Text> {user.walletList[0]} </Text>
                      <Text> {user.nbOfWallet} Wallet(s) </Text>
                      {isOwner ? (
                        user.status === "Approved" ? (
                          <Button
                            onClick={() => banUser(user.id)}
                            disabled={user.status === "Not approved"}
                          >
                            Ban
                          </Button>
                        ) : (
                          <Button
                            onClick={() => acceptUser(user.id)}
                            disabled={user.status === "Not approved"}
                          >
                            Accept
                          </Button>
                        )
                      ) : (
                        ""
                      )}
                    </Flex>
                  )
                })}
              </UnorderedList>
            </Box>
            <Heading textAlign="center">Owner of the contract</Heading>
            <Text textAlign="center">Address: {owner} </Text>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ListOfUsers
