import "./App.css"
import Dapp from "./Dapp"
import UsersContextProvider from "./contexts/UsersContext.js"

const App = () => {
  return (
    <div className="App">
      <UsersContextProvider>
        <Dapp />
      </UsersContextProvider>
    </div>
  )
}

export default App
