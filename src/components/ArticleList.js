import { Box, Flex, Link, Text, Heading, Image, Grid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const ArticleList = ({ articleList }) => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap='4'>
      {articleList.map((article) => {
        return (
          <Box
            borderRadius='10'
            shadow='lg'
            key={article.id}
            p='4'
            border='gray solid'
            borderWidth='1'
          >
            <Text
              as='span'
              fontSize='xs'
              textTransform='uppercase'
              color='gray'
            >
              Article n°{article.id}
            </Text>
            <Heading
              _hover={{ textDecoration: 'underline' }}
              display='block'
              as={RouterLink}
              to={`/article/${article.id}`}
            >
              {' '}
              {article.contentCID}{' '}
            </Heading>
            <Text py='6'>Abstract: {article.abstractCID} </Text>
            <Flex mb='4' alignItems='center'>
              <Image
                h={10}
                fit='cover'
                rounded='full'
                src='https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60'
                alt='Avatar'
              />
              <Link
                as={RouterLink}
                to={`/profile/${article.authorID}`}
                maxW='25ch'
                isTruncated
                mx={2}
                fontWeight='bold'
              >
                {article.author}
              </Link>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text>Reviews({article.reviews.length})</Text>
              <Text>Comments: {article.comments.length}</Text>
            </Flex>
          </Box>
        )
      })}
    </Grid>
  )
}

export default ArticleList
