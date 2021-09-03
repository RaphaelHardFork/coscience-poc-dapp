import React from "react"
import {
  Container,
  Box,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react"

const About = () => {
  const scheme = useColorModeValue("colorMain", "colorSecond")
  const bg = useColorModeValue("white", "grayBlue.900")

  return (
    <>
      <Box m="auto">
        <Container maxW="container.md" bg={bg} p="10" borderRadius="20">
          <Heading my="10" textAlign="center">
            About CoScience
          </Heading>
          <Button display="flex" mx="auto" size="lg" colorScheme={scheme}>
            Donate
          </Button>
        </Container>
      </Box>
    </>
  )
}

export default About
