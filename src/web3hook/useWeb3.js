import { useContext } from "react"
import { ProviderContext } from "./Web3ContextProvider"

export const useWeb3 = () => {
  // This hook use the ProviderContext in which informations from the useProvider hook are exported
  const { state, switchNetwork, wcConnect, connectToMetamask } =
    useContext(ProviderContext)

  // This add a security to prevent an utilisation of the useWeb3 hook outside the context provider
  if (state === undefined) {
    throw new Error(
      `It seems that you are trying to use ContractContext outside of its provider`
    )
  }
  return { state, switchNetwork, wcConnect, connectToMetamask }
}
