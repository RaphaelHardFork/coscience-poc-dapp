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
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useArticlesContract } from '../hooks/useArticlesContract'
import { useCommentsContract } from '../hooks/useCommentsContract'
import { useMetamask } from '../hooks/useMetamask'
import { useReviewsContract } from '../hooks/useReviewsContract'
import { useUsersContract } from '../hooks/useUsersContract'
import Loading from './Loading'

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

const userReviewIds = async (reviews, user) => {
  if (reviews) {
    const nb = user.walletList.length
    const listOfId = []
    console.log('user review ids', nb)
    for (let i = 0; i < nb; i++) {
      const address = user.walletList[i]
      const balance = await reviews.balanceOf(address)

      for (let i = 0; i < balance; i++) {
        const id = await reviews.tokenOfOwnerByIndex(address, i)
        listOfId.push(id.toNumber())
      }
    }
    return listOfId
  }
}

const userCommentIds = async (comments, user) => {
  if (comments) {
    const nb = user.walletList.length
    const listOfId = []

    for (let i = 0; i < nb; i++) {
      const address = user.walletList[i]
      const balance = await comments.balanceOf(address)

      for (let i = 0; i < balance; i++) {
        const id = await comments.tokenOfOwnerByIndex(address, i)
        listOfId.push(id.toNumber())
      }
    }
    return listOfId
  }
}

const Dashboard = ({ user }) => {
  const [users, connectedUser] = useUsersContract()
  const [articles, , , userArticleList] = useArticlesContract()
  const [reviews, , , userReviewList] = useReviewsContract()
  const [comments, , , userCommentList] = useCommentsContract()
  const [status, contractCall] = useMetamask()

  const [addInput, setAddInput] = useState({ address: false, password: false })
  const [input, setInput] = useState('')

  const [articleList, setArticleList] = useState()
  const [reviewList, setReviewList] = useState()
  const [commentList, setCommentList] = useState()
  const [userNbArticles, setUserNbArticles] = useState()
  const [userNbReviews, setUserNbReviews] = useState()
  const [userNbComments, setUserNbComments] = useState()

  async function addWallet(code) {
    switch (code) {
      case 0:
        setAddInput({ address: true, password: false })
        break
      case 1:
        await contractCall(users, 'addWallet', [input])
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
        const tx = await contractCall(users, 'changePassword', [
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
      setUserNbArticles(articleList.length)
    })()

    ;(async () => {
      const listOfId = await userReviewIds(reviews, user)
      const reviewList = await userReviewList(reviews, listOfId)
      setReviewList(reviewList)
      setUserNbReviews(reviewList.length)
    })()

    ;(async () => {
      const listOfId = await userCommentIds(comments, user)
      const commentList = await userCommentList(comments, listOfId)
      setCommentList(commentList)
      setUserNbComments(commentList.length)
    })()
  }, [
    articles,
    reviews,
    comments,
    user,
    userArticleList,
    userReviewList,
    userCommentList,
  ])

  return (
    <>
      <Box px='10'>
        <Flex alignItems='center'>
          <Spacer />
          <Box me='4' p='2' borderRadius='10' bg='messenger.100'>
            <Text>ID: {user.id} </Text>
          </Box>
          <Box
            p='2'
            borderRadius='10'
            bg={
              user.status === 'Pending'
                ? 'orange.200'
                : user.status === 'Approved'
                ? 'green.200'
                : 'red'
            }
          >
            <Text>Status: {user.status} </Text>
          </Box>
        </Flex>
        <Heading as='h2'>User informations</Heading>
        <Text>{user.profileCID} </Text>

        <Heading as='h3'>Wallet list:</Heading>
        <UnorderedList listStyleType='none'>
          {user.walletList !== undefined
            ? user.walletList.map((wallet) => {
                return (
                  <Text key={wallet} as='li'>
                    {wallet}
                  </Text>
                )
              })
            : ''}
        </UnorderedList>

        {/* SETTINGS */}
        {Number(user.id) === connectedUser.id ? (
          <>
            <Heading as='h3'>Settings</Heading>
            <Button
              disabled={user.status !== 'Approved' || addInput.address}
              onClick={() => addWallet(0)}
              colorScheme='messenger'
              transition='0.3s '
            >
              Add wallet
            </Button>
            <Button
              ms='4'
              disabled={user.status !== 'Approved' || addInput.password}
              onClick={() => changePassword(0)}
              colorScheme='messenger'
              transition='0.3s '
            >
              Change password
            </Button>
            {addInput.address ? (
              <>
                {' '}
                <FormControl transition='0.3s '>
                  <FormLabel>Ethereum address:</FormLabel>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='0x0000000000000000000000000000000000000000'
                    bg='white'
                  />
                </FormControl>
                <Button
                  isLoading={
                    status.startsWith('Waiting') || status.startsWith('Pending')
                  }
                  loadingText={status}
                  disabled={
                    !input.length ||
                    status.startsWith('Waiting') ||
                    status.startsWith('Pending')
                  }
                  onClick={() => addWallet(1)}
                  colorScheme='green'
                  transition='0.3s'
                >
                  Submit
                </Button>
                <Button
                  onClick={() => addWallet(2)}
                  ms='4'
                  colorScheme='red'
                  transition='0.3s '
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
                    placeholder='************'
                    bg='white'
                  />
                </FormControl>
                <Button
                  isLoading={
                    status.startsWith('Waiting') || status.startsWith('Pending')
                  }
                  loadingText={status}
                  disabled={
                    !input.length ||
                    status.startsWith('Waiting') ||
                    status.startsWith('Pending')
                  }
                  onClick={() => changePassword(1)}
                  colorScheme='green'
                  transition='0.3s '
                >
                  Submit
                </Button>
                <Button
                  onClick={() => changePassword(2)}
                  ms='4'
                  colorScheme='red'
                  transition='0.3s '
                >
                  Cancel
                </Button>
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}

        {/* ARTICLE LIST */}
        <Heading as='h3' mt='5'>
          Articles({userNbArticles})
        </Heading>

        {articleList === undefined ? (
          <Loading />
        ) : (
          articleList.map((article) => {
            return (
              <Box key={article.id}>
                <Heading textAlign='center'>
                  This is the article n°{article.id}
                </Heading>
                <Text>ID : {article.id}</Text>
                <Text>Author: {article.author} </Text>
                <Text>CoAuthor: {article.CoAuthor} </Text>
                <Text>Content banned: {article.contentBanned} </Text>
                <Text>Abstract: {article.abstractCID} </Text>
                <Text>Content: {article.contentCID} </Text>
                <Text>Nb of reviews: {article.reviews.length} </Text>
                <Text>Nb of comment(s): {article.comments.length} </Text>
              </Box>
            )
          })
        )}

        {}

        {/* REVIEWS LIST */}
        <Heading as='h3' mt='5'>
          Reviews({userNbReviews})
        </Heading>

        {reviewList === undefined ? (
          <Loading />
        ) : (
          reviewList.map((review) => {
            return (
              <Box key={review.id}>
                <Heading textAlign='center'>
                  This is the review n°{review.id}
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

        {/* COMMENTS LIST */}
        <Heading as='h3' mt='5'>
          Comments({userNbComments})
        </Heading>

        {commentList === undefined ? (
          <Loading />
        ) : (
          commentList.map((comment) => {
            return (
              <Box key={comment.id}>
                <Heading textAlign='center'>
                  This is the comment n°{comment.id}
                </Heading>
                <Text>ID : {comment.id}</Text>
                <Text>Author: {comment.author} </Text>
                <Text>contentCID: {comment.contentCID} </Text>
                <Text>Comment banned: {comment.contentBanned} </Text>
                <Text>ArticleID: {comment.targetID} </Text>
                {/* <Text>Nb of comment(s): {comment.comments.length} </Text> */}
              </Box>
            )
          })
        )}
      </Box>
    </>
  )
}

export default Dashboard
