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
import Loading from "./Loading"
import SendReview from "./SendReview"

const Article = () => {
  const { id } = useParams()
  const [articles, , getArticleData] = useArticlesContract()
  const [article, setArticle] = useState()

  useEffect(() => {
    if (articles) {
      const articleData = async () => {
        const articleObj = await getArticleData(articles, id)
        setArticle(articleObj)
      }
      articleData()
    }
  }, [id, getArticleData, articles])

  const bg = useColorModeValue("white", "gray.800")

  return (
    <>
      <Box py="10" bg={bg}>
        <Container maxW="container.xl">
          {article ? (
            article.id !== 0 ? (
              <>
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
              </>
            ) : (
              <Heading textAlign="center">
                Oups this article doesn't exist
              </Heading>
            )
          ) : (
            <Loading />
          )}
          <SendReview id={id} />
        </Container>
      </Box>
    </>
  )
}

export default Article
