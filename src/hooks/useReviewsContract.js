import { useContext, useEffect, useState } from "react"
import { Web3Context } from "web3-hooks"
import { ReviewsContext } from "../contexts/ReviewsContext"

const getReviewsData = async (reviews, id) => {
  const r = await reviews.reviewInfo(id)

  const reviewObj = {
    id: r.id.toNumber(),
    author: r.author,
    contentCID: r.contentCID,
    contentBanned: r.contentBanned,
    targetID: r.targetID.toNumber(),
    comments: r.comments,
  }
  return reviewObj
}

export const useReviewsContract = () => {
  const [reviews] = useContext(ReviewsContext)
  const [web3State] = useContext(Web3Context)

  const [reviewList, setReviewList] = useState([])

  useEffect(() => {
    if (reviews) {
      const createReviewList = async () => {
        const nb = await reviews.nbOfReviews()
        const reviewsList = []
        for (let i = 1; i <= nb; i++) {
          const obj = await getReviewsData(reviews, i)
          reviewsList.push(obj)
        }
        setReviewList(reviewsList)
      }
      createReviewList()
    }
  }, [reviews])

  // control call of the hook
  if (reviews === undefined) {
    throw new Error(
      `It seems that you are trying to use ReviewsContext outside of its provider`
    )
  }
  return [reviews, reviewList, getReviewsData]
}
