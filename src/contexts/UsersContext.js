import { createContext } from "react"
import { useContract } from "../web3hook/useContract"
import { contractAddress, contractABI } from "../contracts/users"

export const UsersContext = createContext(null)

const UsersContextProvider = ({ children }) => {
  const [{ contract, mode }] = useContract(contractAddress, contractABI)

  return (
    <UsersContext.Provider value={[contract, mode]}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider
