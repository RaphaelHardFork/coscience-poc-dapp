import { createContext } from "react"
import { useContract } from "../web3hook/useContract"
import { contractAddress, contractABI } from "../contracts/reviews"

export const ReviewsContext = createContext(null)

const ReviewsContextProvider = ({ children }) => {
  const [{ contract, mode }] = useContract(contractAddress, contractABI)

  return (
    <ReviewsContext.Provider value={[contract,mode]}>
      {children}
    </ReviewsContext.Provider>
  )
}

export default ReviewsContextProvider
