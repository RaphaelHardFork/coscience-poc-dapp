import { Center, CircularProgress, Flex, Heading } from "@chakra-ui/react"

const Loading = () => {
  return (
    <Center>
      <Flex alignItems="center" flexDirection="column">
        <CircularProgress isIndeterminate color="second" />
        <Heading mt="6">Loading...</Heading>
      </Flex>
    </Center>
  )
}

export default Loading
