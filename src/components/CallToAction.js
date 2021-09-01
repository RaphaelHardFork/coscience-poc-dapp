import {
  Button,
  Stack,
  Heading,
  Text,
  Container,
  useColorModeValue,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const CallToAction = () => {
  const txt = useColorModeValue("main", "second")
  const scheme = useColorModeValue("colorMain", "colorSecond")

  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign="center"
        align="center"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          fontFamily="title"
        >
          The{" "}
          <Text as={"span"} color={txt}>
            Collective
          </Text>{" "}
          Science Platform
        </Heading>
        <Text fontFamily="text" fontSize="lg" maxW={"3xl"}>
          Science with collective intelligence and community governance
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            as={Link}
            to="/about"
            rounded={"full"}
            px={6}
            colorScheme={scheme}
          >
            Get started
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default CallToAction
