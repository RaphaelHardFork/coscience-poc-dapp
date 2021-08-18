import "./App.css"
import Dapp from "./Dapp"
import UsersContextProvider from "./contexts/UsersContext.js"

const App = () => {
  return (
    <>
      <UsersContextProvider>
        <Dapp />
      </UsersContextProvider>
    </>
  )
}

export default App
