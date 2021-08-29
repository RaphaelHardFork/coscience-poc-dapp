import {
  Box,
  Flex,
  Text,
  Spacer,
  UnorderedList,
  Input,
  Button,
  IconButton,
  Heading,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogOverlay,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useClipboard,
  Link,
} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"
import { useArticlesContract } from "../hooks/useArticlesContract"
import { useUsersContract } from "../hooks/useUsersContract"
import { useReviewsContract } from "../hooks/useReviewsContract"
import { useCommentsContract } from "../hooks/useCommentsContract"
import Loading from "./Loading"
import Accordion from "./Accordion"
import UserSetting from "./UserSetting"

const userContractIds = async (contract, user) => {
  if (contract) {
    const nb = user.walletList.length
    const listOfId = []

    for (let i = 0; i < nb; i++) {
      const address = user.walletList[i]
      const balance = await contract.balanceOf(address) // ERC721 => 0 -> balance
      for (let i = 0; i < balance; i++) {
        const id = await contract.tokenOfOwnerByIndex(address, i)
        listOfId.push(id.toNumber())
      }
    }

    // ERC721Enumerable
    // tokenOfOwnerByIndex(address,index): mapping(uint256 balance => uint256 tokenID)
    return listOfId
  }
}

const Dashboard = ({ user }) => {
  const [, connectedUser] = useUsersContract()
  const [articles, , , createArticleList] = useArticlesContract()
  const [reviews, , , createReviewList] = useReviewsContract()
  const [comments, , , createCommentList] = useCommentsContract()

  const [articleList, setArticleList] = useState()
  const [reviewList, setReviewList] = useState()
  const [commentList, setCommentList] = useState()

  const [value, setValue] = useState()
  const { hasCopied, onCopy } = useClipboard(value)
  const [isOpen, setIsOpen] = useState()
  const onClose = () => setIsOpen(false)
  const [isOpenSetting, setIsOpenSetting] = useState()
  const onCloseSetting = () => setIsOpenSetting(false)

  useEffect(() => {
    // anonymous function
    ;(async () => {
      // list of articles
      let listOfId = await userContractIds(articles, user)
      const articleList = await createArticleList(articles, listOfId)
      setArticleList(articleList)

      // list of reviews
      listOfId = await userContractIds(reviews, user)
      const reviewList = await createReviewList(reviews, listOfId)
      setReviewList(reviewList)

      // list of comments
      listOfId = await userContractIds(comments, user)
      const commentList = await createCommentList(comments, listOfId)
      setCommentList(commentList)
    })()
  }, [
    user,
    articles,
    createArticleList,
    comments,
    createCommentList,
    reviews,
    createReviewList,
  ])

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
            me="4"
          >
            <Text>Status: {user.status} </Text>
          </Box>
          {Number(user.id) === connectedUser.id ? (
            <IconButton
              colorScheme="teal"
              aria-label="Call Segun"
              size="lg"
              icon={<SettingsIcon />}
              onClick={setIsOpenSetting}
              borderRadius="100"
            />
          ) : (
            ""
          )}
        </Flex>
      </Box>

      {/* SETTINGS MODAL */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenSetting}
        onClose={onCloseSetting}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UserSetting user={user} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* USER PROFILE */}
      <Heading as="h2">User profile</Heading>
      <Link
        isTruncated
        isExternal
        href={`https://ipfs.io/ipfs/${user.profileCID}`}
      >
        CID: {user.profileCID}
      </Link>

      {/* user.profile ? = FALSE CID : OBJECT FROM IPFS
      
      1. useIPFS.js: function readIPFS throw CID if false
      2. Profile.js: useEffect try to fetch IPFS with user.profileCID (readIPFS(user.profileCID))
      3. Profile.js: wrong CIDs are catched in the key .profile
      4. SO: user.profile === user.profileCID if the CID is false
      */}

      <>
        <Text>
          {user.name.firstName} {user.name.lastName}
        </Text>
        <Text>Laboratory: {user.profile.laboratory}</Text>
        <Text fontWeight="bold">Bio:</Text>
        <Text>{user.profile.bio ? user.profile.bio : ""}</Text>
      </>

      <Button
        mb="6"
        rounded={"full"}
        px={6}
        colorScheme={"orange"}
        bg={"orange.400"}
        onClick={setIsOpen}
      >
        Wallet List
      </Button>
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
                        <Input
                          onClick={(e) => setValue(e.target.value)}
                          value={wallet}
                          isReadOnly
                          placeholder="test"
                        />
                        <Button
                          disabled={value !== wallet}
                          onClick={onCopy}
                          ml={2}
                        >
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

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>
            Articles ({articleList !== undefined ? articleList.length : "..."})
          </Tab>
          <Tab>
            Reviews ({reviewList !== undefined ? reviewList.length : "..."})
          </Tab>
          <Tab>
            Comments ({commentList !== undefined ? commentList.length : "..."})
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* ARTICLE LIST */}
            {articleList === undefined ? (
              <Loading />
            ) : (
              articleList.map((article) => {
                return (
                  <Box key={article.id}>
                    <Accordion object={article} type="Article" />
                  </Box>
                )
              })
            )}
          </TabPanel>
          <TabPanel>
            {/* REVIEW LIST */}
            <Heading as="h3">Reviews</Heading>
            {reviewList === undefined ? (
              <Loading />
            ) : (
              reviewList.map((review) => {
                return (
                  <Box key={review.id}>
                    <Accordion object={review} type="Review" />
                  </Box>
                )
              })
            )}
          </TabPanel>
          <TabPanel>
            {/* COMMENT LIST */}
            <Heading as="h3">Comments</Heading>

            {commentList === undefined ? (
              <Loading />
            ) : (
              commentList.map((comment) => {
                return (
                  <Box key={comment.id}>
                    <Accordion object={comment} type="Comment" />
                  </Box>
                )
              })
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Dashboard
