import { Link, Text, useToast } from "@chakra-ui/react"
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
  const toast = useToast()

  const pinJsObject = async (obj) => {
    let result
    try {
      setStatus("Pinning to IPFS")
      result = await pinata.pinJSONToIPFS(obj, {
        pinataOptions: {
          cidVersion: 1,
        },
      })
    } catch (e) {
      setStatus("Failed to pin")
      toast({
        title: "Content not pinned to IPFS",
        description: (
          <>
            <Text>Message: {e} </Text>
          </>
        ),
        status: "error",
        duration: 7000,
        isClosable: true,
      })
      throw e
    }
    setStatus("Successful pinning")
    toast({
      title: "Content pinned to IPFS",
      description: (
        <>
          <Text isTruncated>CID: {result.IpfsHash})</Text>
          <Text>Time: {result.Timestamp} </Text>
          <Text>Size: {result.PinSize} </Text>
          <Link isExternal href={`https://ipfs.io/ipfs/${result.IpfsHash}`}>
            See through a gateway
          </Link>
        </>
      ),
      status: "info",
      duration: 7000,
      isClosable: true,
    })

    // return directly the CID of the content
    return result.IpfsHash
    // unpin in case of TX rejected
  }

  // useEffect => readIPFS(cid) => change the above function in each call
  // [readIPFS]
  const readIPFS = useCallback(async (cid) => {
    let response
    try {
      response = await axios(`https://ipfs.io/ipfs/${cid}`) // cid : part of the function that change in each call
    } catch (e) {
      // manage IPFS error

      console.error(e)
    }
    return response.data
  }, [])

  return [pinJsObject, readIPFS, status]
}
