import { Link, Text, useToast } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { createReadStream } from "fs"

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

  const pinFile = async (file, path) => {
    console.log(file)
    console.log(path.slice(5))
    // DO NOT WORK
    const readableStreamForFile = createReadStream(
      "https://bafybeid3j7eh7vzgxybqvloo4jxsc66uedpibjfd3qpmp3b4iwmpvdpm3u.ipfs.infura-ipfs.io/"
    )
    console.log(readableStreamForFile)
    const options = {
      pinataMetadata: {
        name: file.name,
        /*
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
        */
      },
      pinataOptions: {
        cidVersion: 1,
      },
    }

    let result
    try {
      result = await pinata.pinFileToIPFS(readableStreamForFile, options)
    } catch (e) {
      console.error(e)
    }
    console.log(result)
    return result.IpfsHash
  }

  // useEffect => readIPFS(cid) => change the above function in each call
  // [readIPFS]
  const readIPFS = useCallback(async (cid) => {
    // check for the first version of the dapp (some content with false CID)
    if (!cid.startsWith("baf")) {
      // by returning the cid, don't need try/catch anymore
      return cid
    }

    let response
    try {
      response = await axios(`https://ipfs.io/ipfs/${cid}`) // cid : part of the function that change in each call
    } catch (e) {
      // manage IPFS error

      console.error(e)
    }
    return response.data
  }, [])

  return [pinJsObject, readIPFS, status, pinFile]
}
