import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const client = create('https://ipfs.infura.io:5001/api/v0');

const UploadFile = () => {
  const [fileUrl, updateFileUrl] = useState(``);
  const onChange = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
      console.log(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //we gather a local file from the API for this example, but you can gather the file from anywhere
    let data = new FormData();
    data.append('file', fs.createReadStream('./yourfile.png'));
    return axios
      .post(url, data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey
        }
      })
      .then(function (response) {
        //handle response here
      })
      .catch(function (error) {
        //handle error here
      });
  };

  return (
    <div>
      <form>
        {/*input for choose file in our computer*/}
        <input type='file' onChange={} />
        {fileUrl && <img src={fileUrl} alt='test' width='600px' />}
      </form>
    </div>
  );
};

export default UploadFile;
