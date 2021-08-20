import {
  Box,
  Flex,
  Text,
  Spacer,
  UnorderedList,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useArticlesContract } from "../hooks/useArticlesContract"
import { useMetamask } from "../hooks/useMetamask"
import { useUsersContract } from "../hooks/useUsersContract"
import Loading from "./Loading"

const userArticleIds = async (articles, user) => {
  if (articles) {
    const nb = user.walletList.length
    const listOfId = []

    for (let i = 0; i < nb; i++) {
      const address = user.walletList[i]
      const balance = await articles.balanceOf(address) // ERC721 => 0 -> balance
      for (let i = 0; i < balance; i++) {
        const id = await articles.tokenOfOwnerByIndex(address, i)
        listOfId.push(id.toNumber())
      }
    }

    // ERC721Enumerable
    // tokenOfOwnerByIndex(address,index): mapping(uint256 balance => uint256 tokenID)
    return listOfId
  }
}

const Dashboard = ({ user }) => {
  const [users, connectedUser] = useUsersContract()
  const [articles, , , userArticleList] = useArticlesContract()
  const [status, contractCall] = useMetamask()

  const [addInput, setAddInput] = useState({ address: false, password: false })
  const [input, setInput] = useState("")

  const [articleList, setArticleList] = useState()

  async function addWallet(code) {
    switch (code) {
      case 0:
        setAddInput({ address: true, password: false })
        break
      case 1:
        const tx = await contractCall(users, "addWallet", [input])
        setAddInput({ ...addInput, address: false })
        break
      case 2:
        setAddInput({ address: false, password: false })
        break
      default:
        return false
    }
  }

  async function changePassword(code) {
    switch (code) {
      case 0:
        setAddInput({ address: false, password: true })
        break
      case 1:
        const tx = await contractCall(users, "changePassword", [
          ethers.utils.id(input),
        ])
        console.log(tx)
        setAddInput({ ...addInput, password: false })
        break
      case 2:
        setAddInput({ address: false, password: false })
        break
      default:
        return false
    }
  }

  useEffect(() => {
    // anonymous function
    ;(async () => {
      const listOfId = await userArticleIds(articles, user)
      const articleList = await userArticleList(articles, listOfId)
      setArticleList(articleList)
    })()
  }, [articles, user, userArticleList])

  return (
    <>
      <Box px="10">
        <Flex alignItems="center">
          <Spacer />
          <Box me="4" p="2" borderRadius="10" bg="messenger.100">
            <Text>ID: {user.id} </Text>
          </Box>
          <Box
            p="2"
            borderRadius="10"
            bg={
              user.status === "Pending"
                ? "orange.200"
                : user.status === "Approved"
                ? "green.200"
                : "red"
            }
          >
            <Text>Status: {user.status} </Text>
          </Box>
        </Flex>
        <Heading as="h2">User informations</Heading>
        <Text>{user.profileCID} </Text>

        <Heading as="h3">Wallet list:</Heading>
        <UnorderedList listStyleType="none">
          {user.walletList !== undefined
            ? user.walletList.map((wallet) => {
                return (
                  <Text key={wallet} as="li">
                    {wallet}
                  </Text>
                )
              })
            : ""}
        </UnorderedList>

        {/* SETTINGS */}
        {Number(user.id) === connectedUser.id ? (
          <>
            <Heading as="h3">Settings</Heading>
            <Button
              disabled={user.status !== "Approved" || addInput.address}
              onClick={() => addWallet(0)}
              colorScheme="messenger"
              transition="0.3s "
            >
              Add wallet
            </Button>
            <Button
              ms="4"
              disabled={user.status !== "Approved" || addInput.password}
              onClick={() => changePassword(0)}
              colorScheme="messenger"
              transition="0.3s "
            >
              Change password
            </Button>
            {addInput.address ? (
              <>
                {" "}
                <FormControl transition="0.3s ">
                  <FormLabel>Ethereum address:</FormLabel>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="0x0000000000000000000000000000000000000000"
                    bg="white"
                  />
                </FormControl>
                <Button
                  isLoading={
                    status.startsWith("Waiting") || status.startsWith("Pending")
                  }
                  loadingText={status}
                  disabled={
                    !input.length ||
                    status.startsWith("Waiting") ||
                    status.startsWith("Pending")
                  }
                  onClick={() => addWallet(1)}
                  colorScheme="green"
                  transition="0.3s"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => addWallet(2)}
                  ms="4"
                  colorScheme="red"
                  transition="0.3s "
                >
                  Cancel
                </Button>
              </>
            ) : addInput.password ? (
              <>
                <FormControl>
                  <FormLabel>New password:</FormLabel>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="************"
                    bg="white"
                  />
                </FormControl>
                <Button
                  isLoading={
                    status.startsWith("Waiting") || status.startsWith("Pending")
                  }
                  loadingText={status}
                  disabled={
                    !input.length ||
                    status.startsWith("Waiting") ||
                    status.startsWith("Pending")
                  }
                  onClick={() => changePassword(1)}
                  colorScheme="green"
                  transition="0.3s "
                >
                  Submit
                </Button>
                <Button
                  onClick={() => changePassword(2)}
                  ms="4"
                  colorScheme="red"
                  transition="0.3s "
                >
                  Cancel
                </Button>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {/* ARTICLE LIST */}
        <Heading as="h3">Articles</Heading>

        {articleList === undefined ? (
          <Loading />
        ) : (
          articleList.map((article) => {
            return (
              <Box key={article.id}>
                <Heading textAlign="center">
                  This the article n°{article.id}
                </Heading>
                <Text>ID : {article.id}</Text>
                <Text>Author: {article.author} </Text>
                <Text>CoAuthor: {article.CoAuthor} </Text>
                <Text>Content banned: {article.contentBanned} </Text>
                <Text>Abstract: {article.abstractCID} </Text>
                <Text>Content: {article.contentCID} </Text>
                <Text>Nb of reviews: {article.reviews.length} </Text>
                <Text>Nb of comments: {article.comments.length} </Text>
              </Box>
            )
          })
        )}

        {}
      </Box>
    </>
  )
}

export default Dashboard
