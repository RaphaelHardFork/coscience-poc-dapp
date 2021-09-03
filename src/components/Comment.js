import { InfoIcon } from "@chakra-ui/icons"
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

const Comment = ({ comment }) => {
  const link = useColorModeValue("main", "second")
  return (
    <Box p="5" key={comment.id}>
      {comment !== undefined ? (
        <>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent={{ base: "start", lg: "space-between" }}
          >
            <Box>
              <Heading as="h2" fontSize="3xl">
                Comment #{comment.id}
              </Heading>

              <Text>
                by{" "}
                <Link
                  as={RouterLink}
                  color={link}
                  to={`/profile/${comment.authorID}`}
                >
                  {comment.firstName} {comment.lastName}
                </Link>{" "}
                | {comment.date} | {comment.comments.length} comments
              </Text>
            </Box>

            <Box textAlign={{ base: "start", lg: "end" }}>
              <Flex alignItems="center">
                <Text>Blockchain Informations</Text>
                <Box>
                  <Popover placement="top-start">
                    <PopoverTrigger>
                      <IconButton
                        variant="Link"
                        color={link}
                        icon={<InfoIcon />}
                      />
                    </PopoverTrigger>
                    <PopoverContent w="100%" textAlign="start" p="2">
                      <PopoverHeader fontWeight="semibold">
                        Blockchain Informations
                      </PopoverHeader>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Text>
                          Address of author: {comment.author}{" "}
                          <Link
                            color={link}
                            isExternal
                            href={`https://rinkeby.etherscan.io/address/${comment.author}`}
                          >
                            (Etherscan)
                          </Link>{" "}
                        </Text>
                        <Text>
                          Mined in block n° {comment.blockNumber}{" "}
                          <Link
                            color={link}
                            isExternal
                            href={`https://rinkeby.etherscan.io/txs?block=${comment.blockNumber}`}
                          >
                            (Etherscan)
                          </Link>{" "}
                        </Text>

                        <Text>
                          Transaction hash: {comment.txHash}{" "}
                          <Link
                            color={link}
                            isExternal
                            href={`https://rinkeby.etherscan.io/tx/${comment.txHash}`}
                          >
                            (Etherscan)
                          </Link>
                        </Text>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              </Flex>
            </Box>
          </Flex>

          <Container maxW="container.lg" mt="5">
            <Text>{comment.content}</Text>
          </Container>
        </>
      ) : (
        <Skeleton height="200px" />
      )}
    </Box>
  )
}
export default Comment
