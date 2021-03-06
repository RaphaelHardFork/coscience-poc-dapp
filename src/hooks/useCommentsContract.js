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
    vote: c.vote.toNumber()
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

/* Function to find the article where comments are posted
const fetchArticleSrc = async (articles, reviews, comments, comment) => {
  // check target until a review or article is find
}
*/

// HOOKS
export const useCommentsContract = () => {
  const [comments, commentEvents] = useContext(CommentsContext)

  if (comments === undefined) {
    throw new Error(
      "It seems that you are trying to use CommentContext outside of its provider"
    )
  }
  return { comments, getCommentData, createCommentList, commentEvents }
}
