import "./App.css"
import Dapp from "./Dapp"
import UsersContextProvider from "./contexts/UsersContext.js"
import ArticlesContextProvider from "./contexts/ArticlesContext"
import ReviewsContextProvider from "./contexts/ReviewsContext"
import CommentsContextProvider from "./contexts/CommentsContext"

const App = () => {
  return (
    <>
      <UsersContextProvider>
        <ArticlesContextProvider>
          <ReviewsContextProvider>
            <CommentsContextProvider>
              <Dapp />
            </CommentsContextProvider>
          </ReviewsContextProvider>
        </ArticlesContextProvider>
      </UsersContextProvider>
    </>
  )
}

export default App
