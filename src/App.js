import "./App.css"
import Dapp from "./Dapp"
import UsersContextProvider from "./contexts/UsersContext.js"
import ArticlesContextProvider from "./contexts/ArticlesContext"

const App = () => {
  return (
    <>
      <ArticlesContextProvider>
        <UsersContextProvider>
          <Dapp />
        </UsersContextProvider>
      </ArticlesContextProvider>
    </>
  )
}

export default App
