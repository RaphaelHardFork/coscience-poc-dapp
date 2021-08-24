import { Box, FormControl, FormLabel, Textarea, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useMetamask } from "../hooks/useMetamask"
import { useReviewsContract } from "../hooks/useReviewsContract"

const SendReview = ({ id }) => {
  const [reviews] = useReviewsContract()
  const [status, contractCall] = useMetamask()
  const [review, setReview] = useState("")

  async function post() {
    // post(review, articleID)
    await contractCall(reviews, "post", [review, id])
  }

  return (
    <>
      <Box mx="auto" maxW="50%" display="flex" flexDirection="column">
        <FormControl mb="4">
          <FormLabel>Write a review</FormLabel>
          <Textarea
            placeholder="Your review..."
            onChange={(e) => setReview(e.target.value)}
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
            !review.length ||
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

export default SendReview
