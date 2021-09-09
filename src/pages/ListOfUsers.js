import {
  Box,
  Flex,
  Text,
  Heading,
  Container,
  LinkBox,
  LinkOverlay,
  UnorderedList,
  Button,
  SlideFade,
  Tag,
} from "@chakra-ui/react"
import { useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import { Web3Context } from "web3-hooks"
import { useUsersContract } from "../hooks/useUsersContract"
import { useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useMetamask } from "../hooks/useMetamask"
import Loading from "../components/Loading"

const ListOfUsers = () => {
  const [web3State] = useContext(Web3Context)
  const [users, , userList] = useUsersContract()
  const [status, contractCall] = useMetamask()

  const [owner, setOwner] = useState("")
  const [isOwner, setIsOwner] = useState(false)

  //                  Color Value
  const bg = useColorModeValue("white", "grayBlue.900")
  const bgUser = useColorModeValue("grayOrange.100", "grayBlue.800")
  const txt = useColorModeValue("mainLight", "second")

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
    await contractCall(users, "acceptUser", [id])
  }

  async function banUser(id) {
    await contractCall(users, "banUser", [id])
  }

  return (
    <>
      <Box p="10">
        <Container maxW="container.lg">
          <Box shadow="lg" borderRadius="50" py="10" bg={bg}>
            <SlideFade
              threshold="0.1"
              delay={{ enter: 0.1 }}
              transition={{
                enter: { duration: 0.7 },
              }}
              offsetY="-100px"
              offsetX="0px"
              in
            >
              <Heading textAlign="center" mb="5">
                List of users
              </Heading>
            </SlideFade>
            <Box mx="auto" maxW="75%" display="flex" flexDirection="column">
              <UnorderedList listStyleType="none">
                {userList.length === 0 ? (
                  <Loading />
                ) : (
                  userList.map((user) => {
                    return (
                      <SlideFade
                        threshold="0.1"
                        delay={{ enter: 0.1 }}
                        transition={{
                          enter: { duration: 0.7 },
                        }}
                        offsetY="0px"
                        offsetX="100px"
                        in
                        key={user.id}
                      >
                        <Flex
                          borderRadius="10"
                          shadow="lg"
                          p="4"
                          mb="5"
                          as={LinkBox}
                          alignItems={{ base: "space-around", lg: "center" }}
                          justifyContent={"space-around"}
                          _hover={{ backgroundColor: txt }}
                          transition="0.3s"
                          bg={bgUser}
                          direction={{ base: "column", lg: "row" }}
                        >
                          <Text fontSize="3xl">#{user.id}</Text>
                          <Flex flexDirection="column">
                            <Text fontWeight="bold">
                              {user.firstName} {user.lastName}
                            </Text>
                            <Text wrap="wrap"> {user.walletList[0]} </Text>
                          </Flex>
                          <Text> {user.nbOfWallet} Wallet(s) </Text>
                          <LinkOverlay
                            as={Link}
                            to={`/profile/${user.id}`}
                          ></LinkOverlay>

                          <Flex
                            alignItems="center"
                            direction="column"
                            width="75px"
                          >
                            {user.status === "Pending"
                              ? "Pending"
                              : user.status === "Approved"
                              ? "Approved"
                              : "Banned"}
                            <Tag
                              borderRadius="full"
                              variant="solid"
                              bg={
                                user.status === "Pending"
                                  ? "orange.500"
                                  : user.status === "Approved"
                                  ? "green.400"
                                  : "red.400"
                              }
                            ></Tag>
                          </Flex>

                          {/* OWNER OPTIONS */}
                          {isOwner ? (
                            user.status === "Approved" ? (
                              <Button
                                onClick={() => banUser(user.id)}
                                isLoading={
                                  status.startsWith("Waiting") ||
                                  status.startsWith("Pending")
                                }
                                loadingText={status}
                                disabled={
                                  user.status === "Not approved" ||
                                  status.startsWith("Waiting") ||
                                  status.startsWith("Pending")
                                }
                              >
                                Ban
                              </Button>
                            ) : (
                              <Button
                                onClick={() => acceptUser(user.id)}
                                isLoading={
                                  status.startsWith("Waiting") ||
                                  status.startsWith("Pending")
                                }
                                loadingText={status}
                                disabled={
                                  user.status === "Not approved" ||
                                  status.startsWith("Waiting") ||
                                  status.startsWith("Pending")
                                }
                              >
                                Accept
                              </Button>
                            )
                          ) : (
                            ""
                          )}
                        </Flex>
                      </SlideFade>
                    )
                  })
                )}
              </UnorderedList>
            </Box>
            <SlideFade
              threshold="0.1"
              delay={{ enter: 0.1 }}
              transition={{
                enter: { duration: 0.7 },
              }}
              offsetY="100px"
              offsetX="0px"
              in
            >
              <Heading textAlign="center">Owner of the contract</Heading>
              <Text textAlign="center">Address: {owner} </Text>
            </SlideFade>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ListOfUsers
