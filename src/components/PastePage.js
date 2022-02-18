import axios from 'axios';
import { parse } from 'postcss';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const PasteBox = (props) => {
    return (<div>
        <div className='text-center'>
            <h1 className='text-2xl bold pb-4'>Here's your data from PasteIt</h1>
            <p>{`Your paste expires on ${props.data.validity}`}</p>
        </div>
        <textarea className='p-6 border-2 border-gray-400' rows={20} cols={100} value={props.data.textData} disabled></textarea>
    </div>)
};

const EncrytKeyBox = (props) => {
    const handleSubmit = (e) => {
        console.log(e.target.value);
    }
    return (
        <form name="encryptKey" onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-y-6'>
            <input type="text" placeholder="Enter encryption key" className='px-4 py-2 border border-gray-400'></input>
            <button type="submit" className='px-4 py-2 bg-green-400 rounded-md'>Decrypt</button>
        </form>
    )
}

const PastePage = (props) => {
    const { pasteId } = useParams();
    let parsedData = {};
    const [dbData, setDbData] = useState();
    const [fetched, setFetched] = useState(false);

    const parseData = (data) => {
        parsedData = { ...data };
        // console.log(parsedData);
    }

    useEffect(() => {
        axios.get('https://young-eyrie-03918.herokuapp.com/' + pasteId).then((response) => {
            setDbData(response.data[0]);
            setFetched(true);
        });
    }, [])

    // useEffect(() => {
    //     let isMounted = true;
    //     if(isMounted)
    //         setFetched(true);

    //     return () => isMounted = false;

    //     // parseData(dbData);
    //     // setFetched(true);
    // }, [dbData])

    // console.log(dbData);

    return (
        <div className='min-h-screen flex justify-center items-center'>
            {fetched && (!dbData.toEncrypt ?
                <PasteBox data={dbData}/> : <EncrytKeyBox />)}
        </div>
    )
}

export default PastePage;