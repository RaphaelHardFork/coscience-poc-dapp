import { useContext } from "react"
import { UsersContext } from "../contexts/UsersContext"

export const useUsersContract = () => {
  const [contract] = useContext(UsersContext)

  if (contract === undefined) {
    throw new Error(
      `It seems that you are trying to use UsersContext outside of its provider`
    )
  }

  return [contract]
}
