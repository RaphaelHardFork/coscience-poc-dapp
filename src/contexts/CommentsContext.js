import { createContext } from "react"
import { useContract } from "web3-hooks"
import { contractAddress, contractABI } from "../contracts/comments"

export const CommentsContext = createContext(null)

const CommentsContextProvider = ({ children }) => {
  const contract = useContract(contractAddress, contractABI)

  return (
    <CommentsContext.Provider value={[contract]}>
      {children}
    </CommentsContext.Provider>
  )
}

export default CommentsContextProvider
