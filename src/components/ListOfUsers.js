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
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import { Web3Context } from "web3-hooks"
import { useIsMounted } from "../hooks/useIsMounted"
import { useUsersContract } from "../hooks/useUsersContract"

const ListOfUsers = () => {
  const [web3State] = useContext(Web3Context)
  const [users] = useUsersContract()
  const [userList, setUserList] = useState([])
  const isMounted = useIsMounted()
  // for loop to find users list (contract need to change)

  useEffect(() => {
    console.log(userList)
    if (users) {
      const fetch = async () => {
        for (let i = 1; i <= 3; i++) {
          const status = await users.userStatus(i)
          const walletList = await users.userWalletList(i)

          const obj = {
            status,
            walletList,
          }
          // everything in double
          setUserList((a) => [...a, obj])
        }
      }
      fetch()
    }
  }, [users])

  return (
    <>
      <Box minH="90vh" p="10" bg="blackAlpha.100">
        <Container maxW="container.xl">
          <Box borderRadius="50" bg="white" py="10">
            <Heading textAlign="center">List of users </Heading>
            <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
              <UnorderedList>
                {userList.map((user, index) => {
                  return (
                    <>
                      <ListItem key={user}>
                        User n°{index} status: {user.status} walletList:{" "}
                        {user.walletList}
                      </ListItem>
                    </>
                  )
                })}
              </UnorderedList>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ListOfUsers
