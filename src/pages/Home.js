import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  useColorModeValue,
  Link,
  HStack,
  Tag,
} from "@chakra-ui/react"
import CallToAction from "../components/CallToAction"
import { useArticlesContract } from "../hooks/useArticlesContract"

const Home = () => {
  const [articles, articleList] = useArticlesContract()
  return (
    <>
      <Heading>
        <CallToAction />
      </Heading>
      {articleList.map((article) => {
        return <Text> {article.abstractCID} </Text>
      })}
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          mx="auto"
          rounded="lg"
          shadow="md"
          bg={useColorModeValue("white", "gray.800")}
          maxW="2xl"
        >
          <Image
            roundedTop="lg"
            w="full"
            h={64}
            fit="cover"
            src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="Article"
          />

          <Box p={6}>
            <Box>
              <Text
                as="span"
                fontSize="xs"
                textTransform="uppercase"
                color={useColorModeValue("brand.600", "brand.400")}
              >
                Product
              </Text>
              <Link
                display="block"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                fontSize="2xl"
                mt={2}
                _hover={{ color: "gray.600", textDecor: "underline" }}
              >
                I Built A Successful Blog In One Year
              </Link>
              <Text
                mt={2}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Molestie parturient et sem ipsum volutpat vel. Natoque sem et
                aliquam mauris egestas quam volutpat viverra. In pretium nec
                senectus erat. Et malesuada lobortis.
              </Text>
            </Box>

            <Box mt={4}>
              <Flex alignItems="center">
                <Flex alignItems="center">
                  <Image
                    h={10}
                    fit="cover"
                    rounded="full"
                    src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                    alt="Avatar"
                  />
                  <Link
                    mx={2}
                    fontWeight="bold"
                    color={useColorModeValue("gray.700", "gray.200")}
                  >
                    Jone Doe
                  </Link>
                </Flex>
                <Text
                  as="span"
                  mx={1}
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.300")}
                >
                  21 SEP 2015
                </Text>
              </Flex>
              <Flex mt={2}>
                <HStack spacing={4}>
                  {["Biology", "Chemistry", "Physics"].map((name) => (
                    <Tag
                      size="sm"
                      key={name}
                      variant="solid"
                      colorScheme="linkedin"
                    >
                      {name}
                    </Tag>
                  ))}
                </HStack>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default Home
