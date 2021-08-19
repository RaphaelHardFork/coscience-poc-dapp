import { useContext, useEffect, useState } from "react"
import { Web3Context } from "web3-hooks"
import { ReviewsContext } from "../contexts/ReviewsContext"

const getReviewsData = async (reviews, id) => {}

const useReviewsContract = () => {
  const [reviews] = useContext(ReviewsContext)

  // control call of the hook
  if (reviews === undefined) {
    throw new Error(
      `It seems that you are trying to use ArticlesContext outside of its provider`
    )
  }
  return reviews
}
