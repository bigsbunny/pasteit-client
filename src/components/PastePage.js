import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const server = process.env.REACT_APP_SERVER_URL;

const PasteBox = (props) => {
    return (<div>
        <div className='text-center'>
            <h1 className='text-2xl bold pb-4'>Here's your data from PasteIt</h1>
            <p>{`Your paste expires on ${new Date(props.data.validity).toLocaleString()}`}</p>
        </div>
        <textarea className='p-6 border-2 border-gray-400' rows={20} cols={100} value={props.data.textData} disabled></textarea>
    </div>)
};

const EncrytKeyBox = (props) => {

    const [key, setKey] = useState();
    const [decrypt, setDecrypt] = useState(false);
    const [dbData, setDbData] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.id);
        let obj = {
            encryptKey: key
        }
        axios.post(`${server}/${props.id}`, obj).then((res) => {
            console.log(res.data);
            setDbData(res.data);
            setDecrypt(true);
        })
    }

    const handleChange = (e) => {
        setKey(e.target.value);
    }

    return (
        <div>
            {decrypt ?
                <PasteBox data={dbData} /> :
                <form name="encryptKey" onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-y-6'>
                    <input type="text" onChange={handleChange} placeholder="Enter encryption key" className='px-4 py-2 border border-gray-400'></input>
                    <button type="submit" className='px-4 py-2 bg-green-400 rounded-md'>Decrypt</button>
                </form>}
        </div>
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
        axios.get(server + '/' + pasteId).then((response) => {
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
                <PasteBox data={dbData} /> : <EncrytKeyBox id={pasteId} />)}
        </div>
    )
}

export default PastePage;