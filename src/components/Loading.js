import {
  Center,
  CircularProgress,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react"

const Loading = () => {
  const scheme = useColorModeValue("main", "second")
  return (
    <Center>
      <Flex alignItems="center" flexDirection="column">
        <CircularProgress isIndeterminate color={scheme} />
        <Heading mt="6">Loading...</Heading>
      </Flex>
    </Center>
  )
}

export default Loading
