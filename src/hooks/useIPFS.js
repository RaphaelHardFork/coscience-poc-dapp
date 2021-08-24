import { useCallback, useState } from "react"

// yarn add dotenv

// yarn add axios
const axios = require("axios")

// yarn add @pinata/sdk
const pinataSDK = require("@pinata/sdk")
const pinata = pinataSDK(
  process.env.REACT_APP_PINATA_KEY,
  process.env.REACT_APP_PINATA_SECRET_KEY
)

export const useIPFS = () => {
  const [status, setStatus] = useState("")

  const pinJsObject = async (obj) => {
    let result
    setStatus("Before pinning")
    try {
      result = await pinata.pinJSONToIPFS(obj, {
        pinataOptions: {
          cidVersion: 1,
        },
      })
      setStatus("Pinning to IPFS")
    } catch (e) {
      setStatus("Failed to pin")
      console.error(e)
    }
    setStatus("Successful pinning")
    return result
  }

  // useEffect => readIPFS(cid) => change the above function in each call
  // [readIPFS]
  const readIPFS = useCallback(async (cid) => {
    let response
    try {
      response = await axios(`https://ipfs.io/ipfs/${cid}`) // cid : part of the function that change in each call
    } catch (e) {
      console.error(e)
    }
    return response.data
  }, [])

  return [pinJsObject, readIPFS, status]
}
