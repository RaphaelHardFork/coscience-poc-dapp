import {
  Box,
  Text,
  Heading,
  useColorModeValue,
  Container,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useArticlesContract } from "../hooks/useArticlesContract"
import { useCommentsContract } from "../hooks/useCommentsContract"
import { useReviewsContract } from "../hooks/useReviewsContract"
import Loading from "./Loading"
import SendComment from "./SendComment"
import SendReview from "./SendReview"

const articleReviewIds = async (reviews, article) => {
  if (reviews) {
    console.log("article", article)
    const nb = article.reviews.length
    console.log("nb", nb)
    const listOfId = []

    for (let i = 0; i < nb; i++) {
      const id = await article.reviews[i]
      listOfId.push(id.toNumber())
    }
    return listOfId
  }
}

const articleCommentIds = async (comments, article) => {
  if (comments) {
    const nb = article.comments.length
    const listOfId = []

    for (let i = 0; i < nb; i++) {
      const id = await article.comments[i]
      listOfId.push(id.toNumber())
    }
    return listOfId
  }
}

const Article = () => {
  const { id } = useParams()
  const [articles, , getArticleData] = useArticlesContract()
  const [reviews, , , createReviewsList] = useReviewsContract()
  const [comments, , , userCommentList] = useCommentsContract()

  const [article, setArticle] = useState()
  const [articlesReviewList, setArticlesReviewList] = useState()
  const [articlesCommentList, setArticlesCommentList] = useState()

  useEffect(() => {
    if (articles) {
      const articleData = async () => {
        const articleObj = await getArticleData(articles, id)
        setArticle(articleObj)
      }
      articleData()
    }
  }, [articles, getArticleData, id])

  useEffect(() => {
    if (reviews && article !== undefined) {
      const reviewData = async () => {
        const listOfId = await articleReviewIds(reviews, article)
        const reviewList = await createReviewsList(reviews, listOfId)
        setArticlesReviewList(reviewList)
      }
      reviewData()
    }
  }, [reviews, createReviewsList, article])

  useEffect(() => {
    if (comments && article !== undefined) {
      const commentData = async () => {
        const listOfId = await articleCommentIds(comments, article)
        const commentList = await userCommentList(comments, listOfId)
        setArticlesCommentList(commentList)
      }
      commentData()
    }
  }, [comments, userCommentList, article])

  const bg = useColorModeValue("white", "gray.800")

  return (
    <>
      <Box py="10" bg={bg}>
        <Container maxW="container.xl">
          {article ? (
            article.id !== 0 ? (
              <>
                <Box key={article.id}>
                  <Heading textAlign="center">
                    This is the article n°{article.id}
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
              </>
            ) : (
              <Heading textAlign="center">
                Oups this article doesn't exist
              </Heading>
            )
          ) : (
            <Loading />
          )}

          {/* REVIEWS LIST */}

          {articlesReviewList === undefined ? (
            <Loading />
          ) : (
            <>
              <Heading as="h3" mt="5">
                Reviews({articlesReviewList.length})
              </Heading>
              {articlesReviewList.map((review) => {
                return (
                  <Box key={review.id}>
                    <Heading textAlign="center">
                      This is the review n°{review.id}
                    </Heading>
                    <Text>ID : {review.id}</Text>
                    <Text>Author: {review.author} </Text>
                    <Text>Content: {review.contentCID} </Text>
                    <Text>Content banned: {review.contentBanned} </Text>
                    <Text>articleID: {review.targetID} </Text>
                    <Text>Nb of comment(s): {review.comments.length} </Text>
                  </Box>
                )
              })}
            </>
          )}

          {/* COMMENTS LIST */}

          {articlesCommentList === undefined ? (
            <Loading />
          ) : (
            <>
              <Heading as="h3" mt="5">
                Comments({articlesCommentList.length})
              </Heading>
              {articlesCommentList.map((comment) => {
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
                    <Text>Nb of comment(s): {comment.comments.length} </Text>
                  </Box>
                )
              })}
            </>
          )}

          <SendReview id={id} />
          <SendComment id={id} />
        </Container>
      </Box>
    </>
  )
}

export default Article
