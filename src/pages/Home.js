import { Box, Heading, useColorModeValue, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import ArticleList from '../components/ArticleList'
import CallToAction from '../components/CallToAction'
import Loading from '../components/Loading'
import { useArticlesContract } from '../hooks/useArticlesContract'
import { useUsersContract } from '../hooks/useUsersContract'

const Home = () => {
  const [, articleList] = useArticlesContract()
  const [users] = useUsersContract()

  const [articleListAuthor, setArticleListAuthor] = useState()

  const bg = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    if (users) {
      ;(async () => {
        const asyncRes = await Promise.all(
          articleList.map(async (article) => {
            const userID = await users.profileID(article.author)
            return { ...article, authorID: userID.toNumber() }
          })
        )
        setArticleListAuthor(asyncRes)
      })()
    }
  }, [users, articleList])

  return (
    <>
      <Heading>
        <CallToAction />
      </Heading>

      <Box py='10' bg={bg}>
        <Container maxW='container.xl'>
          {articleListAuthor === undefined ? (
            <Loading />
          ) : articleListAuthor.length === 0 ? (
            <Loading />
          ) : (
            <ArticleList articleList={articleListAuthor} />
          )}
        </Container>
      </Box>
    </>
  )
}

export default Home
