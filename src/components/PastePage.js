import axios from 'axios';
import { parse } from 'postcss';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


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
        axios.get('http://localhost:3001/' + pasteId).then((response) => {
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

    console.log(dbData);

    return (
        <div className='min-h-screen flex justify-center items-center'>
            {fetched && (
                <div>
                    <div className='text-center'>
                        <h1 className='text-2xl bold pb-4'>Here's your data from PasteIt</h1>
                        <p>{`Your paste expires on ${dbData.validity}`}</p>
                    </div>
                    <textarea className='p-6 border-2 border-gray-400' rows={20} cols={100} value={dbData.textData} disabled></textarea>
                </div>)}
        </div>
    )
}

export default PastePage;