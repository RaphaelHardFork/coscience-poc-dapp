import React, { useState } from "react"
import { Button, FormControl, FormLabel, Image, Input } from "@chakra-ui/react"
import { useIPFS } from "../hooks/useIPFS"

const UploadFile = () => {
  const [, , , pinFile] = useIPFS()
  const [file, setFile] = useState()
  const [imgSrc, setImgSrc] = useState()

  function addFile(e) {
    const url = URL.createObjectURL(e.target.files[0])
    setFile(e.target.files[0])
    setImgSrc(url)
  }

  function debug() {
    console.log(imgSrc)
    console.log(file)
  }

  async function sendFile() {
    pinFile(file, imgSrc)
  }

  return (
    <>
      <FormControl>
        <FormLabel>Choose a file</FormLabel>
        <Input onChange={addFile} type="file" />
        {imgSrc && <Image src={imgSrc} alt="test" width="600px" />}
      </FormControl>

      <Button onClick={debug}>debug</Button>
      <Button disabled={file === undefined} onClick={sendFile}>
        Send file
      </Button>
    </>
  )
}

export default UploadFile
