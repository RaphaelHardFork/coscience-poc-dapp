import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  Skeleton,
  Text,
} from "@chakra-ui/react"

const ReviewHeader = ({ review }) => {
  return (
    <Box p="5" bg="gray.200" key={review.id}>
      {review !== undefined ? (
        <>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent={{ base: "start", lg: "space-between" }}
          >
            <Box>
              <Heading as="h2">{review.title}</Heading>

              <Text>
                by {review.firstName} {review.lastName} | {review.date} |{" "}
                {review.comments.length} comments
              </Text>
            </Box>

            <Box>
              <Box textAlign={{ base: "start", lg: "end" }}>
                <Heading as="h3" fontSize="2xl">
                  Review #{review.id}
                </Heading>
                <Text fontSize="lg" fw="bold">
                  Blockchain informations
                </Text>

                <Text>
                  Address of author:{" "}
                  <Link
                    color="blue"
                    isExternal
                    href={`https://rinkeby.etherscan.io/tx/${review.author}`}
                  >
                    {review.author.slice(0, 20)}...
                  </Link>{" "}
                  (Etherscan)
                </Text>
                <Text>
                  Mined in block n°
                  <Link
                    color="blue"
                    isExternal
                    href={`https://rinkeby.etherscan.io/txs?block=${review.blockNumber}`}
                  >
                    {review.blockNumber}
                  </Link>{" "}
                  (Etherscan)
                </Text>

                <Text>
                  Transaction hash:{" "}
                  <Link
                    color="blue"
                    isExternal
                    href={`https://rinkeby.etherscan.io/tx/${review.txHash}`}
                  >
                    {review.txHash.slice(0, 15)}...
                  </Link>{" "}
                  (Etherscan)
                </Text>
              </Box>
            </Box>
          </Flex>
          <Divider borderColor="orange" />
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent={{ base: "start", lg: "space-between" }}
          ></Flex>
        </>
      ) : (
        <Skeleton height="200px" />
      )}
    </Box>
  )
}
export default ReviewHeader
