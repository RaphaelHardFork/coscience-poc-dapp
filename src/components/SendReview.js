import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Input,
  Heading,
} from "@chakra-ui/react"
import { useState } from "react"
import { useIPFS } from "../hooks/useIPFS"
import { useMetamask } from "../hooks/useMetamask"
import { useReviewsContract } from "../hooks/useReviewsContract"

const SendReview = ({ id }) => {
  const [reviews] = useReviewsContract()
  const [status, contractCall] = useMetamask()
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [pinJsObject, , ipfsStatus] = useIPFS()

  async function post() {
    const reviewObj = { version: 0.1, title, content }
    const reviewHash = await pinJsObject(reviewObj)
    // post(review, articleID)
    await contractCall(reviews, "post", [reviewHash, id])
    setTitle("")
    setContent("")
  }

  return (
    <>
      <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
        <Heading>Write a review</Heading>
        <FormControl mb="4">
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            placeholder="Your review title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Content</FormLabel>
          <Textarea
            value={content}
            placeholder="Your review..."
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
            !title.length ||
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

export default SendReview
