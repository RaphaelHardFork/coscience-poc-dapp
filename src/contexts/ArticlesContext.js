import { createContext } from "react"
import { useContract } from "../web3hook/useContract"
import { contractAddress, contractABI } from "../contracts/articles"

export const ArticlesContext = createContext(null)

const ArticlesContextProvider = ({ children }) => {
  const [{ contract, mode }] = useContract(contractAddress, contractABI)

  return (
    <ArticlesContext.Provider value={[contract, mode]}>
      {children}
    </ArticlesContext.Provider>
  )
}

export default ArticlesContextProvider
