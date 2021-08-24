import { Box, FormControl, FormLabel, Textarea, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useMetamask } from "../hooks/useMetamask"
import { useCommentsContract } from "../hooks/useCommentsContract"
import { useArticlesContract } from "../hooks/useArticlesContract"

const SendComment = ({ targetAddress, id }) => {
  const [comments] = useCommentsContract()
  const [status, contractCall] = useMetamask()
  const [comment, setComment] = useState("")

  async function post() {
    // post(comment,articleAddress, articleID)

    await contractCall(comments, "post", [comment, targetAddress, id])
  }

  return (
    <>
      <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
        <FormControl mb="4">
          <FormLabel>Write a comment</FormLabel>
          <Textarea
            placeholder="Your comment..."
            onChange={(e) => setComment(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="orange"
          onClick={post}
          isLoading={
            status.startsWith("Waiting") || status.startsWith("Pending")
          }
          loadingText={status}
          disabled={
            !comment.length ||
            status.startsWith("Waiting") ||
            status.startsWith("Pending")
          }
        >
          Submit
        </Button>
      </Box>
    </>
  )
}

export default SendComment
