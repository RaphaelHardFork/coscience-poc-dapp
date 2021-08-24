import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  useColorModeValue,
} from "@chakra-ui/react"
import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useArticlesContract } from "../hooks/useArticlesContract"
import { useMetamask } from "../hooks/useMetamask"

const UploadArticle = () => {
  const [articles] = useArticlesContract()
  const [status, contractCall] = useMetamask()

  const [laboratory, setLaboratory] = useState("")
  const [title, setTitle] = useState("")
  const [coAuthors, setCoAuthors] = useState([])

  //Color Mode
  const bg = useColorModeValue("white", "gray.800")

  function addCoAuthor(code, index, input) {
    switch (code) {
      // add co author
      case 0:
        const coAuthor = { address: "", active: true }
        setCoAuthors((a) => [...a, coAuthor])
        break
      // change coAuthor address
      case 1:
        setCoAuthors((a) =>
          a.map((coAuthor, i) => {
            if (index === i) {
              return { ...coAuthor, address: input }
            } else {
              return coAuthor
            }
          })
        )
        // index => address
        break
      default:
        console.log("Wrong code")
        break
    }
  }

  const removeItem = (index) => {
    setCoAuthors((a) => a.filter((coAuthor, i) => index !== i))
  }

  async function publish() {
    const coAuthorArray = coAuthors.map((coAuthor) => {
      return coAuthor.address
    })
    await contractCall(articles, "publish", [coAuthorArray, title, laboratory])
  }

  // 0x9086701Ecc7eFe724fC906DDF5Bf7D481FA3B055
  // 0xA8674F9cEE637DD4de558D6E9B88db47225AF4C9
  // 0xAa882FF33b967B9841cE446D6B14E0f70f584C90

  return (
    <>
      <Box p="10">
        <Container maxW="container.lg" bg={bg} p="10" borderRadius="50">
          <Heading textAlign="center" mb="2">
            Publish an article
          </Heading>
          <Box display="flex" flexDirection="column" mx="auto" maxW="75%">
            {/* CO AUTHOR */}
            <FormControl mb="4">
              <FormLabel>Co-Authors</FormLabel>
              {coAuthors.map((coAuthor, index) => {
                return (
                  <>
                    <Flex mb="4">
                      {coAuthor.active ? (
                        <>
                          <Input
                            value={coAuthor.address}
                            onChange={(e) =>
                              addCoAuthor(1, index, e.target.value)
                            }
                            placeholder="0x000000000000"
                            borderEndRadius="0"
                          />

                          <Button
                            borderStartRadius="0"
                            onClick={() => removeItem(index)}
                            colorScheme="red"
                          >
                            <MinusIcon />
                          </Button>
                        </>
                      ) : (
                        ""
                      )}
                    </Flex>
                  </>
                )
              })}
              <Button onClick={() => addCoAuthor(0)} colorScheme="green">
                <AddIcon />
              </Button>
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

            <Button
              isLoading={
                status.startsWith("Waiting") || status.startsWith("Pending")
              }
              loadingText={status}
              disabled={
                !title.length ||
                !laboratory.length ||
                status.startsWith("Waiting") ||
                status.startsWith("Pending")
              }
              onClick={publish}
              colorScheme="orange"
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default UploadArticle
