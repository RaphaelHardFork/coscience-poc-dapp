import { useContext, useEffect, useState } from "react"
import { Web3Context } from "web3-hooks"
import { ArticlesContext } from "../contexts/ArticlesContext"

// Pure function
const getArticleData = async (articles, id) => {
  const a = await articles.articleInfo(id)

  const articleObj = {
    id: a.id.toNumber(),
    author: a.author,
    coAuthor: a.coAuthor,
    contentBanned: a.contentBanned,
    abstractCID: a.abstractCID,
    contentCID: a.contentCID,
    comments: a.comments,
    reviews: a.reviews,
  }
  return articleObj
}

// hooks
export const useArticlesContract = () => {
  // call the context
  const [articles] = useContext(ArticlesContext)

  // utils
  const [web3State] = useContext(Web3Context)
  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    if (articles) {
      const createArticleList = async () => {
        const nb = await articles.nbOfArticles()
        const articlesList = []
        for (let i = 1; i <= nb; i++) {
          const obj = await getArticleData(articles, i)
          articlesList.push(obj)
        }
        setArticleList(articlesList)
      }
      createArticleList()
    }
  }, [articles])

  // control call of the hook
  if (articles === undefined) {
    throw new Error(
      `It seems that you are trying to use ArticlesContext outside of its provider`
    )
  }

  // first: return contract for utilisation
  return [articles, articleList, getArticleData]
}
