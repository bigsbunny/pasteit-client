import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = (props) => {
    
    const [text, setText] = useState("");
    const [generated, setGenerated] = useState(false);
    const [data, setData] = useState();

    const newGenerate = (e) => {
        e.preventDefault();
        const dataObject = {
            data: text
        }
        axios.post('https://young-eyrie-03918.herokuapp.com/', dataObject).then((res) => {
            let dataObj = res.data;
            setData(dataObj);
            setGenerated(true);
        })
    };

    const textDataChange = (e) => {
        console.log(e.target.value);
        setText(e.target.value);
    }

    return (
        <div>
            <div className='text-center'>
                <h1 className='text-2xl'>PasteIt</h1>
                <p className='text-lg'>Input your text/code in the field below and generate a link to share it with others.</p>
                <form name="data" onSubmit={newGenerate} className='flex flex-col justify-center items-center gap-y-6'>
                    <textarea id="inputData" name="inputData" onChange={textDataChange} className='p-6 border-2 border-gray-400' rows={20} cols={100} placeholder="Enter your text/code here"></textarea>
                    <button type='submit' className='px-4 py-2 bg-green-400 rounded-md'>Generate Link</button>
                </form>
                {generated && (
                    <div className='flex justify-center items-center gap-x-4'>
                        <p>Here's your generated link to share your paste: </p>
                        {/* <input className='px-4 py-2 bg-gray-300 w-2/6' type="text" value={data.tinyURL} disabled></input> */}
                        <a className='px-4 py-2 bg-gray-300 w-2/6' href={data.tinyURL}>{data.tinyURL}</a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage;