import { useContext, useEffect, useState } from "react"
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

// return articleList of user
const userArticleList = async (articles, listOfId) => {
  const articleList = []

  for (const id of listOfId) {
    const articleObj = await getArticleData(articles, id)
    articleList.push(articleObj)
  }

  return articleList
}

// -----------------------------------------------------HOOK
export const useArticlesContract = () => {
  // call the context
  const [articles] = useContext(ArticlesContext)

  // utils
  const [articleList, setArticleList] = useState([])

  // create list of article
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

    return () => setArticleList(undefined)
  }, [articles])

  // Get event from Articles.sol
  useEffect(() => {
    if (articles) {
      ;(async () => {
        const eventArray = await articles.queryFilter("Published")
        console.log("EVENTs")
        console.log(eventArray)
        for (const event of eventArray) {
          const block = await event.getBlock()
          const date = new Date(block.timestamp * 1000)
          console.log(date)
        }
      })()
    }
  }, [articles])

  // control call of the hook
  if (articles === undefined) {
    throw new Error(
      `It seems that you are trying to use ArticlesContext outside of its provider`
    )
  }

  // first: return contract for utilisation
  return [articles, articleList, getArticleData, userArticleList]
}
