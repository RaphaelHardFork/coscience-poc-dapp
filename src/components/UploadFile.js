import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0');

const App = () => {
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

  return (
    <div>
      <form>
        {/*input for choose file in our computer*/}
        <input type='file' onChange={onChange} />
        {fileUrl && <img src={fileUrl} alt='test' width='600px' />}
      </form>
    </div>
  );
};

export default App;
