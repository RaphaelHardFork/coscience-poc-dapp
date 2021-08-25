import { Box, FormControl, FormLabel, Textarea, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useMetamask } from "../hooks/useMetamask"
import { useCommentsContract } from "../hooks/useCommentsContract"
import { useIPFS } from "../hooks/useIPFS"

const SendComment = ({ targetAddress, id }) => {
  const [comments] = useCommentsContract()
  const [status, contractCall] = useMetamask()
  const [pinJsObject, , ipfsStatus] = useIPFS()

  const [comment, setComment] = useState("")

  async function post() {
    const body = await pinJsObject({ comment })
    // post(comment,articleAddress, articleID)
    await contractCall(comments, "post", [body, targetAddress, id])
    setComment("")
  }

  return (
    <>
      <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
        <FormControl mb="4">
          <FormLabel>Write a comment</FormLabel>
          <Textarea
            value={comment}
            placeholder="Your comment..."
            onChange={(e) => setComment(e.target.value)}
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
            !comment.length ||
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
