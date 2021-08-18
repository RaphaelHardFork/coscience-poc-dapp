import { useContext, useEffect, useState } from "react"
import { Web3Context } from "web3-hooks"
import { ArticlesContext } from "../contexts/ArticlesContext"

// Pure function
const getArticleData = async (articles, id) => {
  const contentCID = await articles.articleContent(id)
  const abstractCID = await articles.articleAbstract(id)
  const author = await articles.author(id)
  const coAuthor = await articles.coAuthor(id)
  const comments = await articles.comments(id)
  const reviews = await articles.reviews(id)

  const articleObj = {
    id,
    contentCID,
    abstractCID,
    author,
    coAuthor,
    comments,
    reviews,
  }
  return articleObj
}

// hooks
export const useArticlesContract = () => {
  // call the context
  const [articles] = useContext(ArticlesContext)

  // utils
  const [web3State] = useContext(Web3Context)
  const [articleData, setArticleData] = useState({})
  // const [articleId, setArticleId] = useState(null)
  const [articleList, setArticleList] = useState([])

  //get article data
  useEffect(() => {
    const connectedArticle = async () => {}
    connectedArticle()
  }, [web3State.account, articles])

  // list of article
  useEffect(() => {})

  // list of article of one user
  useEffect(() => {})

  // control call of the hook
  if (articles === undefined) {
    throw new Error(
      `It seems that you are trying to use ArticlesContext outside of its provider`
    )
  }

  // first: return contract for utilisation
  return [articles, articleData, articleList]
}
