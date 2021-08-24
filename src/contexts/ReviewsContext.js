import { createContext } from 'react'
import { useContract } from 'web3-hooks'
import { contractAddress, contractABI } from '../contracts/reviews'

export const ReviewsContext = createContext(null)

const ReviewsContextProvider = ({ children }) => {
  const contract = useContract(contractAddress, contractABI)

  return (
    <ReviewsContext.Provider value={[contract]}>
      {children}
    </ReviewsContext.Provider>
  )
}

export default ReviewsContextProvider
