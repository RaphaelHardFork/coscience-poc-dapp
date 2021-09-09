import { createContext } from "react"
import { useContract } from "../web3hook/useContract"
import { contractAddress, contractABI } from "../contracts/comments"

export const CommentsContext = createContext(null)

const CommentsContextProvider = ({ children }) => {
  const [{ contract, mode }] = useContract(contractAddress, contractABI)

  return (
    <CommentsContext.Provider value={[contract, mode]}>
      {children}
    </CommentsContext.Provider>
  )
}

export default CommentsContextProvider
