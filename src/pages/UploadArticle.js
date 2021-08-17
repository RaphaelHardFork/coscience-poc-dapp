import {
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  useColorModeValue,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useUsersContract } from "../hooks/useUsersContract"

const UploadArticle = () => {
  //const [articles] = useArticlesContract() // [contract]

  const [author, setAuthor] = useState("")
  const [coAuthors, setCoAuthors] = useState("")
  const [laboratory, setLaboratory] = useState("")
  const [title, setTitle] = useState("")
  const [upload, setUpload] = useState("")

  //Color Mode

  const bg = useColorModeValue("white", "gray.800")

  return (
    <>
      <Box p="10">
        <Container maxW="container.xl" bg={bg} p="10" borderRadius="50">
          <Heading textAlign="center" mb="2">
            Publish an article
          </Heading>
          <Box display="flex" flexDirection="column" mx="auto" maxW="50%">
            <FormControl mb="4">
              <FormLabel>Author</FormLabel>
              <Input
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Alice Capris"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Co-Authors</FormLabel>
              <Input
                onChange={(e) => setCoAuthors(e.target.value)}
                placeholder="Bob Vance, Charlotte Pimpon ..."
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Laboratory</FormLabel>
              <Input
                onChange={(e) => setLaboratory(e.target.value)}
                placeholder="MIT"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Title</FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Science and co."
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Send your work</FormLabel>
              <Input
                onChange={(e) => setUpload(e.target.value)}
                placeholder="upload a file"
                mb="2"
              />
              <Button fontFamily={"heading"} bg={"gray.200"} color={"gray.800"}>
                Upload
              </Button>
            </FormControl>

            <Button colorScheme="orange">Submit</Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default UploadArticle
