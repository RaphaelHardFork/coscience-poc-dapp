import "./App.css"
import Dapp from "./Dapp"
import UsersContextProvider from "./contexts/UsersContext.js"
import ArticlesContextProvider from "./contexts/ArticlesContext"
import ReviewsContextProvider from "./contexts/ReviewsContext"

const App = () => {
  return (
    <>
      <UsersContextProvider>
        <ArticlesContextProvider>
          <ReviewsContextProvider>
            <Dapp />
          </ReviewsContextProvider>
        </ArticlesContextProvider>
      </UsersContextProvider>
    </>
  )
}

export default App
