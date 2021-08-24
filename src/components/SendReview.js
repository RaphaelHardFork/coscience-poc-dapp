import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { useIPFS } from "../hooks/useIPFS"
import { useMetamask } from "../hooks/useMetamask"
import { useReviewsContract } from "../hooks/useReviewsContract"

const SendReview = ({ id }) => {
  const [reviews] = useReviewsContract()
  const [status, contractCall] = useMetamask()
  const [review, setReview] = useState("")
  const [pinJsObject, , ipfsStatus] = useIPFS()

  async function post() {
    const result = await pinJsObject({ on: id, content: review })
    // post(review, articleID)
    await contractCall(reviews, "post", [result.IpfsHash, id])
  }

  /* to save on IPFS
  const obj = {
    title:'',
    abstract:'', // in article
    content:'',
  }
  */

  return (
    <>
      <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
        <FormControl mb="4">
          <FormLabel>Write a review</FormLabel>
          <Text> {ipfsStatus} </Text>
          <Textarea
            placeholder="Your review..."
            onChange={(e) => setReview(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="orange"
          onClick={post}
          isLoading={
            status.startsWith("Waiting") ||
            status.startsWith("Pending") ||
            ipfsStatus.startsWith("Pinning") ||
            ipfsStatus.startsWith("Before")
          }
          loadingText={status}
          disabled={
            !review.length ||
            status.startsWith("Waiting") ||
            status.startsWith("Pending") ||
            ipfsStatus.startsWith("Pinning") ||
            ipfsStatus.startsWith("Before")
          }
        >
          Submit
        </Button>
      </Box>
    </>
  )
}

export default SendReview
