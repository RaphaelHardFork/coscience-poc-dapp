import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react"

const Footer = () => {
  //color Mode
  const bg = useColorModeValue("white", "gray.800")
  return (
    <>
      <Box mt="auto" bg={bg}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Stack direction="row" spacing={6}>
            <Link href="/about">What is Coscience?</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/privacy">Privacy</Link>
          </Stack>
          <Text>© 2020 Chakra Templates. All rights reserved</Text>
        </Container>
      </Box>
    </>
  )
}

export default Footer
