import React, { useState, useEffect } from 'react';
import axios from 'axios';

const server = process.env.REACT_APP_SERVER_URL;

const HomePage = (props) => {
    
    const [text, setText] = useState("");
    const [generated, setGenerated] = useState(false);
    const [data, setData] = useState();
    const [encrypt, setEncrypt] = useState(false);
    const [key, setKey] = useState("");

    const newGenerate = (e) => {
        console.log(server);
        e.preventDefault();
        const dataObject = {
            data: text,
            encrypt: encrypt,
            encryptKey: key
        }
        axios.post(server, dataObject).then((res) => {
            let dataObj = res.data;
            setData(dataObj);
            setGenerated(true);
        })
    };

    const textDataChange = (e) => {
        console.log(e.target.value);
        setText(e.target.value);
    }

    const handleEncrypt = (e) => {
        if(e.target.checked)
            setEncrypt(true);
        else
            setEncrypt(false);

    }

    const handleEncryptKey = (e) => {
        console.log(e.target.value);
        setKey(e.target.value);
    }

    return (
        <div className="bg-gray-300 min-h-screen">
            <div className='text-center px-4 pt-4 relative'>
                <h1 className='text-5xl underline mb-4'>PasteIt</h1>
                <p className='text-lg text-gray-700 mb-6'>Input your text/code in the field below and generate a link to quickly share it with others.</p>
                <form name="data" onSubmit={newGenerate} className='flex flex-col justify-center items-center gap-y-6'>
                    <textarea id="inputData" name="inputData" onChange={textDataChange} className='p-6 border-2 border-gray-400' rows={12} cols={75} placeholder="Enter your text/code here"></textarea>
                    <button type='submit' className='px-4 py-2 bg-green-400 rounded-md text-white'>Generate Link</button>
                </form>
                <div className="flex justify-center items-center gap-x-4 my-4">
                    <label htmlFor="toEncrypt">Encrypt data?</label>
                    <input id="toEncrypt" type="checkbox" onChange={handleEncrypt}></input>
                    {encrypt && <input type="text" className="px-4 py-2 rounded-md border border-black" onChange={handleEncryptKey} placeholder="Enter encryption key"></input>}
                </div>
                {generated && (
                    <div className='flex justify-center items-center gap-x-4'>
                        <p>Here's your generated link to share your paste: </p>
                        {/* <input className='px-4 py-2 bg-gray-300 w-2/6' type="text" value={data.tinyURL} disabled></input> */}
                        <a className='px-4 py-2 bg-white w-2/6 rounded-md border border-gray-400' href={data.tinyURL}>{data.tinyURL}</a>
                    </div>
                )}
                <button className='px-4 py-2 bg-blue-400 text-white rounded-md absolute top-5 right-10'><a href={`/pastes`}> ALL YOUR PASTES</a></button>
            </div>
        </div>
    )
}

export default HomePage;