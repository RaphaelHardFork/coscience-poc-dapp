import "./App.css"
import Dapp from "./Dapp"
import UsersContextProvider from "./contexts/UsersContext.js"
import { Box, Flex } from "@chakra-ui/react"

const App = () => {
  return (
    <UsersContextProvider>
      <Dapp />
    </UsersContextProvider>
  )
}

export default App
