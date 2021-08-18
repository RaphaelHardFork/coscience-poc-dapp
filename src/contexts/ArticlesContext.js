import { createContext } from "react"
import { useContract } from "web3-hooks"
import { contractAddress, contractABI } from "../contracts/articles"

export const ArticlesContext = createContext(null)

const ArticlesContextProvider = ({ children }) => {
  const contract = useContract(contractAddress, contractABI)

  return (
    <ArticlesContext.Provider value={[contract]}>
      {children}
    </ArticlesContext.Provider>
  )
}

export default ArticlesContextProvider
