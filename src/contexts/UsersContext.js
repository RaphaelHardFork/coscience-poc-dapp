import { createContext } from 'react'
import { useContract } from 'web3-hooks'
import { contractAddress, contractABI } from '../contracts/users'

export const UsersContext = createContext(null)

const UsersContextProvider = ({ children }) => {
  const contract = useContract(contractAddress, contractABI)

  return (
    <UsersContext.Provider value={[contract]}>{children}</UsersContext.Provider>
  )
}

export default UsersContextProvider
