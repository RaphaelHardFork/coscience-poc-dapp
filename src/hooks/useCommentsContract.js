import { useContext, useEffect, useState } from "react"
import { CommentsContext } from "../contexts/CommentsContext"
import { useWeb3 } from "../web3hook/useWeb3"

//pure function

const getCommentData = async (comments, id) => {
  const c = await comments.commentInfo(id)

  const commentObj = {
    id: c.id.toNumber(),
    author: c.author,
    contentCID: c.contentCID,
    contentBanned: c.contentBanned,
    target: c.target,
    targetID: c.targetID.toNumber(),
    comments: c.comments,
  }
  return commentObj
}

const createCommentList = async (comments, listOfId) => {
  const commentList = []

  for (const i of listOfId) {
    const commentObj = await getCommentData(comments, i)
    commentList.push(commentObj)
  }
  return commentList
}

// HOOKS
export const useCommentsContract = () => {
  const [comments, mode] = useContext(CommentsContext)
  const { state } = useWeb3()
  const { networkName } = state

  const [eventList, setEventList] = useState()

  useEffect(() => {
    if (comments && networkName === "rinkeby") {
      ;(async () => {
        const eventArray = await comments.queryFilter("Posted")
        const eventListArray = [
          {
            txHash: undefined,
            timestamp: 0,
            blockNumber: 0,
            date: "",
          },
        ]
        for (const event of eventArray) {
          const block = await event.getBlock()
          const date = new Date(block.timestamp * 1000)
          const obj = {
            // defined in the smart contract
            txHash: event.transactionHash,
            timestamp: block.timestamp,
            blockNumber: event.blockNumber,
            date: date.toLocaleString(),
          }
          eventListArray.push(obj)
        }
        setEventList(eventListArray)
        // [{null},{event1 = reviewID n°1}]
      })()
    }
  }, [comments, networkName])

  if (comments === undefined) {
    throw new Error(
      "It seems that you are trying to use CommentContext outside of its provider"
    )
  }
  return [comments, getCommentData, createCommentList, eventList]
}
