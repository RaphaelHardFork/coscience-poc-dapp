import { useContext } from "react"
import { CommentsContext } from "../contexts/CommentsContext"

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

const userCommentList = async (comments, listOfId) => {
  const commentList = []

  for (const i of listOfId) {
    const commentObj = await getCommentData(comments, i)
    commentList.push(commentObj)
  }
  return commentList
}

export const useCommentsContract = () => {
  const [comments] = useContext(CommentsContext)

  if (comments === undefined) {
    throw new Error(
      "It seems that you are trying to use CommentContext outside of its provider"
    )
  }
  return [comments, getCommentData, userCommentList]
}
