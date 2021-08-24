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
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogOverlay,
  useClipboard,
} from "@chakra-ui/react"
import { PlusSquareIcon, RepeatIcon } from "@chakra-ui/icons"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useArticlesContract } from "../hooks/useArticlesContract"
import { useMetamask } from "../hooks/useMetamask"
import { useUsersContract } from "../hooks/useUsersContract"
import { useReviewsContract } from "../hooks/useReviewsContract"
import Loading from "./Loading"
import { useCommentsContract } from "../hooks/useCommentsContract"

const userFunctionsIds = async (functions, user) => {
  if (functions) {
    const nb = user.walletList.length
    const listOfId = []

    for (let i = 0; i < nb; i++) {
      const address = user.walletList[i]
      const balance = await functions.balanceOf(address) // ERC721 => 0 -> balance
      for (let i = 0; i < balance; i++) {
        const id = await functions.tokenOfOwnerByIndex(address, i)
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
  const [reviews, , , createReviewList] = useReviewsContract()
  const [comments, , , userCommentList] = useCommentsContract()
  const [status, contractCall] = useMetamask()

  const [addInput, setAddInput] = useState({ address: false, password: false })
  const [input, setInput] = useState("")

  const [articleList, setArticleList] = useState([])
  const [reviewList, setReviewList] = useState([])
  const [commentList, setCommentList] = useState([])

  const [value, setValue] = useState()
  const { hasCopied, onCopy } = useClipboard(value)
  const [isOpen, setIsOpen] = useState()
  const onClose = () => setIsOpen(false)

  async function addWallet(code) {
    switch (code) {
      case 0:
        setAddInput({ address: true, password: false })
        break
      case 1:
        await contractCall(users, "addWallet", [input])
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

  //  User Articles List
  useEffect(() => {
    if (articles && user !== undefined) {
      ;(async () => {
        const listOfId = await userFunctionsIds(articles, user)
        const articleList = await userArticleList(articles, listOfId)
        setArticleList(articleList)
      })()
    }
  }, [articles, user, userArticleList])

  //  User Reviews List
  useEffect(() => {
    if (reviews && user !== undefined) {
      ;(async () => {
        const listOfId = await userFunctionsIds(reviews, user)
        const reviewList = await createReviewList(reviews, listOfId)
        setReviewList(reviewList)
      })()
    }
  }, [createReviewList, reviews, user])

  //  User Comments List
  useEffect(() => {
    if (comments && user !== undefined) {
      ;(async () => {
        const listOfId = await userFunctionsIds(comments, user)
        const commentList = await userCommentList(comments, listOfId)
        setCommentList(commentList)
      })()
    }
  }, [comments, user, userCommentList])
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
        <>
          <Button onClick={setIsOpen}>Wallet List</Button>
          <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Here your Wallet List</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <UnorderedList listStyleType="none">
                  {user.walletList !== undefined
                    ? user.walletList.map((wallet) => {
                        return (
                          <Flex key={wallet} as="li" mb={2}>
                            {console.log(wallet)}
                            <Input
                              value={wallet}
                              isReadOnly
                              placeholder="test"
                            />
                            <Button onClick={onCopy} ml={2}>
                              {hasCopied ? "Copied" : "Copy"}
                            </Button>
                          </Flex>
                        )
                      })
                    : ""}
                </UnorderedList>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </>

        {/* SETTINGS */}
        {Number(user.id) === connectedUser.id ? (
          <>
            <Heading as="h3">Settings</Heading>
            <Button
              disabled={user.status !== "Approved" || addInput.address}
              onClick={() => addWallet(0)}
              colorScheme="messenger"
              transition="0.3s "
              aria-label="add Wallet"
              leftIcon={<PlusSquareIcon />}
            >
              Wallets
            </Button>
            <Button
              ms="4"
              disabled={user.status !== "Approved" || addInput.password}
              onClick={() => changePassword(0)}
              colorScheme="messenger"
              transition="0.3s "
              aria-label="Change password"
              variant="outline"
              rightIcon={<RepeatIcon />}
            >
              Password
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

        {/* REVIEW LIST */}
        <Heading as="h3">Reviews</Heading>

        {reviewList === undefined ? (
          <Loading />
        ) : (
          reviewList.map((review) => {
            return (
              <Box key={review.id}>
                <Heading textAlign="center">
                  This the review n°{review.id}
                </Heading>
                <Text>ID : {review.id}</Text>
                <Text>Author: {review.author} </Text>
                <Text>Content banned: {review.contentBanned} </Text>
                <Text>articleID: {review.targetID} </Text>
                <Text>Nb of comment(s): {review.comments.length} </Text>
              </Box>
            )
          })
        )}

        {/* COMMENT LIST */}
        <Heading as="h3">
          Comments({commentList !== undefined ? commentList.length : ""})
        </Heading>

        {commentList === undefined ? (
          <Loading />
        ) : (
          commentList.map((comment) => {
            return (
              <Box key={comment.id}>
                <Heading textAlign="center">
                  This is the comment n°{comment.id}
                </Heading>
                <Text>ID : {comment.id}</Text>
                <Text>Author: {comment.author} </Text>
                <Text>contentCID: {comment.contentCID} </Text>
                <Text>Comment banned: {comment.contentBanned} </Text>
                <Text>ArticleID: {comment.targetID} </Text>
              </Box>
            )
          })
        )}
      </Box>
    </>
  )
}

export default Dashboard
