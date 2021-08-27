import { Box, FormControl, FormLabel, Textarea, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useMetamask } from "../hooks/useMetamask"
import { useCommentsContract } from "../hooks/useCommentsContract"
import { useIPFS } from "../hooks/useIPFS"

const SendComment = ({ targetAddress, id }) => {
  const [comments] = useCommentsContract()
  const [status, contractCall] = useMetamask()
  const [pinJsObject, , ipfsStatus] = useIPFS()

  const [content, setContent] = useState("")

  async function post() {
    const body = await pinJsObject({ version: 0.1, content })
    // post(comment,articleAddress, articleID)
    await contractCall(comments, "post", [body, targetAddress, id])
    setContent("")
  }

  return (
    <>
      <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
        <FormControl mb="4">
          <FormLabel>Write a comment</FormLabel>
          <Textarea
            value={content}
            placeholder="Your comment..."
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="orange"
          onClick={post}
          isLoading={
            status.startsWith("Waiting") ||
            status.startsWith("Pending") ||
            ipfsStatus.startsWith("Pinning")
          }
          loadingText={ipfsStatus.startsWith("Pinning") ? ipfsStatus : status}
          disabled={
            !content.length ||
            status.startsWith("Waiting") ||
            status.startsWith("Pending") ||
            ipfsStatus.startsWith("Pinning")
          }
        >
          Submit
        </Button>
      </Box>
    </>
  )
}

export default SendComment
