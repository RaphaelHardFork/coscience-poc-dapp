import { Center, CircularProgress, Flex, Heading } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Center>
      <Flex alignItems='center' flexDirection='column'>
        <CircularProgress isIndeterminate color='green.300' />
        <Heading mt='6'>Loading...</Heading>
      </Flex>
    </Center>
  )
}

export default Loading
